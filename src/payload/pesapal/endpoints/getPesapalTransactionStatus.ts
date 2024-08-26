import type { PesapalTransactionStatus } from "../types/pesapal-transaction"
import { getPesapalAccessToken } from "./getPesapalAccessToken"

const PESAPAL_URL = process.env.NEXT_PUBLIC_PESAPAL_URL

export async function getPesapalTransactionStatus(orderTrackingId: string): Promise<PesapalTransactionStatus> {
  const authToken = await getPesapalAccessToken()

  const response = await fetch(
    `${PESAPAL_URL}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken.token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return await response.json();
}
