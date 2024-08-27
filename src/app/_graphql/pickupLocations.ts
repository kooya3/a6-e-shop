export const PICKUP_LOCATIONS = `
  query PickupLocations {
    PickupLocations(limit: 300) {
    docs {
      id
      title
    }
    }
  }
`
