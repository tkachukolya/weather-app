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

function showTemp(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  let weatherDescription = document.querySelector("#weather-mood");
  let showDescription = response.data.weather[0].description;
  weatherDescription.innerHTML = showDescription;

  let weatherHumidity = document.querySelector("#now-humidity");
  let showHumidity = response.data.main.humidity;
  weatherHumidity.innerHTML = `Humidity: ${showHumidity} km/h`;

  let weatherWind = document.querySelector("#now-wind");
  let showWind = Math.round(response.data.wind.speed);
  weatherWind.innerHTML = `Wind: ${showWind} km/h`;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
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
  let fahreinheitTemperature = ((celsiusTemperature * 9) / 5 + 32);
  currentTemp.innerHTML = Math.round(fahreinheitTemperature);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  console.log(position.coords.latitude);
  let longitude = position.coords.longitude;
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(cityUrl).then(showTemp);
}

function getCurrentCity(cityName) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

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

