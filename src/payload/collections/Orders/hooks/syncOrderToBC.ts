/**
 * Syncs the order to the backend system after it has been changed.
 * @param context - The context object containing the document.
 */
import { CollectionConfig } from 'payload/types';
import { admins } from '../../../access/admins';
import { adminsOrLoggedIn } from '../../../access/adminsOrLoggedIn';
import { adminsOrOrderedBy } from '../access/adminsOrOrderedBy';
import { populateOrderedBy } from '../hooks/populateOrderedBy';
import { LinkToPaymentIntent } from '../ui/LinkToPaymentIntent';
import { AfterChangeHook } from 'payload/dist/collections/config/types';
import axios from 'axios';
import { updateUserPurchases } from './updateUserPurchases';
import { clearUserCart } from './clearUserCart';

const BC_URL = 'https://bctest.dayliff.com:7048/BC160/ODataV4/Company(\'KENYA\')/Sales_Order';
const USERNAME = process.env.BC_USERNAME;
const PASSWORD = process.env.BC_PASSWORD;

const syncToBackendSystem: AfterChangeHook = async (context) => {
    const { doc } = context;

    try {
        // Make a request to sync the order to the backend system
        const response = await axios.post(
            BC_URL,
            {
                Document_Type: "Order",
                No: doc.orderNumber, // Assuming orderNumber is a field in your document
                Sell_to_Customer_No: doc.customerNumber, // Assuming customerNumber is a field in your document
                Sell_to_Customer_Name: doc.customerName, // Assuming customerName is a field in your document
                Posting_Description: `Order ${doc.orderNumber}`,
                Retail_Type: "Cash", // Assuming retail type is always "Cash"
                Sell_to_Contact_No: doc.contactNumber, // Assuming contactNumber is a field in your document
                Sell_to_Phone_No: doc.phoneNumber, // Assuming phoneNumber is a field in your document
                Document_Date: doc.documentDate, // Assuming documentDate is a field in your document
                Posting_Date: doc.postingDate, // Assuming postingDate is a field in your document
                Order_Date: doc.orderDate, // Assuming orderDate is a field in your document
                Due_Date: doc.dueDate, // Assuming dueDate is a field in your document
                Salesperson_Code: "DAVISAPI", // Assuming salesperson code is always "DAVISAPI"
                Shortcut_Dimension_1_Code: "1080", // Assuming this is a constant
                Shortcut_Dimension_2_Code: "21010", // Assuming this is a constant
                Amount_To_Pay: doc.amountToPay, // Assuming amountToPay is a field in your document
                Assigned_User_ID: "DAVISAPI", // Assuming assigned user ID is always "DAVISAPI"
                Status: "Open", // Assuming status is always "Open"
                ShiptoName: doc.customerName, // Assuming ship to name is the same as customer name
                Bill_to_Name: doc.customerName, // Assuming bill to name is the same as customer name
                Location_Code: "21510", // Assuming this is a constant
                Shipment_Date: doc.shipmentDate, // Assuming shipmentDate is a field in your document
                Shipping_Advice: "Partial", // Assuming shipping advice is always "Partial"
                Prepayment_Percent: 0, // Assuming prepayment percent is always 0
                Compress_Prepayment: true, // Assuming compress prepayment is always true
                Prepmt_Payment_Terms_Code: "CASH", // Assuming prepayment payment terms code is always "CASH"
                Prepayment_Due_Date: doc.prepaymentDueDate, // Assuming prepaymentDueDate is a field in your document
                Prepmt_Payment_Discount_Percent: 0, // Assuming prepayment payment discount percent is always 0
                Prepmt_Pmt_Discount_Date: doc.prepaymentDiscountDate, // Assuming prepaymentDiscountDate is a field in your document
            },
            {
                auth: {
                    username: USERNAME,
                    password: PASSWORD,
                },
            }
        );

        // Handle the response from the backend system
        console.log(response.data); // Replace with your own logic

    } catch (error: any) {
        // Handle any errors that occur during the request
        console.error(error);

        // Handle specific errors related to the order page
        if (error.response && error.response.status === 404) {
            // Handle 404 error
            console.log("Order not found");
        } else {
            // Handle other errors
            console.log("Error syncing order to backend system");
        }
    }
    }

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'createdAt',
        defaultColumns: ['createdAt', 'orderedBy'],
        preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
    },
    hooks: {
        beforeChange: [],
        afterChange: [updateUserPurchases, clearUserCart, syncToBackendSystem], // Add the syncToBackendSystem hook
    },
    access: {
        read: adminsOrOrderedBy,
        update: admins,
        create: adminsOrLoggedIn,
        delete: admins,
    },
    fields: [
        {
            name: 'orderedBy',
            type: 'relationship',
            relationTo: 'users',
            hooks: {
                beforeChange: [populateOrderedBy],
            },
        },
        {
            name: 'stripePaymentIntentID',
            label: 'Stripe Payment Intent ID',
            type: 'text',
            admin: {
                position: 'sidebar',
                components: {
                    Field: LinkToPaymentIntent,
                },
            },
        },
        {
            name: 'total',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                    required: true,
                },
                {
                    name: 'price',
                    type: 'number',
                    min: 0,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    min: 0,
                },
            ],
        },
    ],
};
