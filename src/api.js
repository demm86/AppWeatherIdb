import components from "./components.js";
import errorService from './errors.js'

const  datafetch = {
            baseUrl :"http://apiweather-env-1.us-east-2.elasticbeanstalk.com/api/v1.0",
            apiUrl: "",
            requestWeatherApi (city) {
                this.apiUrl = `${this.baseUrl}/Current?location=${city}`;
                this.fetchDataWeather();
            },
            requestWeatherLatLonApi (lat, lon) {
                this.apiUrl = `${this.baseUrl}/Current?location=${lat},${lon}`;
                this.fetchDataWeather();
            },
            requestForeCastApi (city) {
                this.apiUrl = `${this.baseUrl}/CurrentForecast?location=${city}`;
                this.fetchDataForecast();
            },
            requestForeCastLatLonApi (lat, lon) {
                this.apiUrl = `${this.baseUrl}/Current?location=${lat},${lon}`;
                this.fetchDataForecast();
            },
            fetchDataWeather(){
                errorService.pendingMsj("Getting weather details...");
               // changeMetricSettings(settingUnitWeather);
                fetch(this.apiUrl)
                    .then((res) => res.json())
                    .then((result) => components.weatherDetails(result))
                    .catch(() => {
                        errorService.errorMsj("Something went wrong");
                    });
            },
            fetchDataForecast(){
                errorService.pendingMsj("Getting weather details...");
                fetch(this.apiUrl)
                    .then((res) => res.json())
                    .then((result) => components.weatherForecastDetails(result))
                    .catch(() => {
                        errorService.errorMsj("Something went wrong");
                    });
            }
    
}

export default datafetch