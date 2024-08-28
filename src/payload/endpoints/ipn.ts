import type { PayloadHandler } from 'payload/config';

import { updateOrderPaymentStatus } from '../collections/Orders/utils/updateOrderPaymentStatus';
import { updatePayment } from '../collections/Payments/utils/updatePayment';
import { getPesapalTransactionStatus } from '../pesapal/utils/getPesapalTransactionStatus';



const ipn: PayloadHandler = async (req, res): Promise<void> => {
  if (req.method === 'POST') {
    const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = req.body;

    if (!OrderTrackingId) {
      throw new Error('No OrderTracking ID found')
    }

    const transactionStatus = await getPesapalTransactionStatus(OrderTrackingId)

    switch (transactionStatus.status_code) {
      case 0:
        await updateOrderPaymentStatus(OrderMerchantReference, 'invalid')
        await updatePayment(OrderTrackingId, transactionStatus)
        break;
      case 1:
        await updateOrderPaymentStatus(OrderMerchantReference, 'completed')
        await updatePayment(OrderTrackingId, transactionStatus)
        break;
      case 2:
        await updateOrderPaymentStatus(OrderMerchantReference, 'failed')
        await updatePayment(OrderTrackingId, transactionStatus)
        break;
      case 3:
        await updateOrderPaymentStatus(OrderMerchantReference, 'reversed')
        await updatePayment(OrderTrackingId, transactionStatus)
        break;
    }

    res.status(200).send({ "orderNotificationType": OrderNotificationType, "orderTrackingId": OrderTrackingId, "orderMerchantReference": OrderMerchantReference, "status": 200 });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
};

export default ipn;
