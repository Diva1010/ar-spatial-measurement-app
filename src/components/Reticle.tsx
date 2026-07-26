import { Matrix4, Mesh, Vector3 } from 'three'
import { useXRHitTest } from '@react-three/xr'
import { useHitTestTracking } from '../hooks/useHitTestTracking'
import { useRef } from 'react'
import { isPlausibleJump, PositionSmoother } from '../lib/smoothing'

const matrixHelper = new Matrix4()
const scratchPosition = new Vector3()
const smoother = new PositionSmoother(0.25)

function Reticle() {
  const meshRef = useRef<Mesh>(null)
  const tracking = useHitTestTracking()

  useXRHitTest(
    (results, getWorldMatrix) => {
      const mesh = meshRef.current
      if (!mesh) return

      if (results.length === 0) {
        smoother.reset();
        mesh.visible = false
        tracking.hasHit = false
        return
      }

      getWorldMatrix(matrixHelper, results[0])
      scratchPosition.setFromMatrixPosition(matrixHelper)

      if (!isPlausibleJump(smoother.getCurrent(), scratchPosition, 0.5)) {
        return 
      }

      const smoothed = smoother.update(scratchPosition)

      mesh.visible = true
      mesh.position.copy(smoothed)

      tracking.hasHit = true
      tracking.position.copy(smoothed)    
},
'viewer',
'plane')

  return ( 
     <mesh ref={meshRef} visible={false} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[0.045, 0.06, 32]} />
      <meshBasicMaterial color="#4de3c1" />
    </mesh>
   )
}

export default Reticle;



