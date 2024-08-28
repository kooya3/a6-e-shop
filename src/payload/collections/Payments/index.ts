import type { CollectionConfig } from 'payload/types'

import { loggedIn } from '../../access/loggedIn'
import { adminsOrPaidBy } from './access/adminsOrPaidBy'
import { populatePaidBy } from './hooks/populatePaidBy'

export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'payer', 'order', 'status'],
  },
  hooks: {
    beforeChange: [],
  },
  access: {
    read: adminsOrPaidBy,
    update: () => false,
    create: loggedIn,
    delete: () => false,
  },
  fields: [
    {
      name: 'trackingID',
      label: 'Payment Tracking ID',
      type: 'text',
      required: true,
    },
    {
      name: 'paidBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populatePaidBy],
      },
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
    },
    {
      name: 'paymentMethod',
      type: 'text',
    },
    {
      name: 'amount',
      type: 'number',
    },
    {
      name: 'confirmationCode',
      type: 'text',
    },
    {
      name: 'paymentStatusDescription',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'message',
      type: 'text',
    },
    {
      name: 'paymentAccount',
      type: 'text',
    },
    {
      name: 'currency',
      type: 'text',
    },
  ],
}
