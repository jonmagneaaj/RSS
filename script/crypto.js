const axios = require('axios');

async function getData() {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD', {
      headers: {
        'X-CMC_PRO_API_KEY': 'c56eba61-154f-4c83-89af-47d98a9e80e5',
      },
    });
    const json = response.data;
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

getData();