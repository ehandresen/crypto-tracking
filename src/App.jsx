import { useEffect, useState } from 'react';
import LimitSelector from './components/LimitSelector';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );

        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        console.log(data);
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, [limit]);

  return (
    <div>
      <h1>💰 ₵rypto</h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error}</div>}

      <LimitSelector limit={limit} onLimitChange={setLimit} />

      <main className='grid'>
        {coins.map((coin) => (
          <div className='coin-card' key={coin.id}>
            <div className='coin-header'>
              <img src={coin.image} alt={coin.name} className='coin-image' />
              <h2>{coin.name}</h2>
              <p className='symbol'>{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
export default App;
