import { useEffect, useState } from 'react';
import CoinCard from './components/CoinCard';
import LimitSelector from './components/LimitSelector';
import FilterInput from './components/FilterInput';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );

        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();

        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, [limit]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>💰 ₵rypto</h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error}</div>}

      {/* Filters */}
      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      {/* Coin Cards */}
      <main className='grid'>
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
        ) : (
          <p>No matching coins</p>
        )}
      </main>
    </div>
  );
}
export default App;
