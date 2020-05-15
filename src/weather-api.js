import config from './config';
const fetch = require('node-fetch');
const KEY = config.API_KEY;

export default async function fetchWeatherData(name) {
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
