import { Vector3 } from "three";
import  { useRef } from "react";

export interface HitTracking {
  position: Vector3
  hasHit: boolean
}

const tracking: HitTracking = {
    position: new Vector3(),
    hasHit: false
}

export function useHitTestTracking() {
    const ref = useRef(tracking);
    return ref.current;
}