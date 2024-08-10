import React from 'react'

import classes from './index.module.scss'
import Link from 'next/link'


const Categories = () => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Shop By Categories</h3>
        <Link href="/products">
        Show More!
        </Link>

        <div className={classes.list}>
          
        </div>
      </div>
    </section>
  )
}

export default Categories