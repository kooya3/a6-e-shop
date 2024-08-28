import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import type { DeliveryInfo } from '../../../../app/(pages)/checkout/CheckoutPage'
import { createSalesHeader } from '../../../bc/endpoints/createSalesHeader'
import { createSalesOrderLine } from '../../../bc/endpoints/createSalesOrderLine'
import type { Order } from '../../../payload-types'

export const syncOrderToBC: AfterChangeHook<Order> = async ({ doc, req, operation }) => {
    const { payload } = req

    if ((operation === 'update') && doc.items && doc.status === 'completed' && !doc.skipSync) {
        const orderedBy = typeof doc.orderedBy === 'object' ? doc.orderedBy.id : doc.orderedBy

        const user = await payload.findByID({
            collection: 'users',
            id: orderedBy,
        })

        if (!user) {
            throw new Error(`Couldn't find a user with id ${orderedBy}`)
        }

        const deliveryInfo = doc.deliveryInfo as DeliveryInfo

        const salesOrderBody = {
            Document_Type: 'Order' as const,
            Sell_to_Customer_No: user.bcCustomerID,
            ...deliveryInfo,
        }

        const salesOrder = await createSalesHeader(salesOrderBody)

        if (!salesOrder) {
            throw new Error(`Could't create a sales order for order with ID ${doc.id}`)
        }

        for (const item of doc.items) {
            const bcProductID = typeof item.product === 'object' ? item.product.bcProductID : item.product

            const orderLineBody = {
                Type: "Item" as const,
                Document_No: salesOrder.No,
                No: bcProductID,
                ShortcutDimCode4: "41040",
                Quantity: item.quantity,
                Location_Code: deliveryInfo.Location_Code,
            }

            const salesOrderLine = await createSalesOrderLine(orderLineBody)

            if (!salesOrderLine) {
                throw new Error(`Couldn't create a sales order line for item ${item.id}`)
            }
        }

        doc.skipSync = true
    }

    return
}
