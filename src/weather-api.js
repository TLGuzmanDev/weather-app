const fetch = require('node-fetch');

const KEY = '9d63c580b2ac7fea2e19bfbfb998ae25';

async function fetchWeatherData(name) {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=imperial&appid=${KEY}`;
  try {
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return null;
  }
}

export default fetchWeatherData;
