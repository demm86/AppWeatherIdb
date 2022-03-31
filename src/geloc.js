import errorService from "./errors.js";
import apiService from "./api.js";

const geoloc = {
  getGeoLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    } else {
      errorService.errorAlert("Your browser not support geolocation api");
    }
  },
  onSuccess(position) {
    const { latitude, longitude } = position.coords;
    apiService.requestWeatherLatLonApi(latitude, longitude);
    apiService.requestForeCastLatLonApi(latitude, longitude);
  },
  onError(error) {
    errorService.errorMsj(error.message);
  },
};

export default geoloc
