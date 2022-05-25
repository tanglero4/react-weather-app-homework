import React, { useEffect, useState } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props){
    let [loaded, setLoaded]= useState(false);
    let [forecast,setForecast]= useState(" ");

    useEffect(()=>{
      setLoaded(false); 
    }, [props.coordinates]);

    function handleResponse(response){
        setForecast(response.data.daily);
        setLoaded(true);
    }
  
  if (loaded) {
    return ( 
    <div className="WeatherForecast">
    <div className="row">
      {forecast.localeCompare(function (dailyForecast, index){
        if (index < 5){
          return (
            <div className="col" key={index}>
            < WeatherForecastDay data={dailyForecast}/>
                    </div>
          );
        }else {
          return null;
        }
      })}
    </div>
</div>
); } else {
    let apiKey = "9ea02d04e1b4b40cf8fbc6da7f94247b";
    let longitude= props.coordinates.lon;
    let latitude= props.coordinates.lat;
    let apiURL=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  axios.get(apiURL).then(handleResponse); 

  return null;
}
  }
  