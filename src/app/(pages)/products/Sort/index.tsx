'use client'

import React, { ChangeEvent } from 'react'

import { useFilter } from '../../../_providers/Filter'

const Sort = () => {
  const { sort, setSort } = useFilter()

  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value)
  }

  return (
    <div className="sm:flex sm:justify-end">
      <div className="flex flex-row gap-2">
        <label htmlFor="sortBy" className="font-bold">
          Sort By:
        </label>

        <select name="sortBy" id="sortBy" value={sort} onChange={handleSort}>
          <option value="-unitPrice">Price High to Low</option>
          <option value="unitPrice">Price Low to High</option>
        </select>
      </div>
    </div>
  )
}

export default Sort
