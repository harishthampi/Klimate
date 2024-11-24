import { WeatherData } from "@/api/type";
import { useFavorites } from "@/hooks/use-favourite";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface FavoritesButtonData {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoritesButtonData) => {
  const { addFavorites, isFavorite, removeFavorites} = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);
  
  
  const handleToggleFavorite = () => {
    console.log("clicked",isCurrentlyFavorite);
    
    if (isCurrentlyFavorite) {
      removeFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favorites`);
    } else {
      addFavorites.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to favorites`);
    }
  };
  return (
    <Button
    variant={isCurrentlyFavorite ? "default" : "outline"}
    size="icon"
    onClick={handleToggleFavorite}
    className="bg-yellow-500 hover:bg-yellow-600">
    <Star
      className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
    />
  </Button>
);
};

export default FavoriteButton;