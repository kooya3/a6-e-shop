import type { BCCustomer } from "../types/BCCustomer";

const BC_URL = process.env.BC_URL
const USERNAME = process.env.BC_USERNAME
const PASSWORD = process.env.BC_PASSWORD;

export async function fetchCustomersFromBC({ limit = 50, filters }: { limit?: number; filters?: Record<string, string> }): Promise<BCCustomer> {
  let filterString: string | undefined;
  let filter: string | undefined;

  if (filters) {
    const filterArray = Object.entries(filters).map(([key, value], index, array) => {
      const encodedFilter = `${key}%20eq%20%27${value}%27`;
      return index < array.length - 1 ? `${encodedFilter}%20and%20` : encodedFilter;
    });

    filterString = filterArray.join();
  }

  if (filterString) {
    filter = `&$filter=${filterString}`
  }

  const response = await fetch(
    `${BC_URL}/Customer_Card?$top=${limit}${filter}`,
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
