export default class WeatherAppLogic {
  constructor() {
    // Structure
    this.form = document.getElementById('weather-form');
    this.city = document.getElementById('city');

    // API - WeatherStack
    this.ACCESS_KEY = 'f71ba1ecf0a2fe236a840990b40069a4';
    this.data = "null";

    // Load the class
    this.load();
  }

  // Load
  async load() {
    this.bindEvents();
  }

  // Methods
  async fetchAPI() {
    try {
      const response = await fetch(`http://api.weatherstack.com/current?access_key=${this.ACCESS_KEY}&query=${this.city.value}`);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      return data;

    } catch (err) {
      console.log('Oh no', err);
      throw err;
    }
  }

  async submitForm(e) {
    e.preventDefault();
    if (this.city.value === '') {
      alert('Please enter a city!');
      return;
    } else {
      try {
        this.data = await this.fetchAPI();
        this.onDataAvailable();
      } catch (err) {
        console.log('Oh no', err);
      }
    }
  }

  onDataAvailable() {
    // Create a custom event to pass the data to the WeatherAppIntegration class
    const event = new CustomEvent('weatherDataAvailable', {detail: this.data});
    document.dispatchEvent(event);
  }

  // Bind Events
  bindEvents() {
    this.form.addEventListener('submit', e => {
      this.submitForm(e);
    });
  }
}