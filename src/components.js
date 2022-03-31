import errorService from "./errors.js";
const wrapper = document.querySelector(".wrapper"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  forecastDiv = wrapper.querySelector("#ForecastDiv");

const components = {
  weatherDetails(res) {
    if (res.cod == "404") {
      errorService.errorMsj("Invalid city name");
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

      weatherPart.querySelector(".temp .numb.metric").innerText =
        Math.floor(tempC);
      weatherPart.querySelector(".temp .numb.imperial").innerText =
        Math.floor(tempF);

      weatherPart.querySelector(".weather").innerText = description;
      weatherPart.querySelector(
        ".location span"
      ).innerText = `${city}, ${country}`;
      weatherPart.querySelector(".temp .numb-2.metric").innerText =
        Math.floor(feels_likeC);
      weatherPart.querySelector(".temp .numb-2.imperial").innerText =
        Math.floor(feels_likeF);
      weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
      weatherPart.querySelector(
        ".wind span.numb.metric"
      ).innerText = `${windK} Kph `;

      weatherPart.querySelector(
        ".wind span.numb.imperial"
      ).innerText = `${windM} Mph `;

      inputField.value = `${city}, ${country}`;
      //infoTxt.classList.remove("pending", "error");
      //infoTxt.innerText = "";
      wrapper.classList.add("active");
    }
  },
  weatherForecastDetails(res) {
    forecastDiv.innerHTML = "";
    if (res.cod == "404") {
      // if user entered city name isn't valid
      errorService.errorMsj("Invalid city name");
    } else {
      res.forecast.forecastday.map((element, index) => {
        let elementTmp = `<div>
             <img src="http:${element.day.condition.icon}" alt="Weather Icon">
            <span class="day"> ${moment(element.date).format(
              "dddd"
            )}</span>                                                   
            <hr>
            <span class="numb metric"> ${element.day.maxtempC}° </span>
            <span class="numb imperial"> ${element.day.maxtempF}° </span>
            <span class="numb metric"> ${
              element.day.mintempC
            } ° </span>                   
            <span class="numb imperial"> ${
              element.day.mintempF
            } ° </span>                   
            </div>`;
        forecastDiv.innerHTML += elementTmp;
      });
    }
    changeMetricSettings(settingUnitWeather);
  },
};

export default components
