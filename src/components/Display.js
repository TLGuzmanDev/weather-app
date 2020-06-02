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

const Symbol = (props) => {
  switch (props.main) {
    case 'Thunderstorm':
      return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    case 'Drizzle':
    case 'Rain':
      return <FontAwesomeIcon icon={faCloudRain} />;
    case 'Snow':
      return <FontAwesomeIcon icon={faSnowflake} />;
    case 'Tornado':
      return <FontAwesomeIcon icon={faWind} />;
    case 'Clear':
      return <FontAwesomeIcon icon={faSun} />;
    case 'Clouds':
      return <FontAwesomeIcon icon={faCloud} />;
    default:
      return <FontAwesomeIcon icon={faSun} />;
  }
};

const Description = (props) => {
  if (props.description) {
    return <h1>{props.description.toUpperCase()}</h1>;
  } else {
    return <h1>{'WEATHER'}</h1>;
  }
};

const Temp = (props) => {
  if (props.temp) {
    return <h1>{`${Math.round(props.temp)}\xB0`}</h1>;
  } else {
    return <h1>{'0\xB0'}</h1>;
  }
};

const City = (props) => {
  if (props.city) {
    return <h1>{props.city.toUpperCase()}</h1>;
  } else {
    return <h1>{'LOCATION'}</h1>;
  }
};

const Display = (props) => {
  return (
    <div id="display">
      <div id="city">
        <City city={props.city} />
      </div>
      <div id="weather">
        <Description description={props.description} />
      </div>
      <div id="symbol">
        <Symbol main={props.main} />
      </div>
      <div id="temp">
        <Temp temp={props.temp} />
      </div>
      <div id="date">
        <Day />
      </div>
    </div>
  );
};

export default Display;
