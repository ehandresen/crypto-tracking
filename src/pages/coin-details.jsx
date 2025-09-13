import { useParams } from 'react-router';

const CoinDetailsPage = () => {
  const { id } = useParams();

  return <div>Coin details page {id}</div>;
};

export default CoinDetailsPage;
