function formatDates(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${day}, ${hour}:${minute}`;
}

formatDates(new Date());

function displayDegrees(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#cities").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#display-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#display-windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#date").innerHTML = formatDates(
    response.data.dt * 1000
  );
}

function searchCity(city) {
  let apiKey = "4269171b038b0f22bd54e3d3a844ae7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayDegrees);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

function changeFahren(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeCelsi(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function searchLocation(position) {
  let apiKey = "4269171b038b0f22bd54e3d3a844ae7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayDegrees);
}
function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("search-form");
searchForm = addEventListener("submit", handleSearch);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeFahren);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeCelsi);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentWeather);

searchCity("Berlin");
