const PAIRS = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD'];

const PairSelector = ({ selectedPairs, onChange }) => {
  const handleToggle = (pair) => {
    if (selectedPairs.includes(pair)) {
      const nextPairs = selectedPairs.filter((selectedPair) => selectedPair !== pair);
      onChange(nextPairs);
      return;
    }

    onChange([...selectedPairs, pair]);
  };

  return (
    <div>
      <div style={{ marginBottom: '8px', fontWeight: 600 }}>Select Pairs:</div>

      <div style={{ display: 'grid', gap: '6px' }}>
        {PAIRS.map((pair) => (
          <label
            key={pair}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <input
              type="checkbox"
              checked={selectedPairs.includes(pair)}
              onChange={() => handleToggle(pair)}
            />
            <span>{pair}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PairSelector;