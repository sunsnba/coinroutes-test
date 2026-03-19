const PAIRS = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD'];

const PairSelector = ({ selectedPair, onChange }) => {
  return (
    <div>
      <label>Select Pair: </label>
      <select value={selectedPair} onChange={(e) => onChange(e.target.value)}>
        {PAIRS.map((pair) => (
          <option key={pair} value={pair}>
            {pair}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PairSelector;