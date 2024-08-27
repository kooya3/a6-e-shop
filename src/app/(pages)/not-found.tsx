import { Button } from '../_components/Button'
import { Gutter } from '../_components/Gutter'
import { VerticalPadding } from '../_components/VerticalPadding'

export default function NotFound() {
  return (
    <Gutter>
      <VerticalPadding
        top="none"
        bottom="large"
        className="flex flex-col items-center justify-center gap-4 pt-[var(--block-padding)]"
      >
        <h1>404</h1>
        <p>The page you are looking for couldn't not be found.</p>
        <Button href="/" label="Go Home" appearance="primary" />
      </VerticalPadding>
    </Gutter>
  )
}
