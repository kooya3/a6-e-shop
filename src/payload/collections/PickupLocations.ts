import type { CollectionConfig } from 'payload/types'

import { admins } from '../access/admins'

const PickupLocations: CollectionConfig = {
  slug: 'pickup-locations',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}

export default PickupLocations
