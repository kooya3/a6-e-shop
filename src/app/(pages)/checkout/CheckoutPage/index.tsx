'use client'

import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import GooglePayButton from '@google-pay/button-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Order, Settings } from '../../../../payload/payload-types'
import { submitOrderRequest } from '../../../../payload/pesapal/endpoints/submitOrderRequest'
import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { calculatePrice } from '../../../_components/Price'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { CheckoutItem } from '../CheckoutItem'

import classes from './index.module.scss'

type FormData = {
  toShipName: string
  toShipCompany: string
  toShipAddress: string
  toShipApartment: string
  toShipcity: string
  toShipCountry: string
  toShipPhone: string
  toBillName: string
  toBillPhone: string
}

const CALLBACK_URL = process.env.NEXT_PUBLIC_SERVER_URL
const PESAPAL_NOTIFICATION_ID = process.env.NEXT_PUBLIC_PESAPAL_NOTIFICATION_ID

export const CheckoutPage: React.FC<{
  settings: Settings
  token: string
}> = ({ settings, token }) => {
  const { productsPage } = settings

  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [hideBilling, setHideBilling] = useState(true)
  const [loading, setLoading] = useState(false)

  const { cart, cartIsEmpty, cartTotal } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true)

      const currency = 'KES'
      const paymentMethod = 'pesapal'

      try {
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({
            currency,
            paymentMethod,
            total: cartTotal.raw,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price:
                typeof product === 'object'
                  ? calculatePrice(product.unitPrice, quantity, true)
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

        const payload = {
          id: doc.id,
          currency: currency,
          amount: cartTotal?.raw,
          description: `Order for ${user?.name}`,
          callback_url: `${CALLBACK_URL}/order-confirmation`,
          notification_id: PESAPAL_NOTIFICATION_ID,
          billing_address: {
            name: data.toBillName,
            phone_number: data.toBillPhone,
          },
        }

        const response = await submitOrderRequest(payload)

        if (response.status === '200') {
          const { redirect_url } = response

          window.location.href = redirect_url
        } else {
          setError(response.status)
          setLoading(false)
          throw new Error(`Couldn't process your payment`)
        }
      } catch (err: unknown) {
        throw new Error(`We couldn't create your order`)
      }
    },
    [cart, cartTotal, user, token],
  )

  const handleToggleBilling = () => {
    setHideBilling(!hideBilling)

    if (hideBilling) {
      setValue('toBillName', watch('toShipName'))
      setValue('toBillPhone', watch('toShipPhone'))
    } else {
      setValue('toBillName', '')
      setValue('toBillPhone', '')
    }
  }

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  if (!user) return null

  return (
    <Fragment>
      {cartIsEmpty && (
        <div>
          {'Your '}
          <Link href="/cart">cart</Link>
          {' is empty.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`}>Continue shopping?</Link>
            </Fragment>
          )}
        </div>
      )}
      {!cartIsEmpty && (
        <main className="">
          <h1 className="sr-only">Checkout</h1>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            <div className="w-full max-w-lg">
              <div className="flex w-full">
                <GooglePayButton
                  className="block flex-grow"
                  buttonSizeMode="fill"
                  environment="TEST"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: 'CARD',
                        parameters: {
                          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                          allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                          type: 'PAYMENT_GATEWAY',
                          parameters: {
                            gateway: 'example',
                            gatewayMerchantId: 'exampleGatewayMerchantId',
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: '12345678901234567890',
                      merchantName: 'Demo Merchant',
                    },
                    transactionInfo: {
                      totalPriceStatus: 'FINAL',
                      totalPriceLabel: 'Total',
                      totalPrice: '100.00',
                      currencyCode: 'USD',
                      countryCode: 'US',
                    },
                  }}
                  onLoadPaymentData={paymentRequest => {
                    console.log('load payment data', paymentRequest)
                  }}
                />
              </div>

              <div className="relative mt-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm font-medium text-gray-500">or</span>
                </div>
              </div>

              <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                <div className="flex flex-col gap-4">
                  <Input
                    name="toShipName"
                    label="Name"
                    register={register}
                    error={errors.toShipName}
                    pattern={''}
                    placeholder={''}
                    required
                  />

                  <Input
                    name="toShipCompany"
                    label="Company"
                    register={register}
                    error={errors.toShipCompany}
                    pattern={''}
                    placeholder={''}
                  />

                  <Input
                    name="toShipAddress"
                    label="Address"
                    register={register}
                    error={errors.toShipAddress}
                    pattern={''}
                    placeholder={''}
                    required
                  />

                  <Input
                    name="toShipApartment"
                    label="Apartment"
                    register={register}
                    error={errors.toShipApartment}
                    pattern={''}
                    placeholder={''}
                    required
                  />

                  <div className="flex gap-4">
                    <Input
                      name="toShipcity"
                      label="City"
                      register={register}
                      error={errors.toShipcity}
                      pattern={''}
                      placeholder={''}
                      required
                    />

                    <Input
                      name="toShipCountry"
                      label="Country"
                      register={register}
                      error={errors.toShipCountry}
                      pattern={''}
                      placeholder={''}
                      required
                    />
                  </div>

                  <Input
                    name="toShipPhone"
                    label="Phone"
                    register={register}
                    error={errors.toShipPhone}
                    pattern={''}
                    placeholder={''}
                    required
                  />
                </div>

                <h2 className="text-lg font-medium text-gray-900">Billing information</h2>

                <div>
                  <label className={classes.checkboxWrapper}>
                    <input
                      type="checkbox"
                      checked={hideBilling}
                      onChange={handleToggleBilling}
                      className={classes.checkbox}
                    />
                    Same as shipping information
                  </label>
                </div>

                {!hideBilling && (
                  <div className="flex flex-col gap-4">
                    <Input
                      name="toBillName"
                      label="Name"
                      register={register}
                      error={errors.toBillName}
                      pattern={''}
                      placeholder={''}
                      required
                    />

                    <Input
                      name="toBillPhone"
                      label="Phone"
                      register={register}
                      error={errors.toBillPhone}
                      pattern={''}
                      placeholder={''}
                      required
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  label={loading ? 'Processing' : `Pay ${cartTotal.formatted}`}
                  disabled={loading}
                  appearance="primary"
                  className={classes.submit}
                />
              </form>
            </div>

            <div className="w-full max-w-lg">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {cart?.items?.map(item => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { title, meta },
                      } = item

                      if (!quantity) return null

                      const metaImage = meta?.image

                      return (
                        <CheckoutItem
                          key={product.id}
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          quantity={quantity}
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">{cartTotal.formatted}</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">{cartTotal.formatted}</dd>
                </div>
              </dl>
            </div>
          </div>
        </main>
      )}
    </Fragment>
  )
}
