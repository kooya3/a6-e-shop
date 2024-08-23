import path from 'path'
import payload from 'payload'

import { NoImageAvailable } from './no-image-available'

export async function createImage(): Promise<string | number> {
  const [noImageAvailableDoc] = await Promise.all([
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'no-image-available.jpg'),
      data: NoImageAvailable,
    }),
  ])

  let noImageAvailableID = noImageAvailableDoc.id

  if (payload.db.defaultIDType === 'text') {
    noImageAvailableID = `"${noImageAvailableID}"`
  }

  return noImageAvailableID
}
