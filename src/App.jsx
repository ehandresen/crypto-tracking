import { useEffect, useState } from 'react';

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);

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
    fetchData();
  }, []);

  return (
    <div>
      <h1>💰 ₵rypto</h1>
    </div>
  );
}
export default App;
