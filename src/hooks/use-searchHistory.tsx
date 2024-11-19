import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage"

 export interface SearchHistoryItem{
    id:string,
    query:string,
    lat:number,
    lon:number,
    name:string,
    country:string,
    state?:string,
    searchedAt:number
 }
 
 
 export function useSearchHistory(){
    const[history,setHistory] = useLocalStorage<SearchHistoryItem[]>(
        // persists SearchHistoryItem data in local storage. useLocalStorage returns [history, setHistory], where history is the current search history, and setHistory updates it.
        "search-history",
        [] // initial value
    );

    const queryClient = useQueryClient()
    //useful for managing data across mutations and ensuring that components using search-history are in sync with the local storage data.

    // The useQuery hook fetches the search history data from the local storage and stores it in the query cache with the key ["search-history"].
    const historyQuery = useQuery({
        queryKey:["search-history"],// queryKey is an array of strings that uniquely identifies the query
        queryFn: () => history,// queryFn is a function that returns the data for the query
        initialData: history,// initialData is the initial data for the query
    })

    const addToHistory = useMutation({
        mutationFn:async(
            search:Omit<SearchHistoryItem,"id"|"searchedAt"> // Omit is a utility type that creates a type by excluding the specified keys from the input type.
        ) => {
            // The mutation function adds a new search to the search history. It generates a unique id for the search and sets the searchedAt timestamp to the current time.
            const newSearch : SearchHistoryItem = {
                ...search,
                id:`${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt:Date.now(),
            };

             // Remove duplicates and keep only last 10 searches
            const filteredHistory = history.filter(
                (item: SearchHistoryItem) => !(item.lat === search.lat && item.lon === search.lon)
            );
            const newHistory = [newSearch, ...filteredHistory].slice(0, 10);
            setHistory(newHistory);
            return newHistory;
        },
        onSuccess: (newHistory) => {
            //updates the React Query cache for ["search-history"] with the latest newHistory, so any component relying on the search history cache will instantly see the updated data.
            queryClient.setQueryData(["search-history"], newHistory);
        },
    })

    const clearHistory = useMutation({
        mutationFn:async()=>{
            setHistory([]);
            return [];
        },
        onSuccess:() =>{
            queryClient.setQueryData(["search-history"], []);
        }
    });

    return{
        history:historyQuery.data ?? [],// returns the search history data from the query, or an empty array if the data is not available.
        addToHistory,
        clearHistory
    }
    
}