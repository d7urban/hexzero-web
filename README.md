# HexZero Web

Play [Hex](https://en.wikipedia.org/wiki/Hex_(board_game)) against a neural-net-backed MCTS AI in the browser.

**[Play now](https://hexzero-web.vercel.app/)**

## Features

- **Neural network evaluator** — trained HexNet model runs client-side via ONNX Runtime Web
- **MCTS search** — Monte Carlo Tree Search with PUCT selection, running in a Web Worker
- **Variable board sizes** — 5, 7, 9, 11, 13
- **Pie rule** — optional swap move after the first placement
- **All player modes** — Human vs AI, Human vs Human, AI vs AI
- **Board transforms** — mirror and 90° rotation toggles
- **First player color** — choose Blue or Red to move first
- **Undo** — Ctrl+Z, with smart double-undo in Human vs AI
- **Adjustable AI strength** — logarithmic sims slider (10–100,000)
- **Audio** — chimes on swap and win
- **Responsive** — works on mobile

## Architecture

```
Main Thread                        Web Worker
┌────────────────────┐            ┌───────────────────┐
│  TypeScript UI      │            │  hex-wasm (WASM)  │
│  - Canvas renderer  │◄──msg────►│  - HexState       │
│  - Click handling   │            │  - MCTS search    │
│  - ONNX inference   │            │  - Feature extract │
│  - Settings panel   │            └───────────────────┘
└────────────────────┘
```

Game logic and MCTS run in a Web Worker (Rust compiled to WASM). When using the neural net, the worker sends feature tensors to the main thread for ONNX inference, then receives policy/value results back.

## Development

```bash
npm install
npm run dev
```

The WASM module is pre-built in `wasm/`. To rebuild it from the [HexZero](https://github.com/d7urban/HexZero) source:

```bash
npm run wasm   # requires wasm-pack
```

## Build

```bash
npm run build
npm run preview   # test locally
```

Output goes to `dist/`. Deploy as static files.

## Tech Stack

- **Vite** — bundler and dev server
- **TypeScript** — UI, board renderer, game flow
- **Rust → WASM** — game engine and MCTS (via wasm-bindgen)
- **ONNX Runtime Web** — browser-side neural net inference
- **Canvas 2D** — hex board rendering
- **Web Audio API** — sound effects
