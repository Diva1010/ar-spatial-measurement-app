import { useEffect, useRef } from 'react'
import { useXR } from '@react-three/xr'
import { useMeasurementStore } from '../store/measurementStore'

export function SessionBridge() {
  const session = useXR((state) => state.session)
  const setSession = useMeasurementStore((state) => state.setSession)
  const hadActiveSessionRef = useRef(false)

  useEffect(() => {
    setSession(session ?? null)
    if (session) hadActiveSessionRef.current = true
  }, [session, setSession])

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === 'visible' && hadActiveSessionRef.current) {
        window.location.reload()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return null
}