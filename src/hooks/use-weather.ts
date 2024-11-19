import { Coordinates } from "@/api/type";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    //object creates unique keys for each type of weather-related query
    weather:(coords:Coordinates) => ['weather', coords] as const,
    forecast:(coords:Coordinates) =>['forecast',coords] as const,
    reverseGeoLocation:(coords:Coordinates) =>['reverseGeoLocation',coords] as const,
    locationSearch:(query:String) =>['locationSearch',query] as const,
}as const;
// Custom hook that fetches the current weather data for a given set of coordinates.
export function useWeatherQuery(coordinates:Coordinates | null){
    return useQuery({
        queryKey:WEATHER_KEYS.weather(coordinates??{lat:0,lon:0}),
        queryFn:()=>
            coordinates? weatherAPI.getCurrentWeather(coordinates):null,
        enabled: !!coordinates, // This ensures that the query is only executed when the coordinates are not null.
    })
}

// Custom hook that fetches the weather forecast data for a given set of coordinates.
export function useForecastQuery(coordinates:Coordinates | null){
    return useQuery({
        queryKey:WEATHER_KEYS.forecast(coordinates??{lat:0,lon:0}),
        queryFn:()=>
            coordinates? weatherAPI.getForecast(coordinates):null,
            enabled: !!coordinates,
    })
}
// Custom hook that fetches the geocoding data for a given set of coordinates.
export function useReverseGeolocationQuery(coordinates:Coordinates|null){
    return useQuery({
        queryKey:WEATHER_KEYS.reverseGeoLocation(coordinates??{lat:0,lon:0}),
        queryFn:()=>
            coordinates? weatherAPI.reverseGeocode(coordinates):null,
            enabled:!!coordinates,
    })
}

// Custom hook that fetches the geocoding data for a given search query.
export function useLocationSearch(query:string){
    return useQuery({
        queryKey:WEATHER_KEYS.locationSearch(query),
        queryFn:()=>
            weatherAPI.searchLocations(query),
            enabled:query.length >= 3,
    })
}
