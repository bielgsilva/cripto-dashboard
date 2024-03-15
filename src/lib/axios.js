import axios from 'axios';

export default axios.create({
    baseURL: 'https://preco-bitcoin-api.onrender.com',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})