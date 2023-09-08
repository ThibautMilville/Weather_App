import WeatherAppLogic from "./WeatherAppLogic.js";

export default class WeatherAppIntegration {
  constructor() {
    // Call the WeatherAppLogic class
    this.weatherAppLogic = new WeatherAppLogic();

    // Structure
    this.informations = document.getElementById('informations');
    this.choseCity = document.getElementById('chose-city');
    this.weatherImg = document.getElementById('weather-img');
    this.temperature = document.getElementById('temperature');

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
    this.displayData(this.data);
  }

  displayData(data) {
    // Display the data
    this.informations.classList.remove('hidden');
    this.choseCity.textContent = `${data.location.name}, ${data.location.country}`;
    this.weatherImg.src = data.current.weather_icons[0];
    this.weatherImg.alt = data.current.weather_descriptions[0];
    this.temperature.textContent = `${data.current.temperature}°C`;
  }

  // Bind Events
  bindEvents() {
    document.addEventListener('weatherDataAvailable', (e) => this.onDataAvailable(e));
  }
}