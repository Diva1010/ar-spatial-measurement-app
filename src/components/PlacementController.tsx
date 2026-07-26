import { useXR } from "@react-three/xr"
import { useHitTestTracking } from "../hooks/useHitTestTracking"
import { useMeasurementStore } from "../store/measurementStore"
import { useEffect } from "react"

export function PlacementController() {

    const session = useXR((state) => state.session)
    const tracking = useHitTestTracking()
    const addPoint = useMeasurementStore((state) => state.addPoint)
    const reset = useMeasurementStore((state) => state.reset)
    
    useEffect(() => {
        if (!session) return

        function handleSelect() {
        if (!tracking.hasHit) return 
        addPoint(tracking.position)
        }

        session.addEventListener('select', handleSelect)
        return () => {
            session.removeEventListener('select', handleSelect)
            reset()
        }
    }, [session, tracking, addPoint, reset])

    return null;
}
