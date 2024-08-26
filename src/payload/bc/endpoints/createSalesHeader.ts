import type { MutateSalesOrder } from "../types/MutateSalesOrder"
import type { SalesOrder } from "../types/SalesOrder"

const BC_URL = process.env.BC_URL
const USERNAME = process.env.BC_USERNAME
const PASSWORD = process.env.BC_PASSWORD

export async function createSalesHeader(payload: MutateSalesOrder): Promise<SalesOrder> {
  const postSalesOrder = await fetch(`${BC_URL}/Sales_Order`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'),
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!postSalesOrder.ok) {
    throw new Error(`${postSalesOrder.status}`)
  }

  return await postSalesOrder.json()
}
