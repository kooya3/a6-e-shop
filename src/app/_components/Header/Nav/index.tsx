'use client'

import React from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav
      className={[classes.nav, user === undefined && classes.hide, 'text-base']
        .filter(Boolean)
        .join(' ')}
    >
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="none"
            className="hover:underline !text-[var(--gray-12)]"
          />
        )
      })}
      <CartLink className="hover:underline !text-[var(--gray-12)]" />
      {user && (
        <Link href="/account" className="hover:underline !text-[var(--gray-12)]">
          Account
        </Link>
      )}
      {!user && (
        <Button el="link" href="/login" label="Login" appearance="primary" className="capitalize" />
      )}
    </nav>
  )
}
