import { Vector3 } from 'three'

export function isPlausibleJump(
  previous: Vector3 | null,
  candidate: Vector3,
  maxJumpMeters: number
): boolean {
  if (!previous) return true 
  return previous.distanceTo(candidate) <= maxJumpMeters
}

export class PositionSmoother {
  private alpha: number
  private value: Vector3 | null = null

  constructor(alpha: number) {
    this.alpha = alpha
  }

  update(raw: Vector3): Vector3 {
    if (this.value != null) {
      this.value.lerp(raw, this.alpha)
    } else {
      this.value = raw.clone()
    }

    return this.value
  }

  reset(): void {
    this.value = null
  }

  getCurrent(): Vector3 | null {
  return this.value
}
}