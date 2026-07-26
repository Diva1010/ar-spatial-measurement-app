import { useEffect, useRef } from 'react'
import { useMeasurementStore } from '../store/measurementStore'
import { useMeasuredDistance } from '../hooks/useMeasuredDistance'

export function Hud() {
  const rootRef = useRef<HTMLDivElement>(null)
  const session = useMeasurementStore((s) => s.session)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    function suppress(e: Event) { e.preventDefault() }
    root.addEventListener('beforexrselect', suppress)
    return () => root.removeEventListener('beforexrselect', suppress)
  }, [])

  const distance = useMeasuredDistance()
  const unit = useMeasurementStore((s) => s.unit)
  const mode = useMeasurementStore((s) => s.mode)
  const setUnit = useMeasurementStore((s) => s.setUnit)
  const setMode = useMeasurementStore((s) => s.setMode)
  const undo = useMeasurementStore((s) => s.undo)
  const reset = useMeasurementStore((s) => s.reset)

  return (
    <div ref={rootRef} style={{ pointerEvents: session ? 'auto' : 'none' }}>
      <div className="readout">
        <span className="readout-value">{distance ?? '—'}</span>
      </div>

      <div className="segmented" style={{ position: 'absolute', top: 16, right: 16 }}>
        {(['m', 'cm', 'ft'] as const).map((u) => (
          <button key={u} aria-pressed={unit === u} onClick={() => setUnit(u)}>
            {u}
          </button>
        ))}
      </div>

      <div className="segmented" style={{ position: 'absolute', bottom: 90, left: '50%', transform: 'translateX(-50%)' }}>
        <button aria-pressed={mode === 'point'} onClick={() => setMode('point')}>Point</button>
        <button aria-pressed={mode === 'polyline'} onClick={() => setMode('polyline')}>Path</button>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
        <button className="icon-btn" onClick={undo}>Undo</button>
        <button className="icon-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}