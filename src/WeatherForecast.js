import React, { useState } from "react";
import "./WeatherForecast.css";
import { Axios } from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props){
    let [loaded, setLoaded]= useState(false);
    let [forecast,setForecast]= useState("");

    function handleResponse(response){
        setForecast(response.data.daily);
        setLoaded(true);
    }
  
  if (loaded) {
    return ( 
    <div className="WeatherForecast">
    <div className="row">
        <div className="col">
< WeatherForecastDay data={forecast[0]}/>
        </div>
    </div>
</div>
); } else {
    let apiKey = "9ea02d04e1b4b40cf8fbc6da7f94247b";
    let longitude= props.coordinates.lon;
    let latitude= props.coordinates.lat;
    let apiURL=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  Axios.get(apiURL).then(handleResponse); 
  return null;
}
  }
  