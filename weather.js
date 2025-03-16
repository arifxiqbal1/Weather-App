const weatherForm = document.querySelector(".footer");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "f27c4d2ee9dcf7988966e6d33d940ccd";

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();
    const city = cityInput.value.trim();

    if(city){
        try{
            const weatherData = await getWeatherInfo(city);
            DisplayWeatherInfo(weatherData);

        }catch(error){
                console.error(error);
                displayError(error);
        }


    }else{
        displayError("Please Enter a City!")
    }
});


async function getWeatherInfo(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("City not found");
    }
    return await response.json();
}
    

function DisplayWeatherInfo(data){
    const { name : city,
        main : {temp, humidity},
        weather:[{description, id}]} = data;

        card.textContent = "";
        card.style.display = "flex";

    const cityName = document.createElement("h1");
    const tempDisp = document.createElement("p");
    const humidityDisp = document.createElement("p");
    const weatherDisp = document.createElement("p");
    const emoji = document.createElement("p");
      
    cityName.textContent = city;
    tempDisp.textContent = `Temp: ${(temp - 273.15).toFixed(1)}°C`
    humidityDisp.textContent = `Humidity: ${humidity}%`;
    weatherDisp.textContent = description;
    emoji.textContent = getWeatherEmoji(id);

    cityName.classList.add("cityName");
    tempDisp.classList.add("tempDisp");
    humidityDisp.classList.add("humidityDisp");
    weatherDisp.classList.add("weatherDisp");
    emoji.classList.add("emoji");

    card.appendChild(cityName);
    card.appendChild(tempDisp);
    card.appendChild(humidityDisp);
    card.appendChild(weatherDisp);
    card.appendChild(emoji);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
            default:
                return "❓";

    }



}

function displayError(message){
  const ErrorDisplay = document.createElement("p");

  ErrorDisplay.textContent = message;

  ErrorDisplay.classList.add("errorDisp");

  card.textContent = "";
  card.style.display = "flex";
  
  card.appendChild(ErrorDisplay)
}