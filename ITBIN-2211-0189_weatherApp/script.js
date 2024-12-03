const apiKey = "e90aa68c305b9259394639b53f806272"; 
const buttons = document.querySelectorAll(".city-btn");
const weatherDataEle = document.querySelector(".weather-data");
const imgIcon = document.querySelector(".icon");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const city = button.getAttribute("data-city");
        getWeatherData(city);
    });
});

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error("Network response is not ok!");
        
        const data = await response.json();
        const temp = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ];

        weatherDataEle.querySelector(".temp").textContent = `${temp} °C`;
        weatherDataEle.querySelector(".desc").textContent = description;
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEle.querySelector(".details").innerHTML = details
            .map(detail => `<div>${detail}</div>`)
            .join("");
    } catch (err) {
        weatherDataEle.querySelector(".temp").textContent = "";
        weatherDataEle.querySelector(".desc").textContent = "Error fetching data!";
        weatherDataEle.querySelector(".details").innerHTML = "";
        imgIcon.innerHTML = "";
    }
}
