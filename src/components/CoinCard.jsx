import { Link } from 'react-router';

function CoinCard({ coin }) {
  function formatNumber(value) {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`; // Values over 1 trillion
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`; // Values over 1 billion
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`; // Values over 1 million
    return `$${value.toLocaleString()}`;
  }

  return (
    <Link to={`coin/${coin.id}`}>
      <div className='coin-card' key={coin.id}>
        <div className='coin-header'>
          <img src={coin.image} alt={coin.name} className='coin-image' />
          <div>
            <h2>{coin.name}</h2>
            <p className='symbol'>{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
        <p>Price: {formatNumber(coin.current_price)}</p>
        <p
          className={
            coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
          }
        >
          {coin.price_change_percentage_24h.toFixed(2)} %
        </p>
        <p>Market Cap: {formatNumber(coin.market_cap)}</p>
      </div>
    </Link>
  );
}
export default CoinCard;
