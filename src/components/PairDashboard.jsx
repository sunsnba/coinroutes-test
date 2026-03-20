import { useMemo } from 'react';
import TopOfBook from './TopOfBook';
import PriceChart from './PriceChart';
import Ladder from './Ladder';
import useCoinbaseWebSocket from '../hooks/useCoinbaseWebSocket';

const PairDashboard = ({ pair }) => {
  const orderBook = useCoinbaseWebSocket(pair);

  const midPrice = useMemo(() => {
    const bestBid = orderBook?.bids?.[0];
    const bestAsk = orderBook?.asks?.[0];

    if (!bestBid || !bestAsk) return null;

    return (bestBid.price + bestAsk.price) / 2;
  }, [orderBook]);

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ margin: '0 0 20px' }}>{pair}</h2>

      <div className="top-row">
        <div className="panel">
          <TopOfBook orderBook={orderBook} />
        </div>

        <div className="panel">
          <PriceChart midPrice={midPrice} selectedPair={pair} />
        </div>
      </div>

      <div className="panel">
        <Ladder orderBook={orderBook} />
      </div>
    </div>
  );
};

export default PairDashboard;