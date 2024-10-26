// OpenWeatherMap API key
const apiKey = "d29b4ca5a4a749a27dce066d15344904";

// Select HTML elements
const cityForm = document.getElementById('cityForm');
const cityInput = document.getElementById('cityInput');
const locationElement = document.getElementById('location');
const tempElement = document.getElementById('temp');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const weatherIconElement = document.getElementById('weather-icon');

// Function to fetch weather data for the entered city
function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found or other error. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update HTML elements with weather data
            locationElement.textContent = data.name;
            tempElement.textContent = `${data.main.temp} °C`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = data.main.humidity;
            windSpeedElement.textContent = data.wind.speed;
            weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = "Error: City not found";
            tempElement.textContent = "-- °C";
            descriptionElement.textContent = "N/A";
            humidityElement.textContent = "--";
            windSpeedElement.textContent = "--";
            weatherIconElement.src = "";
        });
}

// Event listener for the search form submission
cityForm.addEventListener('submit', event => {
    event.preventDefault();  // Prevent page reload on form submission
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);  // Fetch weather data for the entered city
    }
});
