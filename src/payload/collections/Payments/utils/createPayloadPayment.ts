import type { Payment } from "../../../payload-types";

export async function createPayloadPayment({ token, trackingID, order }: { token: string; trackingID: string; order: string }): Promise<void> {
  const payloadPayment = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      trackingID,
      order,
    }),
  })

  if (!payloadPayment.ok) {
    throw new Error(payloadPayment.statusText || 'Something went wrong while creating payload payment.')
  }

  const {
    error: errorFromRes,
  }: {
    message?: string
    error?: string
    doc: Payment
  } = await payloadPayment.json()

  if (errorFromRes) {
    throw new Error(errorFromRes)
  }
}
