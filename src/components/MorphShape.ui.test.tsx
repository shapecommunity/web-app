import { render } from '@testing-library/react'
import { MorphShape } from './MorphShape'

describe('MorphShape', () => {
  it('renders the requested path with the expected accent classes', () => {
    const { container } = render(<MorphShape path="M10 10H90V90H10Z" accent="green" className="custom-shape" />)

    const shape = container.querySelector('svg')
    const path = container.querySelector('path')

    expect(shape).toHaveClass('morph-shape', 'accent-green', 'custom-shape')
    expect(path).toHaveAttribute('d', 'M10 10H90V90H10Z')
  })

  it('matches the stable SVG markup snapshot', () => {
    const { container } = render(<MorphShape path="M10 10H90V90H10Z" accent="blue" />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      <svg
        aria-hidden="true"
        class="morph-shape accent-blue"
        viewBox="0 0 100 100"
      >
        <defs>
          <lineargradient
            gradientUnits="userSpaceOnUse"
            id="_r_1_"
            x1="16"
            x2="84"
            y1="12"
            y2="88"
          >
            <stop
              class="morph-gradient-stop"
              offset="0%"
              style="stop-color: rgb(22, 119, 255);"
            />
            <stop
              class="morph-gradient-stop"
              offset="100%"
              style="stop-color: rgb(22, 119, 255);"
            />
          </lineargradient>
        </defs>
        <path
          d="M10 10H90V90H10Z"
          fill="url(#_r_1_)"
        />
      </svg>
    `)
  })
})
