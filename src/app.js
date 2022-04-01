import datafetch from "./api.js";
import helper from "./helper.js";
import errorService from "./errors.js";

const inputField = document.getElementById("input-city"),
      metrictsCmb = document.getElementById("metricts-select"),
      locationBtn = document.getElementById("button-get-data");      


metrictsCmb.value = helper.getLocationStorage();



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
    errorService.pendingMsj("Getting weather details...");
    helper.getGeoLocation();
});




