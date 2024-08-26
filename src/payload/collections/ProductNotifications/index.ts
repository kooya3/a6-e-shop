import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'

export const ProductNotifications: CollectionConfig = {
  slug: 'productNotifications',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['productID', 'email', 'notified'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    beforeChange: [],
    afterChange: [],
  },
  access: {
    read: admins,
    update: admins,
    create: anyone,
    delete: admins,
  },
  fields: [
    {
      name: 'productID',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'notified',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
