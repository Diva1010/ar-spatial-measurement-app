import { type RefObject } from 'react'

const overlayRootRef: RefObject<HTMLDivElement | null> = { current: null }

export function useOverlayRoot() {
  return overlayRootRef
}