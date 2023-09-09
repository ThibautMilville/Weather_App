export default class WeatherAppLogic {
  constructor() {
    // Structure
    this.form = document.getElementById('weather-form');
    this.city = document.getElementById('city');

    // API - WeatherStack
    this.ACCESS_KEY = 'f71ba1ecf0a2fe236a840990b40069a4';
    this.coordinates = null;
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
      const response = await fetch(`http://api.weatherstack.com/current?access_key=${this.ACCESS_KEY}&query=${this.coordinates ? this.coordinates.lat + ',' + this.coordinates.lon : this.city.value}`);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      // Reset the coordinates and return data
      this.coordinates = null;
      return data;

    } catch (err) {
      console.log('Oh no', err);
      throw err;
    }
  }

  async searchForm(e) {
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

  async geoLocateMe(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // Save the latitude and longitude
        this.coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        // Fetch the API
        try {
          this.data = await this.fetchAPI();
          this.onDataAvailable();
        } catch (err) {
          console.log('Oh no', err);
        }
      } catch (err) {
        console.log('Geolocation error', err);
      }
    } else {
      alert('Geolocation is not supported by this browser!');
    }
  }

  onDataAvailable() {
    // Create a custom event to pass the data to the WeatherAppIntegration class
    const event = new CustomEvent('weatherDataAvailable', { detail: this.data });
    document.dispatchEvent(event);
  }

  // Bind Events
  bindEvents() {
    this.form.addEventListener('submit', e => {
      // Check if the submitter is the search button or the geolocate button
      e.submitter.value === 'Search' ? this.searchForm(e) : this.geoLocateMe(e);
    });
  }
}