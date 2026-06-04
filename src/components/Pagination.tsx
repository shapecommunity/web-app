import { useState } from 'react'
import { MorphShape } from './MorphShape'
import { useShapeMorph } from '../hooks/useShapeMorph'
import { getRandomAccent, textMorphShapes, type AccentName } from '../lib/shapePaths'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type PaginationButtonProps = {
  label: string
  accent: AccentName
  isActive?: boolean
  isDisabled?: boolean
  onClick: () => void
}

function PaginationButton({ label, accent, isActive = false, isDisabled = false, onClick }: PaginationButtonProps) {
  const [currentAccent, setCurrentAccent] = useState<AccentName>(accent)
  const { path, animateRandom, animateToDefault } = useShapeMorph({
    shapePool: textMorphShapes,
    durationMs: 180,
  })

  function handleEnter() {
    if (isDisabled) return
    setCurrentAccent(getRandomAccent([currentAccent]))
    animateRandom()
  }

  function handleLeave() {
    setCurrentAccent(accent)
    animateToDefault()
  }

  return (
    <button
      type="button"
      className={`shape-button shape-button-pagination accent-${accent}${isActive ? ' is-active' : ''}`}
      onClick={onClick}
      onPointerEnter={handleEnter}
      onPointerDown={handleEnter}
      onPointerLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      disabled={isDisabled}
      aria-current={isActive ? 'page' : undefined}
    >
      <MorphShape path={path} accent={currentAccent} className="shape-button-surface" />
      <span className="shape-button-label">{label}</span>
    </button>
  )
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="pagination" aria-label="Discover pagination">
      <PaginationButton
        label="Prev"
        accent="blue"
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      <div className="pagination-pages">
        {pages.map((page) => (
          <PaginationButton
            key={page}
            label={`${page}`}
            accent={page === currentPage ? 'orange' : 'purple'}
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
          />
        ))}
      </div>
      <PaginationButton
        label="Next"
        accent="green"
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  )
}
