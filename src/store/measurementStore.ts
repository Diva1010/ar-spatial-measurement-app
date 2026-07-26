import type { Vector3 } from "three";
import { create } from "zustand";
import { type Unit } from "../lib/measurement";

type Mode = 'point' | 'polyline'

interface MeasurementState {
    points: Vector3[];
    unit: Unit;
    mode: Mode;
    session: XRSession | null;
    addPoint: (point: Vector3) => void;
    undo: () => void;
    reset: () => void;
    setUnit: (unit: Unit) => void;
    setMode: (mode: Mode) => void
    setSession: (session: XRSession | null) => void
}

export const useMeasurementStore = create<MeasurementState>((set, get) => ({
    points: [], 
    unit: 'm',
    mode: 'point',
    session: null,
    addPoint: (point: Vector3) => {
    const { mode, points } = get()
    if (mode === 'point' && points.length >= 2) return // already have A and B, ignore further taps
    set((state) => ({ points: [...state.points, point.clone()] }))
    },
    undo: () => set((state) => ({ points: state.points.slice(0, -1) })),
    reset: () => set({ points: [] }),
    setUnit: (unit: Unit) => set({ unit }),
    setMode: (mode: Mode) => set({mode, points: [] }),
    setSession: (session) => set({ session }),
}));
