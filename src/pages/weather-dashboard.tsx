
import CurrentWeather from "@/components/CurrentWeather";
import FavoriteCities from "@/components/FavoriteCities";
import HourlyWeather from "@/components/HourlyWeather";
import WeatherSkelton from "@/components/skelton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useGeolocation } from "@/hooks/use-geolocation"
import { useForecastQuery, useReverseGeolocationQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

const DashBoard = () => {
   const{coordinates,error:locationError,isLoading:locationLoading,getLocation} = useGeolocation();
   const locationQuery = useReverseGeolocationQuery(coordinates);
   const weatherQuery = useWeatherQuery(coordinates);
   const forecastQuery = useForecastQuery(coordinates);
   const handleRefresh = () =>{
      getLocation();
      if(coordinates){
        locationQuery.refetch();
        weatherQuery.refetch();
        forecastQuery.refetch();
      }
   };
   
   if(locationLoading){
    return <WeatherSkelton />
   }
   if(locationError){
    return(
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{locationError}</p>
        <Button variant={"outline"} onClick={getLocation} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    )

   }
   if(!coordinates){
    return(
    <Alert variant="destructive">
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your local weather</p>
        <Button variant={"outline"} onClick={getLocation} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    )
   }
   const locationName = locationQuery.data?.[0];

   if(weatherQuery.error || forecastQuery.error){
    return(
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant={"outline"} onClick={handleRefresh} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
      )
   }
   if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkelton />;
  }

   return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button  size={"icon"}
        onClick={handleRefresh}
        disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${
            weatherQuery.isFetching || forecastQuery.isFetching ? "animate-spin" : ""
          }`}/>
        </Button>
        </div>
        
        <div className="grid gap-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <CurrentWeather data={weatherQuery.data} locationName={locationName} />
            <HourlyWeather data={forecastQuery.data} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <WeatherDetails data={weatherQuery.data}/>
            <WeatherForecast data={forecastQuery.data} />
          </div>
        </div>
      </div>
  )
}

export default DashBoard
