import { distance, midpoint, type Point3 } from '../lib/measurement'
import { useMeasurementStore } from '../store/measurementStore'

export interface Segment {
  midpoint: Point3
  distanceMeters: number
}

export function useSegments(): Segment[] {
  const points = useMeasurementStore((state) => state.points)

  const segments: Segment[] = []
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    segments.push({
      midpoint: midpoint(a, b),
      distanceMeters: distance(a, b),
    })
  }

  return segments
}