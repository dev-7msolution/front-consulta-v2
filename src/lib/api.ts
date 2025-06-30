import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-consulta.7msolution.com.br', // Substitua pela URL da sua API
});


const apiDataStone = axios.create({
  baseURL: 'https://api.datastone.com.br/v1', // Substitua pela URL da sua API
});


export { apiDataStone, api };
