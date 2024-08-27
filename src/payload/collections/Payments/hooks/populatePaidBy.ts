import type { FieldHook } from 'payload/types'

import type { Payment } from '../../../payload-types'

export const populatePaidBy: FieldHook<Payment> = async ({ req, operation, value }) => {
  if ((operation === 'create' || operation === 'update') && !value) {
    return req.user.id
  }

  return value
}
