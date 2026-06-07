const mainMocks = vi.hoisted(() => ({
  render: vi.fn(),
  createRoot: vi.fn(() => ({ render: mainMocks.render })),
}))

vi.mock('react-dom/client', () => ({
  createRoot: mainMocks.createRoot,
}))

vi.mock('./App', () => ({
  default: () => <div data-testid="app-stub">App stub</div>,
}))

describe('main bootstrap', () => {
  beforeEach(() => {
    vi.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
    mainMocks.render.mockClear()
    mainMocks.createRoot.mockClear()
  })

  it('renders the app into the provided root element', async () => {
    const { renderApp } = await import('./main')
    const rootElement = document.createElement('div')

    renderApp(rootElement)

    expect(mainMocks.createRoot).toHaveBeenCalledWith(rootElement)
    expect(mainMocks.render).toHaveBeenCalledTimes(2)
  })

  it('bootstraps immediately with the document root on module import', async () => {
    await import('./main')

    expect(mainMocks.createRoot).toHaveBeenCalledWith(document.getElementById('root'))
    expect(mainMocks.render).toHaveBeenCalledTimes(1)
  })
})
