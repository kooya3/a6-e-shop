'use client'

import React, { useCallback } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { calculatePrice } from '../../../_components/Price'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CheckoutForm: React.FC<{}> = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()

  const handlePaystackPayment = useCallback(async () => {
    try {
      // Create the order on your server
      const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: cartTotal.raw,
          items: (cart?.items || [])?.map(({ product, quantity }) => ({
            product: typeof product === 'string' ? product : product.id,
            quantity,
          })),
        }),
      })

      if (!orderReq.ok) {
        throw new Error('Failed to create order')
      }

      const order = await orderReq.json()

      // Redirect to Paystack payment page
      window.location.href = 'https://paystack.com/pay/dnshirtliff'

      // Listen for payment success callback
      window.addEventListener('message', async event => {
        if (event.origin !== 'https://paystack.com/pay/dnshirtliff') return

        if (event.data.status === 'success') {
          // Clear the cart after order creation

          // Redirect to order confirmation page with the order ID
          router.push(`/order-confirmation?orderId=${order.id}`)
        }
      })
    } catch (error) {
      console.error('Error handling Paystack payment:', error)
      setError('Payment failed. Please try again.')
    }
  }, [cart, cartTotal, router])

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      setIsLoading(true)

      try {
        const { error: stripeError, paymentIntent } = await stripe?.confirmPayment({
          elements: elements!,
          redirect: 'if_required',
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order-confirmation`,
          },
        })

        if (stripeError) {
          setError(stripeError.message)
          setIsLoading(false)
        }

        if (paymentIntent) {
          // Before redirecting to the order confirmation page, we need to create the order in Payload
          // Cannot clear the cart yet because if you clear the cart while in the checkout
          // you will be redirected to the `/cart` page before this redirect happens
          // Instead, we clear the cart in an `afterChange` hook on the `orders` collection in Payload
          try {
            const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                total: cartTotal.raw,
                stripePaymentIntentID: paymentIntent.id,
                items: (cart?.items || [])?.map(({ product, quantity }) => ({
                  product: typeof product === 'string' ? product : product.id,
                  quantity,
                  price:
                    typeof product === 'object'
                      ? calculatePrice(product.unitPrice, 1, true)
                      : undefined,
                })),
              }),
            })

            if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

            const {
              error: errorFromRes,
              doc,
            }: {
              message?: string
              error?: string
              doc: Order
            } = await orderReq.json()

            if (errorFromRes) throw new Error(errorFromRes)

            router.push(`/order-confirmation?order_id=${doc.id}`)
          } catch (err) {
            // don't throw an error if the order was not created successfully
            // this is because payment _did_ in fact go through, and we don't want the user to pay twice
            console.error(err.message) // eslint-disable-line no-console
            router.push(`/order-confirmation?error=${encodeURIComponent(err.message)}`)
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Something went wrong.'
        setError(`Error while submitting payment: ${msg}`)
        setIsLoading(false)
      }
    },
    [stripe, elements, router, cart, cartTotal],
  )

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {error && <Message error={error} />}
      <PaymentElement />
      <div className={classes.actions}>
        <Button label="Back to cart" href="/cart" appearance="secondary" />
        <Button
          label={isLoading ? 'Loading...' : 'Checkout'}
          type="submit"
          appearance="primary"
          disabled={!stripe || isLoading}
        />
        <Button
          label="Pay with Mpesa"
          className={classes.button}
          onClick={handlePaystackPayment}
          appearance="primary"
        />
      </div>
    </form>
  )
}

export default CheckoutForm
