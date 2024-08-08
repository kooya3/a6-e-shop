import React from 'react'

import classes from './index.module.scss'
import { noHeaderFooterUrls } from '../../../constants'
import { usePathname } from 'next/navigation'

const FooterComponent = () => {
  const pathName = usePathname();


  return (
    <footer className={noHeaderFooterUrls.includes(pathName) ? classes.hide : ''} />
  )
}

export default FooterComponent