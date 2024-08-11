import React from 'react'
import classes from './index.module.scss'
import { Gutter } from '../../_components/Gutter'
import Filters from './Filters'
import { Blocks } from '../../_components/Blocks'
import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { draftMode } from 'next/headers'
import { fetchDocs } from '../../_api/fetchDocs'
import { HR } from '../../_components/HR'

const Products = async () => {

    const {isEnabled: isDraftMode} = draftMode()

    let page: Page | null = null;
    let categories: Category[] | null = null;

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
    <div className={classes.container}>
        <Gutter className={classes.products}>
            <Filters categories={categories} />
            <Blocks  blocks={page.layout} disableTopPadding={true} />
            <HR />
        </Gutter>
    </div>
  )
}

export default Products