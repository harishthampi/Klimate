import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage"


 export interface FavoritesItem{
    id:string,
    name:string,
    lat:number,
    lon:number,
    country:string,
    state?:string,
    addedAt:number
 }
 
 
 export function useFavorites(){
    const[favorites,setFavorites] = useLocalStorage<FavoritesItem[]>(
         // persists FavoritesItem data in local storage. useLocalStorage returns [favorites, setFavorites], where favorites is the current favorites, and setFavorites updates it.   
        "favorites", // key for local storage
        [] // initial value
    );

    const queryClient = useQueryClient()
    

  
    const favoritesQuery = useQuery({
        queryKey:["favorites"],// queryKey is an array of strings that uniquely identifies the query
        queryFn: () => favorites,// queryFn is a function that returns the data for the query
        initialData: favorites,// initialData is the initial data for the query
        staleTime:Infinity, // staleTime is set to Infinity to prevent the query from automatically refetching data.
    })

    const addFavorites = useMutation({
        mutationFn:async(
            city:Omit<FavoritesItem,"id"|"addedAt"> 
        ) => {
            const newFavorite : FavoritesItem = {
                ...city,
                id:`${city.lat}-${city.lon}`,
                addedAt:Date.now(),
            };
            const exist = favorites.some((fav:FavoritesItem) => fav.id === newFavorite.id);
            if(exist) return favorites;;

            const newFavorites = [ ...favorites,newFavorite]
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["favorites"]
            });
        },
    })

    const removeFavorites = useMutation({
        mutationFn:async(cityId:string)=>{
            const newFavorites = favorites.filter((city:FavoritesItem) => city.id !== cityId);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["favorites"]
            });
        }
    });

    return{
        favoritesQuery,
        addFavorites,
        removeFavorites,
        isFavorite:(lat:number,lon:number) => favorites.some((city:FavoritesItem) => city.lat === lat && city.lon === lon),
    }
    
}