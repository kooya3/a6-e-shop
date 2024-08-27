import payload from "payload"

import type { PesapalTransactionStatus } from "../../../pesapal/types/pesapal-transaction"

export async function updatePayment(orderTrackingID: string, transactionStatus: PesapalTransactionStatus): Promise<void> {
  try {
    const payment = await payload.find({
      collection: 'payments',
      where: {
        trackingID: {
          equals: orderTrackingID,
        },
      },
    })

    if (payment.totalDocs === 0) {
      throw new Error(`Could not find payment with tracking ID ${orderTrackingID}`)
    }

    const paymentID = payment.docs[0].id

    const data = {
      paymentMethod: transactionStatus.payment_method,
      amount: transactionStatus.amount,
      confirmationCode: transactionStatus.confirmation_code,
      paymentStatusDescription: transactionStatus.payment_status_description,
      description: transactionStatus.description,
      message: transactionStatus.message,
      paymentAccount: transactionStatus.payment_account,
      currency: transactionStatus.currency,
    }

    await payload.update({
      collection: 'payments',
      id: paymentID,
      data,
    })

  } catch (err: unknown) {
    payload.logger.error(err)
    throw new Error(`Couldn't update payment with tracking ID ${transactionStatus.merchant_reference}`)
  }
}
