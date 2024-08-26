import payload from "payload"
export async function updateOrderPaymentStatus(orderReference: string, paymentStatus: 'pending' | 'failed' | 'paid'): Promise<void> {
  try {
    const order = await payload.find({
      collection: 'orders',
      where: {
        orderReference: {
          equals: orderReference,
        },
      },
    })

    if (order.docs.length < 1) {
      throw new Error(`Order with orderReference ${orderReference} could not be found`)
    }

    await payload.update({
      collection: 'orders',
      id: order.docs[0].id,
      data: {
        status: paymentStatus,
      },
    })


  } catch (err: unknown) {
    payload.logger.error(err)
    throw new Error(`We couldn't update your order with orderReference ${orderReference}`)
  }
}
