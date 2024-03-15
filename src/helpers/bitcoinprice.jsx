import btcPrice from '../lib/btcPrice';

const bitcoinprice = async () => {
    try {
        const response = await btcPrice.get('/json/last/BTC-USD');

        console.log(response);
        const price = response.data.BTCUSD.bid;
        const date = response.data.BTCUSD.create_date
        const name = response.data.BTCUSD.name

        const btc = { price, date, name };

        return btc

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default bitcoinprice; 
