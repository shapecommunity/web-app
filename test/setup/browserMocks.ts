import { vi } from 'vitest'

type MatchMediaListener = (event: MediaQueryListEvent) => void

type MockMediaQueryList = MediaQueryList & {
  _listeners: Set<MatchMediaListener>
}

type MockAnimation = Pick<Animation, 'cancel' | 'finished'>

const mediaQueries = new Map<string, MockMediaQueryList>()
const intersectionObservers = new Set<MockIntersectionObserver>()
const animationFrameCallbacks = new Map<number, FrameRequestCallback>()

let animationFrameId = 0

function createMediaQueryList(query: string): MockMediaQueryList {
  const listeners = new Set<MatchMediaListener>()

  return {
    matches: false,
    media: query,
    onchange: null,
    addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
      listeners.add(listener as MatchMediaListener)
    },
    removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
      listeners.delete(listener as MatchMediaListener)
    },
    addListener: (listener: MatchMediaListener) => {
      listeners.add(listener)
    },
    removeListener: (listener: MatchMediaListener) => {
      listeners.delete(listener)
    },
    dispatchEvent: () => true,
    _listeners: listeners,
  }
}

export class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin: string
  readonly scrollMargin = ''
  readonly thresholds: ReadonlyArray<number>
  private readonly callback: IntersectionObserverCallback
  private readonly observed = new Set<Element>()

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback
    this.rootMargin = options.rootMargin ?? ''
    this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold ?? 0]
    intersectionObservers.add(this)
  }

  disconnect() {
    this.observed.clear()
    intersectionObservers.delete(this)
  }

  observe(target: Element) {
    this.observed.add(target)
  }

  takeRecords() {
    return []
  }

  unobserve(target: Element) {
    this.observed.delete(target)
  }

  trigger(target: Element, isIntersecting: boolean) {
    if (!this.observed.has(target)) {
      return
    }

    this.callback(
      [
        {
          target,
          isIntersecting,
          intersectionRatio: isIntersecting ? 1 : 0,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        },
      ],
      this,
    )
  }
}

export function installBrowserMocks() {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => {
      const existing = mediaQueries.get(query)

      if (existing) {
        return existing
      }

      const next = createMediaQueryList(query)
      mediaQueries.set(query, next)
      return next
    },
  })

  Object.defineProperty(window, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: MockIntersectionObserver,
  })

  Object.defineProperty(window, 'requestAnimationFrame', {
    configurable: true,
    writable: true,
    value: vi.fn((callback: FrameRequestCallback) => {
      animationFrameId += 1
      animationFrameCallbacks.set(animationFrameId, callback)
      return animationFrameId
    }),
  })

  Object.defineProperty(window, 'cancelAnimationFrame', {
    configurable: true,
    writable: true,
    value: vi.fn((callbackId: number) => {
      animationFrameCallbacks.delete(callbackId)
    }),
  })

  Object.defineProperty(Element.prototype, 'animate', {
    configurable: true,
    writable: true,
    value: vi.fn((): MockAnimation => ({
      cancel: vi.fn(),
      finished: Promise.resolve({} as Animation),
    })),
  })

  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  })
}

export function setMediaQueryMatches(query: string, matches: boolean) {
  const mediaQueryList = window.matchMedia(query) as MockMediaQueryList

  ;(mediaQueryList as { matches: boolean }).matches = matches

  const event = { matches, media: query } as MediaQueryListEvent

  mediaQueryList._listeners.forEach((listener) => {
    listener(event)
  })

  mediaQueryList.onchange?.(event)
}

export function flushAnimationFrame(timestamp = 16) {
  const entries = [...animationFrameCallbacks.entries()]
  animationFrameCallbacks.clear()

  entries.forEach(([, callback]) => {
    callback(timestamp)
  })
}

export function triggerIntersection(target: Element, isIntersecting = true) {
  intersectionObservers.forEach((observer) => {
    observer.trigger(target, isIntersecting)
  })
}

export function resetBrowserMocks() {
  mediaQueries.clear()
  intersectionObservers.clear()
  animationFrameCallbacks.clear()
  animationFrameId = 0
}
