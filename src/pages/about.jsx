const AboutPage = () => {
  return (
    <div className='about'>
      <h1>About Crypto Tracker</h1>
      <p>
        Crypto Tracker is a React application that displays live cryptocurrency data using the CoinGecko API.
      </p>
      <p>
        You can search for coins by name or symbol, control how many results are shown, and sort the list by market cap or price. Each card highlights the current price, 24-hour change, and total market cap in a clean, responsive layout.
      </p>
      <p>
        I built this project to practise working with external APIs, reusable components, and state management in React, while focusing on a simple but polished UI.
      </p>
    </div>
  );
};

export default AboutPage;
