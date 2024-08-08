import React from 'react'
import { Header } from '../../../../payload/payload-types'
import { Gutter } from '../../Gutter'
import Link from 'next/link'

import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  return (
    <nav className={[classes.header]}>
        <Gutter className={classes.wrap}>
            <Link href="/">
            <img src="/logo-black.svg" alt="logo" />
            </Link>
        </Gutter>
    </nav>
  )
}

export default HeaderComponent