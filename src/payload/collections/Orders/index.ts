import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { syncOrderToBC } from './hooks/syncOrderToBC'
import { updateUserPurchases } from './hooks/updateUserPurchases'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy', 'status'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    beforeChange: [],
    afterChange: [updateUserPurchases, clearUserCart, syncOrderToBC],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: adminsOrLoggedIn,
    delete: admins,
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        { label: 'KES', value: 'KES' },
        { label: 'USD', value: 'USD' },
      ],
      defaultValue: 'KES',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Invalid', value: 'invalid' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Reversed', value: 'reversed' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'PesaPal', value: 'pesapal' },
        { label: 'Google Pay', value: 'googlepay' },
      ],
      required: true,
    },
    {
      name: 'pesapalDetails',
      type: 'group',
      fields: [
        {
          name: 'orderTrackingId',
          type: 'text',
        },
      ],
    },
    {
      name: 'googlePayDetails',
      type: 'group',
      fields: [
        {
          name: 'transactionId',
          type: 'text',
        },
        {
          name: 'paymentMethodToken',
          type: 'text',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
      ],
    },
  ],
}
