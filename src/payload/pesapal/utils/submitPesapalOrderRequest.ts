import type { MutatePesapal } from "../types/mutate-pesapal-order"
import type { SubmitPesapalOrderRequest } from "../types/SubmitPesapalOrderRequest"
import { getPesapalAccessToken } from "./getPesapalAccessToken"

const PESAPAL_URL = process.env.NEXT_PUBLIC_PESAPAL_URL

export async function submitPesapalOrderRequest(payload: MutatePesapal): Promise<SubmitPesapalOrderRequest> {
  const authToken = await getPesapalAccessToken()

  const postOrderRequest = await fetch(`${PESAPAL_URL}/Transactions/SubmitOrderRequest`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken.token}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!postOrderRequest.ok) {
    throw new Error(`${postOrderRequest.status}`)
  }

  return await postOrderRequest.json()
}
