import React, { Fragment } from 'react'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Message } from '../../_components/Message'
import { Price } from '../../_components/Price'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    id,
    stripeProductID,
    title,
    categories,
    meta: { image: metaImage, description } = {},
  } = product

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName={classes.image} resource={metaImage} fill />
        )}
      </div>
      {metaImage && typeof metaImage !== 'string' && metaImage?.caption && (
        <RichText content={metaImage.caption} className={classes.caption} />
      )}

      <div className={classes.details}>
        <h3 className={classes.title}>
        {title}
        </h3>        


        <div className={classes.categoryWrapper}>

        </div>
      </div>


      <div className={classes.categories}>
        {categories?.map((category, index) => {
          if (typeof category === 'object' && category !== null) {
            const { title: categoryTitle } = category

            const titleToUse = categoryTitle || 'Untitled category'

            const isLast = index === categories.length - 1

            return (
              <Fragment key={index}>
                {titleToUse}
                {!isLast && <Fragment>, &nbsp;</Fragment>}
              </Fragment>
            )
          }

          return null
        })}
      </div>

      <div>
        <p className={classes.description}>
          {`${description ? `${description} ` : ''}To edit this product, `}
          <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}>
            navigate to the admin dashboard
          </Link>
          {'.'}
        </p>
      </div>
      <Price product={product} button={false} />
      </Gutter >
  )
}
