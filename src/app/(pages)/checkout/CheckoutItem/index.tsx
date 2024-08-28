import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'

import classes from './index.module.scss'

export const CheckoutItem = ({ product, title, metaImage, quantity }) => {
  return (
    <li className="flex gap-2 py-6">
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className="flex flex-col">
        <div className="flex py-2">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm" style={{ lineHeight: 1 }}>
              <Link
                href={`/products/${product.slug}`}
                className="font-medium text-gray-700 hover:text-gray-800"
              >
                {title}
              </Link>
            </h4>
          </div>

          <div className="ml-4 flow-root flex-shrink-0 !text-xs">
            <Price product={product} button={false} quantity={quantity} />
          </div>
        </div>
      </div>
    </li>
  )
}
