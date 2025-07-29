let valueSearch = document.getElementById("valueSearch");
let city = document.getElementById("city");
let temperature = document.getElementById("temperature");
let description = document.querySelector(".description");
let clouds = document.getElementById("clouds");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");

let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (valueSearch.value != "") {
        searchWeather();
    }
})

let id = "";
let url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + id;

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(responsive => responsive.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                city.querySelector("figcaption").innerHTML = data.name;
                city.querySelector("img").src = "https://flagsapi.com/" + data.sys.country + "/shiny/32.png";

                temperature.querySelector("img").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png";
                temperature.querySelector("figcaption span").innerHTML = data.main.temp;
                description.innerHTML = data.weather[0].description;
                clouds.innerHTML = data.clouds.all;
                humidity.innerHTML = data.main.humidity;
                pressure.innerHTML = data.main.pressure;

                const weatherMain = data.weather[0].main;

                const body = document.querySelector("body");

                if (weatherMain === "Clouds") {
                    body.style.backgroundImage = "url('images/cloudy.jpg')";
                } else if (weatherMain === "Rain") {
                    body.style.backgroundImage = "url('images/rain.jpg')";
                } else if (weatherMain === "Clear") {
                    body.style.backgroundImage = "url('images/sunny.jpg')";
                } else if (weatherMain === "Snow") {
                    body.style.backgroundImage = "url('images/snow.jpg')";
                } else {
                    body.style.backgroundImage = "url('images/cloudy.jpg')";
                }
            }

            valueSearch.value = "";
        })
}

const initApp = () => {
    valueSearch.value = "Delhi";
    searchWeather();
}
initApp();
