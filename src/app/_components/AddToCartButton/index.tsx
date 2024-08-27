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
        label={isInCart ? `✓ View in Cart` : `Add to Cart`}
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
              }
            : undefined
        }
      />

      {isInCart && (
        <Button
          href="/products"
          type="button"
          label="Continue Shopping"
          el="link"
          appearance="secondary"
          className="mt-3"
        />
      )}
    </>
  )
}
