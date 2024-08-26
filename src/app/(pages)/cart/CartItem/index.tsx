'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, qty, addItemToCart }) => {
  const [quantity, setQuantity] = useState(qty)
  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  return (
    <li
      className="grid gap-4 md:grid-cols-4 border-b-solid border-b-2 border-b-gray-400 py-6 md:py-8"
      key={title}
    >
      <Link href={`/products/${product.slug}`} className="min-h-24">
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className="">
        <h6>{title}</h6>
        <Price product={product} button={false} />
      </div>

      <div className="flex justify-start md:justify-center items-start my-2">
        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQty}>
            <Image
              src="/assets/icons/minus.svg"
              alt="minus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>

          <input
            title="quantity"
            type="text"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQty}
          />

          <div className={classes.quantityBtn} onClick={incrementQty}>
            <Image
              src="/assets/icons/plus.svg"
              alt="plus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between md:justify-center items-start my-2 gap-14">
        <Price product={product} button={false} quantity={quantity} />
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
