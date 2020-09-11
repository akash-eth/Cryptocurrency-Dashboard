import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const {data} = props.result;
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>CryptoInfo Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>CryptoInfo Dashboard</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24H Change</th>
            <th>Price</th>
            <th>Market Cap</th>
          </tr>          
        </thead>
        <tbody>
          {data.map(coin => (
            <tr key={coin.id}>
              <td>
                <img 
                  src={coin.image}
                  style={{width:25, height:25, marginRight: 10}}
                /> 
                {coin.symbol.toUpperCase()} </td>
              <td> {coin.price_change_percentage_24h} </td>
              <td> {coin.current_price} </td>
              <td> {coin.market_cap} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getServerSideProps(context) {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const result = await coinGeckoClient.coins.markets({params});
  return {
    props: {
      result
    }
  };
}