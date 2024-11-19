import { Coordinates } from "@/api/type";
import { useEffect, useState } from "react";

interface GeoLocationState{
    coordinates:Coordinates|null;
    isLoading:boolean;
    error:string|null;

}
export function useGeolocation(){
    const[locationData,setLocationData] = useState<GeoLocationState>({
        coordinates:null,
        isLoading:true,
        error:null
    })
    const getLocation = () =>{
        setLocationData((prev) => ({...prev,isLoading:true,error:null}));

        if(!navigator.geolocation){
            setLocationData({
                coordinates:null,
                isLoading:false,
                error:"Geolocation is not supported in Browser"
            })
        }

        navigator.geolocation.getCurrentPosition((position) =>{
            setLocationData({
                coordinates:{
                    lat:position.coords.latitude,
                    lon:position.coords.longitude
                },
                isLoading:false,
                error:null
            })
        },
        (error)=>{

            let errorMessage : string;

            switch(error.code){
                case error.PERMISSION_DENIED:
                    errorMessage = "User denied the request for location";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable";
                    break;
                case error.TIMEOUT:
                    errorMessage = "The request to get user location timed out";
                    break;
                default:
                    errorMessage = "An unknown error occurred";
            }
            setLocationData({
                coordinates:null,
                isLoading:false,
                error:errorMessage
            })
        },
        {
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0,
        }
     );
    };

    useEffect(()=>{
        getLocation();
    },[]);
    
    return {
        ...locationData,
        getLocation // getLocation function is returned from the hook, which can be used to fetch the user's location.
    }
}