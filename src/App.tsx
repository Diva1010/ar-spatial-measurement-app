import { XR, XRDomOverlay, createXRStore } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import Reticle from './components/Reticle'
import { PlacementController } from './components/PlacementController'
import {PlacedPoints} from './components/PlacedPoints'

import './App.css'
import { PolylinePath } from './components/PolylinePath'
import { Hud } from './components/Hud'
import { SegmentLabels } from './components/SegmentLabels'
import { useOverlayRoot } from './hooks/useOverlayRoot'
import { SessionBridge } from './components/SessionBridge'
import { useMeasurementStore } from './store/measurementStore'

const store = createXRStore({ hitTest: true })


function App() {
  const overlayRootRef = useOverlayRoot()
  const session = useMeasurementStore((s) => s.session)

  return (
    <>
      {!session && (
        <div className="landing">
          <div className="landing-card">
            <h1>Measurement App</h1>
            <div className="landing-copy">
            <p>
              This app turns your phone into a virtual measuring tape. Point your
              camera at anything (a table, a wall, a room)and measure real-world
              distances just by tapping the screen.
            </p>
            <ol className="landing-steps">
              <li>Tap <strong>Enter AR</strong> and allow camera access.</li>
              <li>Slowly move your phone until a teal ring appears on a surface.</li>
              <li>Tap the screen to drop a point & do this for two spots you want to measure between.</li>
              <li>The distance appears on screen instantly, in meters, centimeters, or feet.</li>
              <li>Want to measure a longer path? Switch to <strong>Path</strong> mode and keep tapping to add more points.</li>
            </ol>
          </div>
            <button className="enter-ar-btn" onClick={() => { store.enterAR() }}>
              Enter AR
            </button>
          </div>
        </div>
      )}
      <Canvas>
        <XR store={store}>
          <Reticle />
          <PlacementController />
          <PlacedPoints />
          <PolylinePath />
          <SegmentLabels />
          <SessionBridge />
          <XRDomOverlay style={{ pointerEvents: 'none' }}>
            <div ref={overlayRootRef} 
            style={{
              position: 'absolute',
              inset: 0,
            }}>
              <Hud />
            </div>
          </XRDomOverlay>
        </XR>
      </Canvas>
    </>
  )
}

export default App
