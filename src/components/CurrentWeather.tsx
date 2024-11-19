import type { GeocodingResponse, WeatherData } from "@/api/type";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}
const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, temp_max, temp_min, humidity },
    wind: { speed },
  } = data;

  function tempFormat(temp: number) {
    return `${temp.toFixed(0)}°`;
  }
  return (

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline">
                  <h2 className="font-bold text-2xl tracking-tight">
                    {locationName?.name}
                  </h2>
                  <span className="text-muted-foreground">
                    ,{locationName?.state}
                  </span>
                </div>
                <p className="text-muted-foreground space-y-4">
                  {locationName?.country}
                </p>
              </div>

              <div className="flex  items-center gap-2">
                <p className="text-7xl font-bold tracking-tighter">
                  {tempFormat(temp)}
                </p>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm font-medium">
                    Feels like {tempFormat(feels_like)}
                  </p>
                  <div className="flex gap-2 text-sm font-medium">
                    <span className="flex items-center text-blue-500">
                      <ArrowUp className="h-3 w-3" /> {temp_max}
                    </span>
                    <span className="flex items-center text-red-500">
                      <ArrowDown className="h-3 w-3" /> {temp_min}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Wind Speed</p>
                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center" >
                    <img 
                    src={`http://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`} alt={CurrentWeather.description} className="h-full w-full object-contain" />
                    <div className="absolute bottom-0 text-center">
                        <p className="text-sm font-medium capitalize">{CurrentWeather.description}</p>
                    </div>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>

  );
};

export default CurrentWeather;
