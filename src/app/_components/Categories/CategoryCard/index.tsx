import React from 'react'

import classes from './index.module.scss'
import Link from 'next/link'



const CategoryCard= ({ category }: CategoryCardProps ) => {
  return (
    <Link href="/products" className={classes.card}>
        <p className={classes.title}>{Category.title}</p>
    </Link>
  )
}

export default CategoryCard