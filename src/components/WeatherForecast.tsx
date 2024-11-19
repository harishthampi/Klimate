import type { ForecastData } from "@/api/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}
interface forecast {
    temp_max:number;
    temp_min:number;
    humidity:number;
    wind:number;
    date:number;
    weather:{
        id:number;
        main: string;
        description: string;
        icon: string;
    }
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {

    const forecastData = data.list.reduce((acc,forecast) => {
        const date = format(new Date(forecast.dt*1000),"yyyy-MM-dd");

        if(!acc[date]){
            acc[date] ={
                temp_max:forecast.main.temp_max,
                temp_min:forecast.main.temp_min,
                humidity:forecast.main.humidity,
                weather:forecast.weather[0],
                date:forecast.dt,
                wind:forecast.wind.speed
            };
        }
        else{
            acc[date].temp_max = Math.max(acc[date].temp_max,forecast.main.temp_max);
            acc[date].temp_min = Math.min(acc[date].temp_min,forecast.main.temp_min);
        }
        return acc;
    },{} as Record<string,forecast>)

    const nextDays  = Object.values(forecastData).slice(1,6);

    const formatTemp =(temp:number) => `${Math.round(temp)}°`;
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
            {nextDays.map((day) =>(
                <div key={day.date} 
                className="border p-4 rounded-lg grid grid-cols-3 items-center">
                    <div>
                        <p className="font-medium">
                            {format(new Date(day.date * 1000), "EEE, MMM d")}
                        </p>
                        <p className="capitalize text-sm text-muted-foreground">
                            {day.weather.description}
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <span className="flex text-blue-500 items-center">
                         <ArrowDown className="h-4 w-4 mr-1"/>
                         {formatTemp(day.temp_min)}
                        </span>
                        <span className="flex text-red-500 items-center">
                         <ArrowUp className="h-4 w-4 mr-1"/>
                         {formatTemp(day.temp_max)}
                        </span>
                    </div>

                    <div className="flex justify-end gap-2">
                        <span className="flex items-center gap-1">
                            <Droplet className="h-4 w-4 text-blue-500"/>
                            <span className="text-sm">
                                {day.humidity}%
                            </span>
                        </span>    
                        <span className="flex items-center gap-1">
                            <Wind className="h-4 w-4 text-blue-500"/>
                            <span className="text-sm">
                            {day.wind}m/s
                            </span>
                        </span>   
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
