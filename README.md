# SpatialMeasure

An AR measuring-tape app built with the **WebXR Device API**, **React Three Fiber**, and **@react-three/xr**. Point your phone at a surface, tap to place points, and get live real-world distance readings - with two-point and multi-point polyline modes, unit conversion, temporal smoothing, and world-locked labels.


## Features

- Tap-to-place measurement points via WebXR hit-testing
- Live distance readout with unit toggle (m / cm / ft)
- Point-to-point and multi-point polyline modes, with undo/reset
- EMA smoothing + outlier rejection on tracked positions
- World-locked, centered distance labels on each measured segment
- Stress-tested on real Android hardware (Chrome + ARCore)

## Architecture

```
store/measurementStore.ts   Zustand store - points, unit, mode, session (single source of truth)
lib/measurement.ts          Pure distance/midpoint/unit-formatting functions, no framework deps
lib/smoothing.ts            EMA smoother + outlier-jump rejection, no framework deps
hooks/                      useHitTestTracking, useMeasuredDistance, useSegments, useOverlayRoot
components/
  Reticle.tsx                Hit-test tracking, smoothing, reticle mesh
  PlacementController.tsx    Tap-to-place via WebXR `select` event
  PlacedPoints / PolylinePath / SegmentLabels
  Hud.tsx                     Screen-locked controls (unit, mode, undo/reset)
  SessionBridge.tsx           Bridges XR session state into the store; handles resume recovery
```

## Notable engineering decisions

- **Smoothing tuned as a defensive measure, not a fix** - on-device testing showed stable tracking already; EMA (`alpha = 0.25`) was added anyway for lower-end devices.
- **Outlier rejection** — a hit-test position jumping >0.5m in one frame is rejected, after observing one spurious jump during stress testing.
- **Manual camera projection for labels** — `drei`'s `<Html>` trusted a stale R3F-tracked canvas size during active AR sessions, causing offset labels; fixed via a custom `calculatePosition` using real window dimensions.
- **Zustand as a cross-boundary bridge** — `@react-three/xr`'s Context can't cross from the R3F reconciler into `<XRDomOverlay>`'s portaled `react-dom` tree; `SessionBridge` mirrors session state into Zustand instead, which works across both.

## Known limitations

- **Chrome/Android:** backgrounding during an active AR session can leave touch input stuck on resume (confirmed via raw event testing) — worked around with a visibility-triggered reload.
-  Desktop browsers are not supported, even though the WebXR API is present in desktop Chrome — immersive-ar requires camera + world-tracking hardware (ARCore/ARKit) that desktop machines lack. requestSession fails with NotSupportedError at request time rather than being caught by upfront feature detection on some desktop builds.
- Hit-test range is limited to ARCore's currently-mapped plane extent.
- Screen orientation is locked during an active immersive session (platform behavior).
- No label-collision avoidance for closely-spaced segments (deliberate scope decision).

## Running locally

Requires HTTPS (or `localhost`) and an ARCore-capable Android phone running Chrome.

```bash
npm install
npm run dev -- --host
```

Tunnel to HTTPS for on-device testing (`npx localtunnel --port 5173`), and use `chrome://inspect#devices` for remote debugging.

## Tech stack

React 18 + TypeScript, Vite, `@react-three/fiber`, `@react-three/xr`, `@react-three/drei`, Zustand, Three.js.