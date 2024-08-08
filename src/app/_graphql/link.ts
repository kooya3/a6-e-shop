interface Args {
  disableLabel?: true
  disableAppearance?: true
}

export const LINK_FIELDS = ({ disableAppearance, disableLabel }: Args = {}): string => `{
  ${!disableLabel ? 'label' : ''}
  ${!disableAppearance ? 'appearance' : ''}
  type
  newTab
  url
  icon {
    url
    width
    height
  }
  reference {
    relationTo
    value {
      ...on Page {
        slug
      }
    }
  }
}`
