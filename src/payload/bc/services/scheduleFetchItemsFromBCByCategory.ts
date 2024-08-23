import payload from 'payload'

import { fetchItemsFromBCByCategory } from '../endpoints/fetchItemsFromBCByCategory'
import { createImage } from '../utilities/create-image';
import { createProduct } from '../utilities/create-product';

export const scheduleFetchProductsFromBusinessCentral = async (): Promise<void> => {
  try {
    const items = await fetchItemsFromBCByCategory({ categories: ['CAT04', 'CAT08', 'CAT10', 'CAT11', 'CAT12', 'CAT13', 'CAT15', 'CAT16', 'CAT18'] });
    const noImageAvailableID = await createImage()

    for (const item of items.value) {
      const existingProduct = await payload.find({
        collection: 'products',
        where: {
          bcProductID: {
            equals: item.No,
          },
        },
      });

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
        });
      } else {
        const product = createProduct(item)

        await payload.create({
          collection: 'products',
          data: JSON.parse(
            JSON.stringify({ ...product }).replace(
              /"\{\{PRODUCT_IMAGE\}\}"/g,
              noImageAvailableID,
            ),
          ),
        });
      }
    }
  } catch (error: unknown) {
    payload.logger.info('Error fetching products:', error);
  }
}
