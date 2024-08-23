import payload from 'payload'

import { fetchItemsFromBCByCategory } from '../endpoints/fetchItemsFromBCByCategory'
import { createImage } from '../utilities/create-image'
import { createProduct } from '../utilities/create-product'

export const fetchCategoryCodes = async (): Promise<string[]> => {
  try {
    const categories = await payload.find({
      collection: 'categories',
    })

    return categories.docs.map(category => category.code as string)
  } catch (error: unknown) {
    payload.logger.error('Error fetching category codes')
    throw new Error('Error fetching category codes')
  }
}

export const scheduleFetchProductsFromBusinessCentral = async (): Promise<void> => {
  try {
    const categoryCodes = await fetchCategoryCodes()

    const items = await fetchItemsFromBCByCategory({
      categories: categoryCodes,
    })

    const noImageAvailableID = await createImage()

    for (const item of items) {
      const existingProduct = await payload.find({
        collection: 'products',
        where: {
          bcProductID: {
            equals: item.No,
          },
        },
      })

      if (existingProduct.docs.length > 0) {
        await payload.update({
          collection: 'products',
          id: existingProduct.docs[0].id,
          data: {
            title: item.Description,
            bcProductID: item.No,
            unitPrice: item.Unit_Price,
            inventory: item.Inventory,
          },
        })
      } else if (item.Description && item.No && item.Gen_Prod_Posting_Group && item.Inventory && item.Unit_Price) {
        const product = createProduct(item)
        const category = await payload.find({
          collection: 'categories',
          where: {
            code: {
              equals: item.Gen_Prod_Posting_Group,
            },
          },
        })

        if (category.docs.length > 0) {
          await payload.create({
            collection: 'products',
            data: JSON.parse(
              JSON.stringify({ ...product, categories: [category.docs[0].id] }).replace(
                /"\{\{PRODUCT_IMAGE\}\}"/g,
                noImageAvailableID.toString(),
              ),
            ),
          })
        }
      }
    }
  } catch (error: unknown) {
    payload.logger.info('Error fetching products:', error)
  }
}
