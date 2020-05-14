import React from 'react';
import './App.css';
import fetchWeatherData from './weather-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Error = (props) => {
  if (props.message) {
    return (
      <div id="error">
        <p>{`ERROR: ${props.message.toUpperCase()}`}</p>
      </div>
    );
  } else {
    return <div id="error"></div>;
  }
};

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

const Input = (props) => {
  return (
    <form id="form" action="#" onSubmit={props.onSubmit}>
      <input
        type="text"
        id="location-input"
        name="location-input"
        placeholder="LOCATION..."
      ></input>
      <button type="submit">
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </button>
    </form>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      temp: null,
      feels_like: null,
      main: null,
      description: null,
      error: null,
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchData(name) {
    const data = await fetchWeatherData(name);
    if (data.cod === 200) {
      const {
        name,
        main: { feels_like, temp },
        weather: {
          0: { description, main },
        },
      } = data;
      this.setState({
        city: name,
        temp: temp,
        feels_like,
        main,
        description,
        error: null,
      });
    } else {
      console.log(`Error: ${data.cod} ${data.message}`);
      this.setState({ error: data.message });
    }
  }

  handleSubmit(event) {
    const input = event.target.querySelector('#location-input');
    if (input.value) {
      this.fetchData(input.value);
      event.target.reset();
    }
    event.preventDefault();
  }

  render() {
    return (
      <div id="app">
        <Input onSubmit={this.handleSubmit} />
        <Error message={this.state.error} />
        <Display
          city={this.state.city}
          temp={this.state.temp}
          description={this.state.description}
          main={this.state.main}
        />
      </div>
    );
  }
}

export default App;
