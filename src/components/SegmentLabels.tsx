import { Html } from '@react-three/drei'
import { Camera, Object3D, Vector3 } from 'three'
import { useSegments } from '../hooks/useSegments'
import { formatDistance } from '../lib/measurement'
import { useMeasurementStore } from '../store/measurementStore'
import { useOverlayRoot } from '../hooks/useOverlayRoot'

const scratch = new Vector3()

function calculatePosition(el: Object3D, camera: Camera): [number, number] {
  el.getWorldPosition(scratch)
  scratch.project(camera)

  const halfWidth = window.innerWidth / 2
  const halfHeight = window.innerHeight / 2

  return [scratch.x * halfWidth + halfWidth, -scratch.y * halfHeight + halfHeight]
}

export function SegmentLabels() {
  const segments = useSegments()
  const unit = useMeasurementStore((s) => s.unit)
  const overlayRootRef = useOverlayRoot()

  return (
    <>
      {segments.map((seg, i) => (
        <Html
            key={i}
            portal={overlayRootRef as React.RefObject<HTMLElement>}
            position={[seg.midpoint.x, seg.midpoint.y, seg.midpoint.z]}
            calculatePosition={calculatePosition}
            center
            >
          <div className="segment-badge">
            {formatDistance(seg.distanceMeters, unit)}
          </div>
        </Html>
      ))}
    </>
  )
}