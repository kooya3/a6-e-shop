'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, addItemToCart, currency, cartTotal, hasInitializedCart } = useCart()

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              Your cart is empty.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link href={`/${productsPage.slug}`}>Click here</Link>
                  {` to start shopping, or `}
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  {' '}
                  <Link href={`/login?redirect=%2Fcart`}>log in</Link>
                  {` to view a saved cart.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.cartWrapper}>
              <div>
                {/* CART ITEM LIST */}
                <ul className={classes.itemsList}>
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta, stripeProductID, bcProductID },
                      } = item

                      const isLast = index === (cart?.items?.length || 0) - 1

                      const metaImage = meta?.image

                      return (
                        <div
                          key={item.product.id}
                          className={
                            isLast
                              ? ''
                              : 'border-b-[1px] border-b-gray-300 border-solid border-t-0 border-x-0'
                          }
                        >
                          <CartItem
                            product={product}
                            title={title}
                            metaImage={metaImage}
                            qty={quantity}
                            addItemToCart={addItemToCart}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <div className="mt-10">
                <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                  <h2 className="sr-only">Order summary</h2>

                  <div className="flow-root">
                    <dl className="-my-4 divide-y divide-gray-200 text-sm">
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-gray-600">Subtotal</dt>
                        <dd className="font-medium text-gray-900">{cartTotal.formatted}</dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-gray-600">Shipping</dt>
                        <dd className="font-medium text-gray-900">250.00</dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-gray-600">Tax</dt>
                        <dd className="font-medium text-gray-900">120.32</dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                        <dd className="text-base font-medium text-gray-900">
                          {cartTotal.formatted}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-10 flex">
                  <Button
                    className="flex-grow"
                    href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                    label={user ? 'Checkout' : 'Login to checkout'}
                    appearance="primary"
                  />
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <Link href="/shop">Or Continue Shopping</Link>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
