import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import Header from './components/Header';

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
          `${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`
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

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </>
  );
}
export default App;
