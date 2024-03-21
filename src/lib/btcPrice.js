import axios from 'axios';

export default axios.create({
    baseURL: 'https://economia.awesomeapi.com.br',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})

