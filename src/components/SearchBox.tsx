import { Clock, Loader2, Search, SearchIcon, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useState } from "react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { SearchHistoryItem, useSearchHistory } from "@/hooks/use-searchHistory";
import { format } from "date-fns";

const SearchBox = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const { data: location, isLoading } = useLocationSearch(query);
  const navigate = useNavigate();
  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    console.log("Selected Location:", { lat, lon, name, country });
    //add the city name to search history
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };
  return (
    <>
      <Button
        variant={"outline"}
        className="relative justify-start w-full text-sm text-muted-foreground sm:pr-12  md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}
          <CommandGroup heading="Favorite">
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex justify-between items-center px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Recently Searched
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map((locationItem: SearchHistoryItem) => (
                  <CommandItem
                    key={locationItem.id}
                    value={`${locationItem.lat}|${locationItem.lon}|${locationItem.name}|${locationItem.country}`}
                    onSelect={handleSelect}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{locationItem.name}</span>
                    {locationItem.state && (
                      <span className="text-sm text-muted-foreground">
                        , {locationItem.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {locationItem.country}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {format(locationItem.searchedAt, "MMM d, h:mm a")}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {location && location.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex justify-center items-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
              {location?.map((locationItem) => (
                <CommandItem
                  key={`${locationItem.lat}-${locationItem.lon}`}
                  value={`${locationItem.lat}|${locationItem.lon}|${locationItem.name}|${locationItem.country}`} 
                  onSelect={handleSelect}
                >
                  <SearchIcon className="h-4 w-4 mr-2" />
                  <span>{locationItem.name}</span>
                  {locationItem.state && (
                    <span className="text-sm text-muted-foreground">
                      , {locationItem.state}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    , {locationItem.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBox;
