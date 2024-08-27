import type { Access, AccessArgs } from 'payload/config'

import type { User } from '../payload-types'

export const loggedIn: Access = ({ req }: AccessArgs<User>) => {
  return !!req.user
}
