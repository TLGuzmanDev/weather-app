import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faWind,
  faCloud,
  faCloudShowersHeavy,
  faCloudRain,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';

const Day = () => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date();
  const day = date.getDay();
  return <h1>{days[day].toUpperCase()}</h1>;
};

const Symbol = ({ main }) => {
  let symbol = '';
  switch (main) {
    case 'Thunderstorm':
      symbol = faCloudShowersHeavy;
      break;
    case 'Drizzle':
    case 'Rain':
      symbol = faCloudRain;
      break;
    case 'Snow':
      symbol = faSnowflake;
      break;
    case 'Tornado':
      symbol = faWind;
      break;
    case 'Clear':
      symbol = faSun;
      break;
    case 'Clouds':
      symbol = faCloud;
      break;
    default:
      symbol = faSun;
      break;
  }

  return (
    <div id="symbol">
      <FontAwesomeIcon icon={symbol} />
    </div>
  );
};

const Description = ({ description }) => {
  return (
    <div id="weather">
      <h1>{description.toUpperCase()}</h1>
    </div>
  );
};

const Temp = ({ temp }) => {
  return (
    <div id="temp">
      <h1>{`${Math.round(temp)}\xB0`}</h1>
    </div>
  );
};

const City = ({ city }) => {
  return (
    <div id="city">
      <h1>{city.toUpperCase()}</h1>
    </div>
  );
};

const Display = ({ city, description, main, temp }) => {
  if (city) {
    return (
      <div id="display">
        <City city={city} />
        <Description description={description} />
        <Symbol main={main} />
        <Temp temp={temp} />
        <Day />
      </div>
    );
  } else {
    return (
      <div id="display">
        <City city={'location'} />
        <Description description={'weather'} />
        <Symbol main={'Clear'} />
        <Temp temp={0} />
        <Day />
      </div>
    );
  }
};

export default Display;
