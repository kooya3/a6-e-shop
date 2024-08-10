import React from 'react'

import classes from './index.module.scss'


const Categories = () => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Shop By Categories</h3>
        <Link href="/products">
        Show More!
        </Link>
      </div>
    </section>
  )
}

export default Categories