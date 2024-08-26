'use client'

import React, { useEffect, useState } from 'react'
import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { useAuth } from '../../_providers/Auth'
import { useCart } from '../../_providers/Cart'
import { Button, Props } from '../Button'
import { Media } from '../Media'

import classes from './index.module.scss'

export const AddToCartButton: React.FC<{
  product: Product
  quantity?: number
  className?: string
  appearance?: Props['appearance']
}> = props => {
  const { product, quantity = 1, className, appearance = 'primary' } = props
  const metaImage = product.meta?.image

  const { user } = useAuth()
  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()
  const [isInCart, setIsInCart] = useState<boolean>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsInCart(isProductInCart(product))
  }, [isProductInCart, product, cart])

  return (
    <>
      <Button
        href={isInCart ? '/cart' : undefined}
        type={!isInCart ? 'button' : undefined}
        label={isInCart ? `✓ View in cart` : `Add to cart`}
        el={isInCart ? 'link' : undefined}
        appearance={appearance}
        className={[
          className,
          classes.addToCartButton,
          appearance === 'default' && isInCart && classes.green,
          !hasInitializedCart && classes.hidden,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={
          !isInCart
            ? () => {
                addItemToCart({
                  product,
                  quantity,
                })
                setIsOpen(true)
              }
            : undefined
        }
      />

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold text-lg flex justify-between">
                Added to your cart <CloseButton>X</CloseButton>
              </DialogTitle>

              <div className="grid grid-cols-3 py-6">
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="w-28 h-28">
                    {!metaImage && <div>No image</div>}
                    {metaImage && typeof metaImage !== 'string' && (
                      <Media imgClassName={classes.image} resource={metaImage} />
                    )}
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">{product.title}</h3>
                      <p className="mt-1 text-sm text-[var(--color-dark-60)]">
                        {product.unitPrice}
                      </p>
                    </div>
                    <div>
                      <p>Quantity: {quantity}</p>
                      <p>Total: {quantity * product.unitPrice}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    href={user ? '/checkout' : 'cart'}
                    type="button"
                    label={user ? `CHECKOUT NOW` : `VIEW CART`}
                    el="link"
                    appearance="primary"
                  />

                  <div>
                    <Link href="/shop">Or continue shopping</Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </DialogBackdrop>
      </Dialog>
    </>
  )
}
