import type { Access } from 'payload/config'

import { checkRole } from '../../Users/checkRole'

export const adminsOrPaidBy: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user)) {
    return true
  }

  return {
    paidBy: {
      equals: user?.id,
    },
  }
}
