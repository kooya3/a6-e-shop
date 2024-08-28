'use client'

import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Description, Field, Label, Radio, RadioGroup, Select, Textarea } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { BCLocation } from '../../../../payload/bc/types/BCLocation'
import { createPayloadOrder } from '../../../../payload/collections/Orders/utils/createPayloadorder'
import { createPayloadPayment } from '../../../../payload/collections/Payments/utils/createPayloadPayment'
import { Settings } from '../../../../payload/payload-types'
import { submitPesapalOrderRequest } from '../../../../payload/pesapal/utils/submitPesapalOrderRequest'
import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { CheckoutItem } from '../CheckoutItem'

import classes from './index.module.scss'

export type DeliveryInfo = {
  Location_Code: string
  Contact_Name: string
  Contact_Phone_No: string
  Physical_Address: string
  Physical_Address_2: string
  City: string
  Delivery_Instruction: string
}

const CALLBACK_URL = process.env.NEXT_PUBLIC_SERVER_URL
const PESAPAL_NOTIFICATION_ID = process.env.NEXT_PUBLIC_PESAPAL_NOTIFICATION_ID

const deliveryMethods = [
  {
    id: 1,
    title: 'Delivery via Davis & Shirtliff courier',
    turnaround: '1-3 business days',
    price: 'KES 600',
  },
  {
    id: 2,
    title: 'Free collection from any Davis & Shirtliff store',
    turnaround: 'Immediate',
    price: 'KES 0',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const CheckoutPage: React.FC<{
  settings: Settings
  token: string
  pickupLocations: BCLocation['value']
}> = ({ settings, token, pickupLocations }) => {
  const { productsPage } = settings

  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
  const [loading, setLoading] = useState(false)
  const { cart, cartIsEmpty, cartTotal } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryInfo>()

  const onSubmit = useCallback(
    async (data: DeliveryInfo) => {
      setLoading(true)

      const currency = 'KES'
      const Logistics_To_Deliver = selectedDeliveryMethod.id === 1 ? true : false
      const deliveryInfo = {
        ...data,
        Logistics_To_Deliver,
      }

      try {
        const payloadOrder = await createPayloadOrder({ token, cartTotal, cart, deliveryInfo })

        const pesapalPayload = {
          id: payloadOrder.id,
          currency: currency,
          amount: cartTotal?.raw,
          description: `Order for ${user?.name}`,
          callback_url: `${CALLBACK_URL}/order-confirmation`,
          notification_id: PESAPAL_NOTIFICATION_ID,
          billing_address: {
            name: user?.name,
            email_address: user?.email,
            phone_number: data.Contact_Phone_No,
            line_1: data.Physical_Address,
            line_2: data.Physical_Address_2,
            city: data.City,
          },
        }

        const pesapalOrderRequest = await submitPesapalOrderRequest(pesapalPayload)

        if (pesapalOrderRequest.status === '200') {
          const { redirect_url, order_tracking_id } = pesapalOrderRequest

          await createPayloadPayment({
            token,
            trackingID: order_tracking_id,
            order: payloadOrder.id,
          })

          window.location.href = redirect_url
        } else {
          setLoading(false)
          throw new Error(`Couldn't process your payment`)
        }
      } catch (err: unknown) {
        setLoading(false)
        throw new Error(`Couldn't create your order`)
      }
    },
    [cart, cartTotal, token, user, selectedDeliveryMethod],
  )

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
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="border-t border-gray-200">
                  <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                    <label className="text-lg font-medium text-gray-900">Delivery method</label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4">
                      {deliveryMethods.map(deliveryMethod => (
                        <Radio
                          key={deliveryMethod.id}
                          value={deliveryMethod}
                          className={({ checked }) =>
                            classNames(
                              checked
                                ? 'border border-solid border-[var(--blue-8)] rounded flex bg-[var(--blue-1)] p-4'
                                : 'border border-solid border-[var(--gray-8)] rounded flex bg-[var(--blue-1)] p-4',
                            )
                          }
                        >
                          {({ checked }) => (
                            <>
                              <span className="flex flex-1">
                                <span className="flex flex-col">
                                  <label className="block text-sm font-medium text-gray-900">
                                    {deliveryMethod.title}
                                  </label>
                                  <Description
                                    as="span"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    {deliveryMethod.turnaround}
                                  </Description>
                                  <Description
                                    as="span"
                                    className="mt-6 text-sm font-medium text-gray-900"
                                  >
                                    {deliveryMethod.price}
                                  </Description>
                                </span>
                              </span>
                              {checked ? (
                                <CheckCircleIcon
                                  className="h-5 w-5 text-[var(--blue-9)]"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <span
                                className={classNames(
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg',
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {selectedDeliveryMethod.id === 2 && (
                  <>
                    <h2 className="text-lg font-medium text-gray-900">Store Locations</h2>

                    <Field>
                      <Label>Choose a store</Label>
                      <Select
                        required
                        name="Location_Code"
                        {...register('Location_Code')}
                        className="w-full h-10 rounded px-2 border border-[var(--gray-6)] data-[focus]:border-[var(--blue-9)]"
                        aria-label="Stores available for pickup"
                      >
                        {pickupLocations.map(pickupLocation => (
                          <option key={pickupLocation.Code} value={pickupLocation.Code}>
                            {pickupLocation.Name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </>
                )}

                {selectedDeliveryMethod.id === 1 && (
                  <>
                    <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                    <div className="flex flex-col gap-4">
                      <Input
                        name="Contact_Name"
                        label="Name"
                        register={register}
                        error={errors.Contact_Name}
                        pattern={''}
                        placeholder={''}
                        required
                      />

                      <Input
                        name="Contact_Phone_No"
                        label="Phone Number"
                        register={register}
                        error={errors.Contact_Phone_No}
                        pattern={''}
                        placeholder={''}
                        required
                      />

                      <Input
                        name="Physical_Address"
                        label="Physical Address"
                        register={register}
                        error={errors.Physical_Address}
                        pattern={''}
                        placeholder={''}
                        required
                      />

                      <div className="flex gap-4">
                        <Input
                          name="City"
                          label="City / Town"
                          register={register}
                          error={errors.City}
                          pattern={''}
                          placeholder={''}
                          required
                        />

                        <Input
                          name="Physical_Address_2"
                          label="Street, Building or House No"
                          register={register}
                          error={errors.Physical_Address_2}
                          pattern={''}
                          placeholder={''}
                          required
                        />
                      </div>

                      <Field>
                        <Label>Delivery Instructions</Label>
                        <Textarea
                          placeholder="Add any extra information concerned with the delivery of your items here..."
                          name="Delivery_Instruction"
                          {...register('Delivery_Instruction')}
                          className="w-full min-h-24 p-3 border border-solid border-[var(--gray-8)] rounded data-[focus]:border-[var(--blue-9)]"
                        ></Textarea>
                      </Field>
                    </div>
                  </>
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
