import geoloc from "./geloc.js";



const metricElements = document.getElementsByClassName('metric'),
      ImperialElements = document.getElementsByClassName('imperial');


const helper = {
   
    setLocationStorage(value){
      localStorage.setItem("settingUnitWeather", value);
      this.changeMetricSettings();
    },
    getLocationStorage(){
      return localStorage.getItem("settingUnitWeather")
        ? localStorage.getItem("settingUnitWeather")
        : "Metric";
    },
    changeMetricSettings(){
      let tmp = !this.locationSettings() ? "Metric" : this.getLocationStorage();

      for (var i = 0; i < metricElements.length; i++) {
        metricElements[i].style.display = tmp == "Metric" ? "block" : "none";
        metricElements[i].style.visibility = tmp == "Metric" ? "" : "hidden";
      }

      for (var i = 0; i < ImperialElements.length; i++) {
        ImperialElements[i].style.display =
          tmp == "Imperial" ? "block" : "none";
        ImperialElements[i].style.visibility =
          tmp == "Imperial" ? "" : "hidden";
      }
    },
    getGeoLocation(){
      geoloc.getGeoLoc();
    },
    locationSettings : ""
}

export default helper
