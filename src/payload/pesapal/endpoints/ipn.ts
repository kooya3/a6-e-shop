import type { PayloadHandler } from 'payload/config';

import { updateOrderPaymentStatus } from '../../collections/Orders/utils/updateOrderPaymentStatus';
import { getPesapalTransactionStatus } from './getPesapalTransactionStatus';

const ipn: PayloadHandler = async (req, res): Promise<void> => {
  if (req.method === 'POST') {
    const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = req.body;

    if (!OrderTrackingId) {
      throw new Error('No OrderTracking ID found')
    }

    const transactionStatus = await getPesapalTransactionStatus(OrderTrackingId)

    switch (transactionStatus.description) {
      case 'COMPLETED':
        await updateOrderPaymentStatus(OrderMerchantReference, 'paid');
        break;
      case 'FAILED':
        await updateOrderPaymentStatus(OrderMerchantReference, 'failed');
        break;
    }

    res.status(200).send({ "orderNotificationType": OrderNotificationType, "orderTrackingId": OrderTrackingId, "orderMerchantReference": OrderMerchantReference, "status": 200 });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
};

export default ipn;
