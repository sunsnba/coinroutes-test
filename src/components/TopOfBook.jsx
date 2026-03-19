const formatPrice = (value) => {
  if (value === undefined || value === null) return 'N/A';
  return Number(value).toFixed(2);
};

const formatSize = (value) => {
  if (value === undefined || value === null) return 'N/A';

  return Number(value)
    .toFixed(8)
    .replace(/0+$/, '')
    .replace(/\.$/, '');
};

const TopOfBook = ({ orderBook }) => {
  if (!orderBook) {
    return <div>Waiting for order book...</div>;
  }

  const bestBid = orderBook.bids[0];
  const bestAsk = orderBook.asks[0];
  const spread =
    bestBid && bestAsk ? (bestAsk.price - bestBid.price).toFixed(2) : 'N/A';

  return (
    <div>
      <h2 className="panel-title">Top of Book</h2>

      <div className="top-book-grid">
        <div>
          <div className="metric-label">Best Bid</div>
          <div className="top-book-value bid number">
            <span className="top-book-price">{formatPrice(bestBid?.price)}</span>
            <span className="top-book-separator">|</span>
            <span className="top-book-size">{formatSize(bestBid?.size)}</span>
          </div>
        </div>

        <div>
          <div className="metric-label">Best Ask</div>
          <div className="top-book-value ask number">
            <span className="top-book-price">{formatPrice(bestAsk?.price)}</span>
            <span className="top-book-separator">|</span>
            <span className="top-book-size">{formatSize(bestAsk?.size)}</span>
          </div>
        </div>

        <div>
          <div className="metric-label">Spread</div>
          <div className="top-book-spread number">{spread}</div>
        </div>
      </div>
    </div>
  );
};

export default TopOfBook;