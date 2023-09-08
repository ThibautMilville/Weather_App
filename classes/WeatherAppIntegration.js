import WeatherAppLogic from "./WeatherAppLogic.js";

export default class WeatherAppIntegration {
  constructor() {
    // Call the WeatherAppLogic class
    this.weatherAppLogic = new WeatherAppLogic();

    // API - WeatherStack
    this.data = null;

    // Load the class
    this.load();
  }

  // Methods
  load() {
    this.bindEvents();
  }

  onDataAvailable(e) {
    // Get the data from the custom event
    this.data = e.detail;
    console.log(this.data);
  }

  // Bind Events
  bindEvents() {
    document.addEventListener('weatherDataAvailable', (e) => this.onDataAvailable(e));
  }
}