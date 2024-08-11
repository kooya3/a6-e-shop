'use client'

import React from 'react'

import classes from './index.module.scss'
import { useFilter } from '../../../_providers/Filter'

const Filters = () => {
  const {categoryFilters, sort, setCategoryFilters, setSort} = useFilter()

  const handleCategories = (categoryId: string) => {
  
  }

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