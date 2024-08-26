import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { profileNavItems } from '../../constants/'

import classes from './index.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.container}>
      <Gutter>
        <h3>My Account</h3>
        <div className={classes.account}>
          <nav className={classes.nav} aria-label="Account navigation">
            <ul>
              {profileNavItems.map(item => (
                <li key={item.title}>
                  <Link href={item.url} className="flex gap-4 pt-0 px-4 pb-4 text-[var(--gray-12)]">
                    <Image src={item.icon} alt={item.title} width={24} height={24} />
                    <p>{item.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {children}
        </div>
      </Gutter>
    </div>
  )
}
