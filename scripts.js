function formatDate(timestamp){
    let date = new Date(timestamp);
        let hours = date.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
          }
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
          }
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[date.getDay()];
        return `${day} ${hours}:${minutes}`;    
}

function displayTemperature(response){
    console.log(response.data);
    let temperatureElement = document.querySelector("#currenttemperature");
    let cityElement = document.querySelector("#cityname");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector(".humidity");
    let windspeedElement = document.querySelector(".windspeed");
    let dateElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");
    let celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    cityElement.innerHTML= response.data.name;
    descriptionElement.innerHTML= response.data.weather[0].description;
    humidityElement.innerHTML= response.data.main.humidity;
    windspeedElement.innerHTML= Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute ("alt", response.data.weather[0].description);
}
function search(city){
    let apiKey = "b8948de550c1172033028f092653f041";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let units ="metric";
    let apiUrl = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event){
    event.preventDefault();
    let cityInputElement= document.querySelector("#search");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature (event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#currenttemperature");
    let fahrenheitTemperature = celsiusTemperature*9/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature (event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#currenttemperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("London");