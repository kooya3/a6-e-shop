import React from 'react'

import classes from './index.module.scss'
import Link from 'next/link'


const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Shop By Categories</h3>
        <Link href="/products">
        Show More!
        </Link>

        <div className={classes.list}>
          {categories.map((category) => (
            <CategoryCard />
          )}

        </div>
      </div>
    </section>
  )
}

export default Categories