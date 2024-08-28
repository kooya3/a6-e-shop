import React from 'react'
import { Metadata } from 'next'

import { BCLocation } from '../../../payload/bc/types/BCLocation'
import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Gutter } from '../../_components/Gutter'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { CheckoutPage } from './CheckoutPage'

import classes from './index.module.scss'

const BC_URL = process.env.BC_URL
const BC_USERNAME = process.env.BC_USERNAME
const BC_PASSWORD = process.env.BC_PASSWORD

export default async function Checkout() {
  const me = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to checkout.',
    )}&redirect=${encodeURIComponent('/checkout')}`,
  })

  const token = me.token

  let settings: Settings | null = null
  let pickupLocations: BCLocation['value'] = []

  try {
    settings = await fetchSettings()
  } catch (error) {
    // no need to redirect to 404 here, just simply render the page with fallback data where necessary
    console.error(error) // eslint-disable-line no-console
  }

  try {
    const fetchPickupLocations = await fetch(`${BC_URL}/LocationList`, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(BC_USERNAME + ':' + BC_PASSWORD).toString('base64'),
      },
    })

    if (!fetchPickupLocations.ok) {
      console.error(fetchPickupLocations.status)
    }

    const data = await fetchPickupLocations.json()

    pickupLocations = data.value
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  return (
    <div className={classes.checkout}>
      <Gutter>
        <CheckoutPage settings={settings} token={token} pickupLocations={pickupLocations} />
      </Gutter>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Provide delivery and shipping information, pay and checkout car.',
  openGraph: mergeOpenGraph({
    title: 'Checkout',
    url: '/checkout',
  }),
}
