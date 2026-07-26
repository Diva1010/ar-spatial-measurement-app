import { useMeasurementStore } from "../store/measurementStore"
import { Billboard, Circle, Ring } from '@react-three/drei'

export function PlacedPoints() {
    const points = useMeasurementStore((state) => state.points)

    return (
    <>
      {points.map((point, i) => (
        <Billboard key={i} position={point}>
          <Ring args={[0.035, 0.045, 32]}>
            <meshBasicMaterial color="#ffffff" />
          </Ring>
          <Circle args={[0.012, 16]}>
            <meshBasicMaterial color="#4de3c1" />
          </Circle>
        </Billboard>
      ))}
    </>
  )
}