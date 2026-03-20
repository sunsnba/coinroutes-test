import { useState } from 'react';
import { aggregateLevels } from '../utils/aggregateLevels';

const Ladder = ({ orderBook }) => {
  const [increment, setIncrement] = useState(0.01);

  if (!orderBook) {
    return <div>Waiting for ladder...</div>;
  }

  const aggregatedBids = aggregateLevels(orderBook.bids, increment, 'bids').slice(0, 15);
  const aggregatedAsks = aggregateLevels(orderBook.asks, increment, 'asks').slice(0, 15);

  return (
    <div>
      <div className="ladder-toolbar">
        <h2 className="panel-title" style={{ margin: 0 }}>
          Order Book
        </h2>

        <label>
          Aggregation:
          <select
            className="ladder-select"
            value={increment}
            onChange={(e) => setIncrement(Number(e.target.value))}
          >
            <option value={0.01}>0.01</option>
            <option value={0.05}>0.05</option>
            <option value={0.1}>0.10</option>
          </select>
        </label>
      </div>

      <div className="ladder-columns">
        <div>
          <h3 className="ladder-side-title bid">Bids</h3>

          <div className="ladder-header number">
            <div className="ladder-price">Price</div>
            <div className="ladder-size">Size</div>
          </div>

          {aggregatedBids.map((level) => (
            <div key={level.price} className="ladder-row number">
              <div className="ladder-price bid">{level.price.toFixed(2)}</div>
              <div className="ladder-size">{level.size.toFixed(4)}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="ladder-side-title ask">Asks</h3>

          <div className="ladder-header number">
            <div className="ladder-price">Price</div>
            <div className="ladder-size">Size</div>
          </div>

          {aggregatedAsks.map((level) => (
            <div key={level.price} className="ladder-row number">
              <div className="ladder-price ask">{level.price.toFixed(2)}</div>
              <div className="ladder-size">{level.size.toFixed(4)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ladder;