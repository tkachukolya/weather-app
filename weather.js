let currentDate = new Date();
let todayDate = document.querySelector("#current-date");

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = currentDate.getDate();
let month = months[currentDate.getMonth()];
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes().toString().padStart(2, "0");

todayDate.innerHTML = `${month} ${date}, ${hour}:${minutes}`;

function showForecast() {
  let weatherForecast = document.querySelector("#forecast");

  let forecastDays = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;

  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
         <div class="col-2">
          <div class="day" id="day-forecast">${day}</div>
            <div><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" alt="clear" id="icon-forecast"/></div>
            <div class="temperature-everyday">14°/6°</div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function showTemp(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;

  celsiusTemperature = Math.round(response.data.temperature.current);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);

  let weatherDescription = document.querySelector("#weather-mood");
  let showDescription = response.data.condition.description;
  weatherDescription.innerHTML = showDescription;

  let weatherHumidity = document.querySelector("#now-humidity");
  let showHumidity = response.data.temperature.humidity;
  weatherHumidity.innerHTML = `Humidity: ${showHumidity} km/h`;

  let weatherWind = document.querySelector("#now-wind");
  let showWind = Math.round(response.data.wind.speed);
  weatherWind.innerHTML = `Wind: ${showWind} km/h`;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.icon);
}

function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

function showFahreinheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahreinheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahreinheitTemperature);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  console.log(position.coords.latitude);
  let longitude = position.coords.longitude;
  let apiKey = "315oe2550fe0b32f10t94f5ba94680a6";
  let cityUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;

  axios.get(cityUrl).then(showTemp);
}

function getCurrentCity(cityName) {
  let apiKey = "315oe2550fe0b32f10t94f5ba94680a6";
  let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  axios.get(cityUrl).then(showTemp);
}

function getCity(event) {
  event.preventDefault();
  let showCity = document.querySelector("#search-input");
  getCurrentCity(showCity.value);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahreinheit);
let celsiusTemperature = null;

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", getCity);
let searchCity = document.querySelector("#current-button");
searchCity.addEventListener("click", getLocation);

showForecast();
