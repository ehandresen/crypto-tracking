import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import Spinner from '../components/Spinner';
import CoinChart from '../components/CoinChart';

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        const result = await response.json();
        setCoin(result);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  const formatGithubStars = new Intl.NumberFormat('en', {
    notation: 'compact',
  });

  return (
    <div className='coin-details-container'>
      <Link to='/'>⬅ Back To Home</Link>

      <h1 className='coin-details-title'>
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details'}
      </h1>

      {loading && <Spinner />}
      {error && <div className='error'>❌ {error}</div>}

      {!loading && !error && (
        <>
          {/* --- Overview --- */}
          <img
            src={coin.image.large}
            alt={coin.name}
            className='coin-details-image'
          />
          <p className='coin-description'>
            {coin.description.en.split('. ')[0] + '.'}
          </p>

          <div className='coin-details-info'>
            <h2>Rank #{coin.market_cap_rank}</h2>
            <p>
              <strong>Current Price:</strong> $
              {coin.market_data.current_price.usd.toLocaleString()}
            </p>
            <p>
              <strong>Market Cap:</strong> $
              {coin.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>

          {/* --- Price Stats --- */}
          <div className='coin-details-info'>
            <h3>Price Statistics</h3>
            <p>
              <strong>24h High:</strong> $
              {coin.market_data.high_24h.usd.toLocaleString()}
            </p>
            <p>
              <strong>24h Low:</strong> $
              {coin.market_data.low_24h.usd.toLocaleString()}
            </p>
            <p>
              <strong>24h Price Change:</strong> $
              {coin.market_data.price_change_24h.toFixed(2)}(
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </p>
            <p>
              <strong>All-Time High:</strong> $
              {coin.market_data.ath.usd.toLocaleString()}
              on {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </p>
            <p>
              <strong>All-Time Low:</strong> $
              {coin.market_data.atl.usd.toLocaleString()}
              on {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </p>
          </div>

          {/* --- Supply --- */}
          <div className='coin-details-info'>
            <h3>Supply</h3>
            <p>
              <strong>Circulating:</strong>{' '}
              {coin.market_data.circulating_supply.toLocaleString()}
            </p>
            <p>
              <strong>Total:</strong>{' '}
              {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
            </p>
            <p>
              <strong>Max:</strong>{' '}
              {coin.market_data.max_supply?.toLocaleString() || 'N/A'}
            </p>
          </div>

          {/* --- Additional Info --- */}
          <div className='coin-details-info' style={{ marginBottom: '20px' }}>
            <h3>Additional Info</h3>
            <p>
              <strong>Genesis Date:</strong>{' '}
              {coin.genesis_date
                ? new Date(coin.genesis_date).toLocaleDateString()
                : 'Unknown'}
            </p>
            <p>
              <strong>Sentiment:</strong> 👍{' '}
              {coin.sentiment_votes_up_percentage}% | 👎{' '}
              {coin.sentiment_votes_down_percentage}%
            </p>
            <p>
              <strong>GitHub Stars:</strong> ⭐{' '}
              {formatGithubStars.format(coin.developer_data.stars)}
            </p>
          </div>

          {/* --- Chart --- */}
          <div className='coin-details-info' style={{ marginBottom: '20px' }}>
            <h3>Price Chart</h3>
            <CoinChart coinId={coin.id} />
          </div>

          {/* --- Tickers --- */}
          <div className='coin-details-info'>
            <h3>Top Markets</h3>
            {coin.tickers.slice(0, 5).map((t, i) => (
              <p key={i}>
                {t.market.name} – {t.base}/{t.target} @ $
                {t.last.toLocaleString()}{' '}
                <a href={t.trade_url} target='_blank' rel='noopener noreferrer'>
                  Trade →
                </a>
              </p>
            ))}
          </div>

          {/* --- Links --- */}
          <div className='coin-details-links'>
            {coin.links.homepage[0] && (
              <p>
                🌐{' '}
                <a
                  href={coin.links.homepage[0]}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Website
                </a>
              </p>
            )}
            {coin.links.whitepaper && (
              <p>
                📄{' '}
                <a
                  href={coin.links.whitepaper}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Whitepaper
                </a>
              </p>
            )}
            {coin.links.repos_url.github.length > 0 && (
              <p>
                🧑‍💻{' '}
                <a
                  href={coin.links.repos_url.github[0]}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub
                </a>
              </p>
            )}
          </div>

          <div className='coin-details-info'>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </h4>
          </div>
        </>
      )}

      {!loading && !error && !coin && <p>No Data Found!</p>}
    </div>
  );
};

export default CoinDetailsPage;
