import type { Product } from "../../payload-types"
import type { BCItem } from "../types/BCItem"


export const createProduct = (item: BCItem['value'][number]): Partial<Product> => {
  return {
    title: item.Description,
    bcProductID: item.No,
    unitPrice: item.Unit_Price,
    inventory: item.Inventory,
    slug: item.Description.toLowerCase().replace(' ', '-'),
    _status: 'published',
    meta: {
      title: item.Description,
      description: item.Description,
      image: '{{PRODUCT_IMAGE}}',
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'twoThirds',
            richText: [
              {
                children: [
                  {
                    text: "This content is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you'd like from rich text and images, to highly designed, complex components.",
                  },
                ],
              },
            ],
            link: {
              reference: null,
              url: '',
              label: '',
            },
          },
        ],
      },
    ],
    relatedProducts: [],
  }
}
