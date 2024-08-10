import React from 'react'

import classes from './index.module.scss'
import { useFilter } from '../../../_providers/Filter'

const Filters = () => {
  const { categoryFilters, setCategoryFilters, sort, setSort } = useFilter();

  return (
    <div className={classes.filers}><div>
        <h6 className={classes.title}>Product Categories</h6>
        <div className={classes.Categories}>

        </div>
    </div></div>
  )
}

export default Filters