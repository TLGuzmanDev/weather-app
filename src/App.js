import React, { useState } from 'react';
import './App.css';
import fetchWeatherData from './services/weather-api';
import Input from './components/Input';
import Error from './components/Error';
import Display from './components/Display';

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState('');

  const fetchData = async (name) => {
    const data = await fetchWeatherData(name);
    if (data.cod === 200) {
      const {
        name,
        main: { feels_like, temp },
        weather: {
          0: { description, main },
        },
      } = data;
      setWeatherData({
        city: name,
        temp: temp,
        feels_like,
        main,
        description,
      });
    } else {
      console.log(`Error: ${data.cod} ${data.message}`);
      setError(data.message);
    }
  };

  const handleSubmit = (event) => {
    const input = event.target.locationInput.value;
    if (input) {
      fetchData(input);
      event.target.reset();
    }
    event.preventDefault();
  };

  return (
    <div id="app">
      <Input onSubmit={handleSubmit} />
      <Error message={error} />
      <Display
        city={weatherData.city}
        temp={weatherData.temp}
        description={weatherData.description}
        main={weatherData.main}
      />
    </div>
  );
};

export default App;
