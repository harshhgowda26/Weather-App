const apiKey = "63a8043d8470e5107bb883d0b12dc203";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  // safety check
  if (!city) return;

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();

  // update UI
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML =
    data.main.humidity + "%";
  document.querySelector(".wind").innerHTML =
    data.wind.speed + " km/h";

  // weather icon logic
  const condition = data.weather[0].main;

  if (condition === "Clouds") {
    weatherIcon.src = "img/clouds.png";
  } else if (condition === "Clear") {
    weatherIcon.src = "img/clear.png";
  } else if (condition === "Rain") {
    weatherIcon.src = "img/rain.png";
  } else if (condition === "Drizzle") {
    weatherIcon.src = "img/drizzle.png";
  } else if (condition === "Mist") {
    weatherIcon.src = "img/mist.png";
  } else if (condition === "Snow") {
    weatherIcon.src = "img/snow.png"
  } else {
    weatherIcon.src = "img/clouds.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

// search button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }
  checkWeather(city);
});

// Enter key support
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city === "") return;
    checkWeather(city);
  }
});