import dotenv from 'dotenv'
import path from 'path'

import type { BCItem } from "../types/BCItem";

dotenv.config({
  path: path.resolve(__dirname, '../../../../.env'),
})

const BC_URL = process.env.BC_URL
const USERNAME = process.env.BC_USERNAME
const PASSWORD = process.env.BC_PASSWORD;

export async function fetchItemsFromBCByCategory({ limit = 50, categories }: { limit?: number; categories?: string[]; }): Promise<BCItem | null> {
  let filterString: string | undefined;
  let filter: string | undefined;

  const filterArray = categories.map((value, index, array) => {
    const encodedFilter = `Gen_Prod_Posting_Group%20eq%20%27${value}%27`;
    return index < array.length - 1 ? `${encodedFilter}%20or%20` : encodedFilter;
  });

  filterString = filterArray.join('')

  if (filterString) {
    filter = `&$filter=${filterString}`
  }

  const url = `${BC_URL}/ItemsAPI?$top=${limit}${filter}`

  console.log('url', url)

  const response = await fetch(
    url,
    {
      headers: {
        Authorization: 'Basic ' + Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'),
      },
    }
  );

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const result = await response.json();

  return result.value.length > 0 ? result : null;
}
