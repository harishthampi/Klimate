import type { WeatherData } from "@/api/type";
import { format } from "date-fns";
import { Gauge, Sunrise, Sunset, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { main, sys, wind } = data;
  const formatTime = (time: number) => {
    return format(new Date(time * 1000), "h:mm a");
  };

  const windDirection = (deg: number) => {
    const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return direction[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind",
      value: `${wind.speed} m/s ${windDirection(wind.deg)}`,
      icon: Wind,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6">
            {
                details.map((detail) =>(
                    <div key={detail.title} className="flex items-center border rounded-lg p-4 gap-3">
                        <detail.icon className={`w-5 h-5 ${detail.color}`} />
                        <div>
                            <p className="text-sm font-medium leading-none">{detail.title}</p>
                            <p className="text-sm text-muted-foreground">{detail.value}</p>
                        </div>
                    </div>
                ))
            }
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
