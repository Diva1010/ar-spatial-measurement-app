import { distance, formatDistance } from "../lib/measurement";
import { useMeasurementStore } from "../store/measurementStore";

export function useMeasuredDistance() {
    const points = useMeasurementStore((state) => state.points)
    const unit = useMeasurementStore((state) => state.unit)

    if (points.length < 2) return null

    const totalMeters = points.reduce((acc, point, i) => {
        if (i === 0) return acc
        return acc + distance(points[i - 1], point)
    }, 0)

  return formatDistance(totalMeters, unit)
}