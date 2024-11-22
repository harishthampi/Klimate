import { WeatherData } from "@/api/type";
import { Button } from "./ui/button";
import { useFavorites } from "@/hooks/use-favourite";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoritesButtonData {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoritesButtonData) => {
  const { addFavorites, isFavorite, removeFavorites } = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);
  console.log("issss",isCurrentlyFavorite);
  
  const handleClick = () => {
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
      variant={isCurrentlyFavorite ? "outline" : "default"}
      size={"icon"}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-500" : ""}
      onClick={handleClick}
    >
      <Star
        className={`h-6 w-6 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
};

export default FavoriteButton;