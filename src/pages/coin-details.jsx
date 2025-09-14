import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import Spinner from '../components/Spinner';

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
          <p>{coin.description.en.split('. ')[0] + '.'}</p>

          <div className='coin-details-info'>
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
          </div>

          {/* --- Price Stats --- */}
          <div className='coin-details-info'>
            <h3>Price Statistics</h3>
            <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>
              24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)}{' '}
              ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{' '}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{' '}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
          </div>

          {/* --- Supply Stats --- */}
          <div className='coin-details-info'>
            <h3>Supply</h3>
            <h4>
              Circulating Supply:{' '}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{' '}
              {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
            </h4>
            <h4>
              Max Supply:{' '}
              {coin.market_data.max_supply?.toLocaleString() || 'N/A'}
            </h4>
          </div>

          {/* --- Extra Info --- */}
          <div className='coin-details-info'>
            <h3>Additional Info</h3>
            <h4>
              Genesis Date:{' '}
              {coin.genesis_date
                ? new Date(coin.genesis_date).toLocaleDateString()
                : 'Unknown'}
            </h4>
            <h4>
              Sentiment: 👍 {coin.sentiment_votes_up_percentage}% | 👎{' '}
              {coin.sentiment_votes_down_percentage}%
            </h4>
            <h4>
              GitHub Stars: ⭐{' '}
              {formatGithubStars.format(coin.developer_data.stars)}
            </h4>
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
