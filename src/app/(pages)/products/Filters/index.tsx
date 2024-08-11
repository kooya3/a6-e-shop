'use client'

import React from 'react'

import classes from './index.module.scss'
import { useFilter } from '../../../_providers/Filter'
import { Category } from '../../../../payload/payload-types'
import { Checkbox } from '../../../_components/Checkbox'
import { HR } from '../../../_components/HR'
import { RadioButton } from '../../../_components/Radio'



const Filters = ({ categories }: { categories: Category[] }) => {
  const {categoryFilters, sort, setCategoryFilters, setSort} = useFilter()

  const handleCategories = (categoryId: string) => {}
  const handleSort = () =>  {}

  return (
    <div className={classes.filters}>
      <div>
        <h6 className={classes.title}>
          Product Categories
        </h6>
        <div className={classes.categories}>
          {categories.map((category) => {
            const isSelected = categoryFilters.includes(category.id)


          return <Checkbox
              key={category.id}
              label={category.title}
              value={category.id}
              isSelected={isSelected}
              onClickHandler={handleCategories}
            /> 

          })}          
        </div>
        <HR className={classes.hr} />
        <h6 className={classes.title}>Sort By</h6>
        <div className={classes.categories}>
          <RadioButton 
            label="Latest"
            value="-createdAt"
            isSelected={sort === '-createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
        </div>
      </div>
      </div>


  )
}

export default Filters