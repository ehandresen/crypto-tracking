import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';
import Spinner from '../components/Spinner';

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
  // Filter coin list
  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .slice()
    .sort((coin1, coin2) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return coin2.market_cap - coin1.market_cap;
        case 'market_cap_asc':
          return coin1.market_cap - coin2.market_cap;
        case 'price_desc':
          return coin2.current_price - coin1.current_price;
        case 'price_asc':
          return coin1.current_price - coin2.current_price;
        case 'change_desc':
          return (
            coin2.price_change_percentage_24h -
            coin1.price_change_percentage_24h
          );
        case 'change_asc':
          return (
            coin1.price_change_percentage_24h -
            coin2.price_change_percentage_24h
          );
        default:
          return coin2.market_cap - coin1.market_cap;
      }
    });
  return (
    <div>
      <h1>💰 ₵rypto</h1>
      {loading && <Spinner color='white' />}
      {error && <div className='error'>{error}</div>}

      {/* Filters */}
      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
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
};

export default HomePage;
