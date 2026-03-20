import { useState } from 'react';
import './App.css';
import PairSelector from './components/PairSelector';
import PairDashboard from './components/PairDashboard';

const App = () => {
  const [selectedPairs, setSelectedPairs] = useState(['BTC-USD']);

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1 className="page-title">CoinRoutes Test</h1>

          <div className="selector-card">
            <PairSelector
              selectedPairs={selectedPairs}
              onChange={setSelectedPairs}
            />
          </div>
        </div>

        {selectedPairs.map((pair) => (
          <PairDashboard key={pair} pair={pair} />
        ))}
      </div>
    </div>
  );
};

export default App;