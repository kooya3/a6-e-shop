'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

export const calculatePrice = (unitPrice: number, quantity: number = 1, raw?: boolean): string => {
  let price = ''

  if (unitPrice) {
    try {
      const priceValue = unitPrice * quantity

      if (raw) return priceValue.toString()

      price = (priceValue / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'KES', // TODO: use `parsed.currency`
      })
    } catch (e) {
      console.error(`Cannot calculat price`) // eslint-disable-line no-console
    }
  }

  return price
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product: { unitPrice } = {}, button = 'addToCart', quantity } = props

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
  }>(() => ({
    actualPrice: calculatePrice(unitPrice),
    withQuantity: calculatePrice(unitPrice, quantity),
  }))

  useEffect(() => {
    setPrice({
      actualPrice: calculatePrice(unitPrice),
      withQuantity: calculatePrice(unitPrice, quantity),
    })
  }, [unitPrice, quantity])

  return (
    <div className={classes.actions}>
      {typeof price?.actualPrice !== 'undefined' && price?.withQuantity !== '' && (
        <div className={classes.price}>
          <p>{price?.withQuantity}</p>
        </div>
      )}
    </div>
  )
}
