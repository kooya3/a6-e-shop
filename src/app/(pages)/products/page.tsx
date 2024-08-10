import React from 'react'
import classes from './index.module.scss'
import { Gutter } from '../../_components/Gutter'

const products = () => {
  return (
    <div className={classes.container}>
        <Gutter className={classes.products}>
            <Filters />
        </Gutter>
    </div>
  )
}

export default products