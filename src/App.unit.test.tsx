import { render, screen } from '@testing-library/react'
import { AccentHeading } from './App'

describe('AccentHeading', () => {
  it('renders an h2 when level is 2', () => {
    render(<AccentHeading accent="blue" level={2}>Secondary</AccentHeading>)

    expect(screen.getByRole('heading', { name: 'Secondary', level: 2 })).toHaveClass('accent-heading', 'accent-heading-blue')
  })

  it('renders an h3 when level is 3', () => {
    render(<AccentHeading accent="red" level={3}>Tertiary</AccentHeading>)

    expect(screen.getByRole('heading', { name: 'Tertiary', level: 3 })).toHaveClass('accent-heading', 'accent-heading-red')
  })
})
