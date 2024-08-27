import { calculatePrice } from "../../../../app/_components/Price";
import type { Order, User } from "../../../payload-types"

interface CreatPayloadOrder {
  cartTotal: {
    formatted: string
    raw: number
  }
  cart: User['cart'];
  orderReference: string;
  currency?: string;
  paymentMethod: string;
  pesapalDetails?: { orderTrackingId: string };
  googlePayDetails?: string;
}

export async function createPayloadOrder({ cartTotal, cart, orderReference, currency, paymentMethod, pesapalDetails, googlePayDetails }: CreatPayloadOrder): Promise<void> {
  console.log('createPayloadOrder called with:', { cartTotal, cart, orderReference, currency, paymentMethod, pesapalDetails, googlePayDetails });

  try {
    const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderReference,
        currency,
        paymentMethod,
        pesapalDetails,
        googlePayDetails: {},
        total: cartTotal.raw,
        items: (cart?.items || [])?.map(({ product, quantity }) => ({
          product: typeof product === 'string' ? product : product.id,
          quantity,
          price: typeof product === 'object'
            ? calculatePrice(product.unitPrice, quantity, true)
            : undefined,
        })),
      }),
    })

    if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

    const {
      error: errorFromRes,
    }: {
      message?: string
      error?: string
      doc: Order
    } = await orderReq.json()

    if (errorFromRes) throw new Error(errorFromRes)
  } catch (err: unknown) {
    throw new Error(`We couldn't create your order`)
  }
}
