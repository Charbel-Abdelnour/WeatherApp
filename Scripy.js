const searchBox = document.querySelector('.SearchBar');
const searchBtn = document.querySelector('.SearchIcon');
const weatherContainer = document.getElementById('WeatherCondition');
const box1 = document.getElementById('Box1');
const box2 = document.getElementById('Box2');
const apiKey = '5e0fddf2ff7edd3de822de618321edb1';

searchBtn.addEventListener('click',() => {
  const searchQuery = searchBox.value;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const weatherData = {
        location: data.name,
        description: data.weather[0].description,
        temperature: (data.main.temp - 273.15).toFixed(1),
        iconId: data.weather[0].icon,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000)
      };

      // Format the sunrise and sunset times as 12-hour time with AM/PM
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      weatherData.sunrise = weatherData.sunrise.toLocaleTimeString([], options);
      weatherData.sunset = weatherData.sunset.toLocaleTimeString([], options);

      weatherContainer.innerHTML = `
        <h1>${weatherData.location}</h1>
        <h3>${weatherData.description}</h3>
        <img src="https://openweathermap.org/img/w/${weatherData.iconId}.png" alt="${weatherData.description}">
        <p>Temperature: ${weatherData.temperature}°C</p>
      `;
      
      box1.innerHTML = `
        <h2>Sunrise</h2>
        <p>${weatherData.sunrise}</p>
      `;

      box2.innerHTML = `
        <h2>Sunset</h2>
        <p>${weatherData.sunset}</p>
      `;
    })
    .catch(error => console.log(error));
});
