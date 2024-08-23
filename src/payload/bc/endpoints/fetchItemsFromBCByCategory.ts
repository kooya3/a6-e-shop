import dotenv from 'dotenv'
import path from 'path'
import payload from 'payload'

import type { BCItem } from '../types/BCItem'

dotenv.config({
  path: path.resolve(__dirname, '../../../../.env'),
})

const BC_URL = process.env.BC_URL
const USERNAME = process.env.BC_USERNAME
const PASSWORD = process.env.BC_PASSWORD

export async function fetchItemsFromBCByCategory({
  limit = 50,
  categories,
}: {
  limit?: number
  categories: string[]
}): Promise<BCItem['value']> {
  let filterString: string | undefined
  let filter: string | undefined
  let allItems: BCItem['value'] = []
  let offset = 0
  let result: BCItem

  const createFilter = categories.map((value, index, array) => {
    const encodedFilter = `Gen_Prod_Posting_Group%20eq%20%27${value}%27`
    return index < array.length - 1 ? `${encodedFilter}%20or%20` : encodedFilter
  })

  filterString = createFilter.join('')

  if (!filterString) {
    return allItems
  }

  filter = `&$filter=${filterString}`

  do {
    const url = `${BC_URL}/ItemsAPI?$top=${limit}&$skip=${offset}${filter}`

    const response = await fetch(url, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'),
      },
    })

    if (!response.ok) {
      payload.logger.error('Error fetching items from BC')
      throw new Error(`${response.status}`)
    }

    result = await response.json()
    allItems = allItems.concat(result.value)
    offset += limit
  } while (result.value.length === limit)

  return allItems
}
