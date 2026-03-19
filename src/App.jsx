import { useMemo, useState } from 'react';
import './App.css';
import PairSelector from './components/PairSelector';
import TopOfBook from './components/TopOfBook';
import PriceChart from './components/PriceChart';
import Ladder from './components/Ladder';
import useCoinbaseWebSocket from './hooks/useCoinbaseWebSocket';

const App = () => {
  const [selectedPair, setSelectedPair] = useState('BTC-USD');
  const orderBook = useCoinbaseWebSocket(selectedPair);

  const midPrice = useMemo(() => {
    const bestBid = orderBook?.bids?.[0];
    const bestAsk = orderBook?.asks?.[0];

    if (!bestBid || !bestAsk) return null;

    return (bestBid.price + bestAsk.price) / 2;
  }, [orderBook]);

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1 className="page-title">CoinRoutes Test</h1>

          <div className="selector-card">
            <PairSelector
              selectedPair={selectedPair}
              onChange={setSelectedPair}
            />
          </div>
        </div>

        <div className="top-row">
          <div className="panel">
            <TopOfBook orderBook={orderBook} />
          </div>

          <div className="panel">
            <PriceChart midPrice={midPrice} selectedPair={selectedPair} />
          </div>
        </div>

        <div className="panel">
          <Ladder orderBook={orderBook} />
        </div>
      </div>
    </div>
  );
};

export default App;