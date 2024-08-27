import { calculatePrice } from "../../../../app/_components/Price";
import type { Order, User } from "../../../payload-types"

interface CreatePayloadOrder {
  token: string;
  cartTotal: {
    formatted: string
    raw: number
  }
  cart: User['cart'];
  deliveryInfo: Partial<{
    Location_Code: string
    Contact_Name: string
    Contact_Phone_No: string
    Physical_Address: string
    Physical_Address_2: string
    City: string
    Delivery_Instruction: string
  }>
}

export async function createPayloadOrder({ token, cartTotal, cart, deliveryInfo }: CreatePayloadOrder): Promise<Order> {
  try {
    const payloadOrder = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        total: cartTotal.raw,
        items: (cart?.items || [])?.map(({ product, quantity }) => ({
          product: typeof product === 'string' ? product : product.id,
          quantity,
          price: typeof product === 'object'
            ? calculatePrice(product.unitPrice, quantity, true)
            : undefined,
        })),
        deliveryInfo,
      }),
    })

    if (!payloadOrder.ok) throw new Error(payloadOrder.statusText || 'Something went wrong while creating payload order.')

    const {
      error: errorFromRes,
      doc,
    }: {
      message?: string
      error?: string
      doc: Order
    } = await payloadOrder.json()

    if (errorFromRes) throw new Error(errorFromRes)

    return doc
  } catch (err: unknown) {
    throw new Error(`Couldn't create payload order`)
  }
}
