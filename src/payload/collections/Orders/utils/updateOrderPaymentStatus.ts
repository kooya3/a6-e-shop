import payload from "payload"

import type { Order } from "../../../payload-types"
export async function updateOrderPaymentStatus(id: string, paymentStatus: Order['status']): Promise<void> {
  try {
    const order = await payload.findByID({
      collection: 'orders',
      id: id,
    })

    if (!order) {
      throw new Error(`Order with ID ${id} could not be found`)
    }

    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        status: paymentStatus,
      },
    })


  } catch (err: unknown) {
    payload.logger.error(err)
    throw new Error(`We couldn't update your order with ID ${id}`)
  }
}
