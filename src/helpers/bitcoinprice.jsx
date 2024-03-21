import axios from 'axios';

const btcPrice = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

const bitcoin = async () => {
    try {
        const response = await btcPrice.get('/json/last/BTC-USD');

        const price = response.data.BTCUSD.bid;
        const date = response.data.BTCUSD.create_date;
        const name = 'Bitcoin';

        const btc = { price, date, name };

        return btc;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const eth = async () => {
    try {
        const response = await btcPrice.get('/json/last/ETH-USD');

        const price = response.data.ETHUSD.bid;
        const name = 'Ethereum';

        const eth = { price, name };

        return eth;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



const xrp = async () => {
    try {
        const response = await btcPrice.get('/json/last/XRP-USD');

        const price = response.data.XRPUSD.bid;
        const name = 'XRP';

        const xrp = { price, name };

        return xrp;
    } catch (error) {
        console.error(error);
        throw error;
    }
};





export { bitcoin, eth, xrp, };
