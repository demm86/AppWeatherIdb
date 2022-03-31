import datafetch from "./api.js";
import helper from "./helper.js";


const inputField = document.querySelector(".input-part"),
      metrictsCmb = document.querySelector(".metricts-select"),
      locationBtn = document.querySelector("button");      

metrictsCmb.value = helper.locationSettings;



inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        datafetch.requestWeatherApi(inputField.value);
        datafetch.requestForeCastApi(inputField.value);
    }
});

metrictsCmb.addEventListener('change', function () {
    helper.setLocationStorage(metrictsCmb.value);
}, false);

locationBtn.addEventListener("click", () => {
    helper.getGeoLocation();
});




