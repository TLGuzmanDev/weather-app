import React from 'react';
import './App.css';
import fetchWeatherData from './services/weather-api';
import Input from './components/Input';
import Error from './components/Error';
import Display from './components/Display';

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
