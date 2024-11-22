
import { API_CONFIG } from "./config";
import { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./type";


class WeatherAPI {
// The createUrl method is a private method that takes an endpoint and a set of parameters as arguments and returns a formatted URL string.
    private createUrl(endpoint:string,params:Record<string,string|number>){
        const searchParams = new URLSearchParams({// creates an instance of URLSearchParams, which helps format query parameters into a URL-encoded string.
            appid: API_CONFIG.API_KEY,
            ...params
        }) 
        return `${endpoint}?${searchParams.toString()}`;
    }

// The fetchData method is a generic method that fetches data from the API and returns it as a Promise. 
//It takes a URL as an argument and returns the response as a JSON object.
    private async fetchData<T>(url:string):Promise<T>{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Weather API Error :${response.statusText}`);
        }
        return response.json();
    }
// The getCurrentWeather method fetches the current weather data for a given set of coordinates (latitude and longitude).
    async getCurrentWeather({lat,lon}:Coordinates):Promise<WeatherData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:"metric"

        });
        return this.fetchData<WeatherData>(url);
    }
// The getForecast method fetches the weather forecast data for a given set of coordinates (latitude and longitude).
    async getForecast({lat,lon}:Coordinates):Promise<ForecastData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:"metric"
        });
        return this.fetchData<ForecastData>(url);
    }
// The reverseGeocode method fetches the geocoding data for a given set of coordinates (latitude and longitude).
    async reverseGeocode({lat,lon}:Coordinates):Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`,{
            lat:lat.toString(),
            lon:lon.toString(),
            limit:"1"
        });
        return this.fetchData<GeocodingResponse[]>(url);
    }

    async searchLocations(query:string):Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/direct`,{
            q:query,
            limit:"5"
        });
        return this.fetchData<GeocodingResponse[]>(url);
    }

}
export const weatherAPI = new WeatherAPI();