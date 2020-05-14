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
      return <FontAwesomeIcon icon={faCloudShowersHeavy} size="6x" />;
    case 'Drizzle':
    case 'Rain':
      return <FontAwesomeIcon icon={faCloudRain} size="6x" />;
    case 'Snow':
      return <FontAwesomeIcon icon={faSnowflake} size="6x" />;
    case 'Tornado':
      return <FontAwesomeIcon icon={faWind} size="6x" />;
    case 'Clear':
      return <FontAwesomeIcon icon={faSun} size="6x" />;
    case 'Clouds':
      return <FontAwesomeIcon icon={faCloud} size="6x" />;
    default:
      return <FontAwesomeIcon icon={faSun} size="6x" />;
  }
};

const Description = (props) => {
  if (props.description) {
    return <h1>{props.description.toUpperCase()}</h1>;
  } else {
    return <h1>{'DESCRIPTION'}</h1>;
  }
};

const Temp = (props) => {
  if (props.temp) {
    return <h1>{`${Math.round(props.temp)}\xB0`}</h1>;
  } else {
    return <h1>{'TEMPERATURE'}</h1>;
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
      <Description description={props.description} />
      <City city={props.city} />
      <Symbol main={props.main} />
      <Temp temp={props.temp} />
      <Day />
    </div>
  );
};

const Input = (props) => {
  return (
    <form action="#" onSubmit={props.onSubmit}>
      <input
        type="text"
        id="location-input"
        name="location-input"
        placeholder="location..."
      ></input>
      <input type="submit" value="Submit" />
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
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchData(name) {
    const data = await fetchWeatherData(name);
    if (data.message) {
      console.log(`Error: ${data.cod} ${data.message}`);
    } else {
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
      });
    }
  }

  handleSubmit(event) {
    const input = event.target.querySelector('#location-input');
    this.fetchData(input.value);
    event.target.reset();
    event.preventDefault();
  }

  render() {
    return (
      <div id="app">
        <Input onSubmit={this.handleSubmit} />
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
