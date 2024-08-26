import React from 'react'
import { draftMode } from 'next/headers'

import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import Filters from './Filters'
import Sort from './Sort'

import classes from './index.module.scss'

type searchParams = { search?: string }

const Products = async ({ search }: searchParams) => {
  const { isEnabled: isDraftMode } = draftMode()

  if (search) {
  }

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    })

    categories = await fetchDocs<Category>(`categories`)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  return (
    <div>
      <Gutter>
        <div className="sm:grid sm:gap-4 sm:grid-cols-5">
          <Filters categories={categories} />
          <div className="sm:col-span-4 flex flex-col">
            <Sort />
            <Blocks blocks={page.layout} disableTopPadding={true} />
          </div>
        </div>
      </Gutter>
    </div>
  )
}

export default Products
