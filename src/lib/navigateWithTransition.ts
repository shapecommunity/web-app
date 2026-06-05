type NavigateFn = (to: string) => void

type TransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

export function navigateWithTransition(navigate: NavigateFn, to: string) {
  const transitionDocument = document as TransitionDocument

  if (typeof transitionDocument.startViewTransition === 'function') {
    transitionDocument.startViewTransition(() => {
      navigate(to)
    })
    return
  }

  navigate(to)
}
