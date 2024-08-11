'use client'

import React from 'react'

import classes from './index.module.scss'

const Filters = () => {
  const {categoryFilters, sort, setcCategoryFilters, setSort} = useFilter()

  const handleCategories() {


  return (
    <div className={classes.filters}>
      <div>
        <h6 className={classes.title}>
          Product Categories
        </h6>
        <div className={classes.categories}>
          
        </div>
      </div></div>


  )
}

export default Filters