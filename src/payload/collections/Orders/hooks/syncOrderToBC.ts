import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import React, { useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';


const BC_URL = process.env.BC_URL
const USERNAME = process.env.BC_USERNAME
const PASSWORD = process.env.BC_PASSWORD

const syncOrderToBC = () => {
    // ...

    useEffect(() => {
        const createOrderInBC = async () => {
            try {
                // Make a request to create the order in Business Central
                const response = await axios.post(`${BC_URL}/api/orders`, {
                    orderId: 'YOUR_ORDER_ID', // Replace with the actual order ID
                    // Include any other relevant order data here
                }, {
                    auth: {
                        username: USERNAME,
                        password: PASSWORD
                    }
                });

                // Handle the response from Business Central
                console.log(response.data); // Replace with your own logic

            } catch (error) {
                // Handle any errors that occur during the request
                console.error(error);
            }
        };

        createOrderInBC();
    }, []);

    // ...
}

export { syncOrderToBC }; // Export the hook as part of the module exports
