
const wrapper = document.querySelector(".wrapper"),
      inputPart = document.querySelector(".input-part"),
      infoTxt = inputPart.querySelector(".info-txt"),
      inputField = inputPart.querySelector("input"),
      locationBtn = inputPart.querySelector("button"),
      weatherPart = wrapper.querySelector(".weather-part"),
      wIcon = weatherPart.querySelector("img"),
      forecastDiv = wrapper.querySelector("#ForecastDiv"),
      metrictsCmb = wrapper.querySelector(".metricts-select"),
      metricElements = document.getElementsByClassName('metric'),
     ImperialElements = document.getElementsByClassName('imperial');

let api;
let settingUnitWeather = localStorage.getItem('settingUnitWeather') ? localStorage.getItem('settingUnitWeather') : "Metric";
const baseUrl = 'https://localhost:44385/api/v1.0';


metrictsCmb.value = settingUnitWeather;

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestWeatherApi(inputField.value);
        requestForeCastApi(inputField.value);

    }
});

metrictsCmb.addEventListener('change', function () {
    localStorage.setItem('settingUnitWeather', this.value)
    settingUnitWeather = this.value;
    changeMetricSettings(this.value)
}, false);


locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});


let requestWeatherApi = (city) => {
    api = `${baseUrl}/Current?location=${city}`;
    fetchDataWeather();
}

let requestForeCastApi = (city) => {
    api = `${baseUrl}/CurrentForecast?location=${city}`;
    fetchDataForecast();
}

let onSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    api = `${baseUrl}/Current?location=${latitude},${longitude}`;
    fetchDataWeather();
    requestForeCastApi(latitude + "," + longitude);
}

let onError = (error) => {

    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}


let fetchDataWeather = () => {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    changeMetricSettings(settingUnitWeather);
    fetch(api)
        .then(res => res.json())
        .then(result => weatherDetails(result))
        .catch(() => {
            infoTxt.innerText = "Something went wrong";
            infoTxt.classList.replace("pending", "error");
        });
}


let fetchDataForecast = () => {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api)
        .then(res => res.json())
        .then(result => weatherForecastDetails(result))
        .catch(() => {
            infoTxt.innerText = "Something went wrong";
            infoTxt.classList.replace("pending", "error");
        });
}


let weatherDetails = (res) => {
    if (res.cod == "404") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    } else {

        const city = res.location.name;
        const country = res.location.country;
        const description = res.current.condition.text;
        const tempC = res.current.tempC;
        const tempF = res.current.tempF;
        const feels_likeC = res.current.feelslikeC;
        const feels_likeF = res.current.feelslikeF;
        const humidity = res.current.humidity;
        const windK = res.current.windKph;
        const windM = res.current.windMph;
        wIcon.src = "http:" + res.current.condition.icon;

        weatherPart.querySelector(".temp .numb.metric").innerText = Math.floor(tempC);
        weatherPart.querySelector(".temp .numb.imperial").innerText = Math.floor(tempF);

        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2.metric").innerText = Math.floor(feels_likeC);
        weatherPart.querySelector(".temp .numb-2.imperial").innerText = Math.floor(feels_likeF);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        weatherPart.querySelector(".wind span.numb.metric").innerText = `${windK} Kph `;
        weatherPart.querySelector(".wind span.numb.imperial").innerText = `${windM} Mph `;
        inputField.value = `${city}, ${country}`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        //inputField.value = "";
        wrapper.classList.add("active");
    }
}

let weatherForecastDetails = (res) => {
    forecastDiv.innerHTML = "";
    if (res.cod == "404") { // if user entered city name isn't valid
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    } else {

        res.forecast.forecastday.map((element, index) => {
            let elementTmp = `<div>
             <img src="http:${element.day.condition.icon}" alt="Weather Icon">
            <span class="day"> ${moment(element.date).format("dddd")}</span>                                                   
            <hr>
            <span class="numb metric"> ${element.day.maxtempC}° </span>
            <span class="numb imperial"> ${element.day.maxtempF}° </span>
            
            <span class="numb metric"> ${element.day.mintempC} ° </span>                   
            <span class="numb imperial"> ${element.day.mintempF} ° </span>                   
            </div>`;

            forecastDiv.innerHTML += elementTmp;
        })
    }
    changeMetricSettings(settingUnitWeather);
}



let changeMetricSettings = (settings) => {

    let tmp = (!settings ? 'Metric' : settings);

    for (var i = 0; i < metricElements.length; i++) {
        metricElements[i].style.display = (tmp == "Metric" ? 'block' : 'none');
        metricElements[i].style.visibility = (tmp == "Metric" ? '' : 'hidden');
    }

    for (var i = 0; i < ImperialElements.length; i++) {
        ImperialElements[i].style.display = (tmp == "Imperial" ? 'block' : 'none');
        ImperialElements[i].style.visibility = (tmp == "Imperial" ? '' : 'hidden');
    }
}

