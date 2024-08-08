import React from 'react'
import { Header } from '../../../../payload/payload-types'
import { Gutter } from '../../Gutter'
import Link from 'next/link'

import classes from './index.module.scss'
import Image from 'next/image'
import { HeaderNav } from '../Nav'

const HeaderComponent = ({ header }: { header: Header }) => {
  return (
    <nav className={[classes.header]}>
        <Gutter className={classes.wrap}>
            <Link href="/">
            <Image src="/logo-black.svg" alt="logo" width={170} height={50} />
            </Link>

            <HeaderNav header={header}/>
            <HeaderMobileNav />
        </Gutter>
    </nav>
  )
}

export default HeaderComponent