import { Line } from '@react-three/drei'
import { useMeasurementStore } from '../store/measurementStore'

export function PolylinePath()
{
    const points = useMeasurementStore((state) => state.points);

    if(points.length < 2) return null;

    return <Line points={points} color={"#4de3c1"} lineWidth={3} />

}