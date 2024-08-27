import type { PayloadHandler } from 'payload/config';

import { updateOrderPaymentStatus } from '../../collections/Orders/utils/updateOrderPaymentStatus';
import { getPesapalTransactionStatus } from './getPesapalTransactionStatus';

const ipn: PayloadHandler = async (req, res): Promise<void> => {
  console.log('calling ipn')
  if (req.method === 'POST') {
    const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = req.body;

    if (!OrderTrackingId) {
      throw new Error('No OrderTracking ID found')
    }

    const transactionStatus = await getPesapalTransactionStatus(OrderTrackingId)

    console.log('transaction status', transactionStatus)

    switch (transactionStatus.status_code) {
      case 0:
        await updateOrderPaymentStatus(OrderMerchantReference, 'invalid');
        break;
      case 1:
        await updateOrderPaymentStatus(OrderMerchantReference, 'completed');
        break;
      case 2:
        await updateOrderPaymentStatus(OrderMerchantReference, 'failed');
        break;
      case 3:
        await updateOrderPaymentStatus(OrderMerchantReference, 'reversed');
        break;
    }

    res.status(200).send({ "orderNotificationType": OrderNotificationType, "orderTrackingId": OrderTrackingId, "orderMerchantReference": OrderMerchantReference, "status": 200 });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
};

export default ipn;
