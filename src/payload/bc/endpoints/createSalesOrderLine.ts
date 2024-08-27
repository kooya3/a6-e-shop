import type { MutateSalesOrderLine } from "../types/MutateSalesOrderLine"
import type { SalesOrderLine } from "../types/SalesOrderLine"

const BC_URL = process.env.BC_URL
const USERNAME = process.env.BC_USERNAME
const PASSWORD = process.env.BC_PASSWORD

export async function createSalesOrderLine(payload: MutateSalesOrderLine): Promise<SalesOrderLine> {
  const postSalesOrderLine = await fetch(`${BC_URL}/Sales_Order_Line`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'),
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!postSalesOrderLine.ok) {
    throw new Error(`${postSalesOrderLine.status}`)
  }

  return await postSalesOrderLine.json()
}
