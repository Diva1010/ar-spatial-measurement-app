export interface Point3 {
  x: number
  y: number
  z: number
}

export type Unit = 'm' | 'cm' | 'ft'

const UNIT_FACTORS: Record<Unit, number> = {
  m: 1,
  cm: 100,
  ft: 3.28084
}

export function distance(a: Point3, b: Point3): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

export function midpoint(a: Point3, b: Point3): Point3 {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z: (a.z + b.z) / 2,
  }  
}

export function formatDistance(meters: number, unit: Unit): string {
  const value = meters * UNIT_FACTORS[unit]
  const decimals = unit === 'cm' ? 0 : 2
  return `${value.toFixed(decimals)} ${unit}`
}
