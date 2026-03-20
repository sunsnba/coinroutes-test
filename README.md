# CoinRoutes Trading Dashboard

This is a real-time trading dashboard I built using React and Coinbase’s WebSocket feed. It displays order book data, top-of-book pricing, and a live price chart for multiple crypto pairs.

The goal was to build something simple, fast and readable that reflects how a real trading UI behaves with live market data.

---

## Features

- Real-time order book (Coinbase WebSocket - Level 2)
- Multi-pair support (BTC-USD, ETH-USD, LTC-USD, BCH-USD)
- Top of Book: best bid, best ask, spread
- Live price chart
- Order book ladder

---

## Tech Stack

- React (Vite)
- Recharts (charting)
- Coinbase WebSocket API (public market data)

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open:

http://localhost:5173

---

## Architecture

- App manages selected currency pairs
- Each pair renders its own `PairDashboard`
- `PairDashboard` owns:
  - WebSocket connection
  - order book state
  - mid-price calculation
- UI is split into small components:
  - TopOfBook
  - PriceChart
  - Ladder

## Data Flow

- A WebSocket connection is established per selected pair
- Data is received from Coinbase’s level2_batch channel
- Order book state is initialized via snapshot
- Order book is updated incrementally via l2update messages
- Mid-price is derived from best bid/ask and fed into the chart

## Tradeoffs

- One WebSocket connection per pair
- Simpler implementation
- Chart uses mid-price instead of trade history
- Lightweight and efficient, less precise than full trade data
- Supported pairs are predefined
- Could be extended dynamically

## Potential Improvements

- Consolidate multiple pairs into a single WebSocket connection
- Add historical price data for richer charts
- Persist selected pairs across sessions via localStorage