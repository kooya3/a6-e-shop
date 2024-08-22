import type { BCCustomer } from "../types/BCCustomer"
import type { MutateBCCustomer } from "../types/MutateBCCustomer"

const BC_URL = process.env.BC_URL
const USERNAME = process.env.BC_USERNAME
const PASSWORD = process.env.BC_PASSWORD

export async function createNewBCCustomer(payload: MutateBCCustomer): Promise<BCCustomer['value'][number]> {
  const postBCCustomer = await fetch(`${BC_URL}/Customer_Card`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'),
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!postBCCustomer.ok) {
    throw new Error(`${postBCCustomer.status}`)
  }

  const customer = await postBCCustomer.json()

  return customer
}
