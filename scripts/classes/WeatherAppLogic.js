export default class WeatherAppLogic {
  constructor() {
    // Structure
    this.city = document.getElementById('city');
    this.validationBtn = document.getElementById('validationBtn');

    // API - WeatherStack
    const ACCESS_KEY = 'f71ba1ecf0a2fe236a840990b40069a4';
    this.apiURL = 'http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query={this.city.value}';
  }

  // Methods
  load() {
  }

  async fetchAPI() {
    try {
      const response = await fetch(this.apiURL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  actionButton() {
    this.validationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.fetchAPI().then(data => {
        console.log(data);
      });
    });
  }

  // Bind Events
  bindEvents() {
  }
}