import React, {useState} from "react";
import axios from "axios";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";

export default function Weather(){
 const [weatherData,setWeatherData] = useState({ ready: false });


    function handleResponse(response) {
        console.log(response.data);
        setWeatherData({
            ready: true,
            date: new Date(response.data.dt*1000),
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
            iconURL:"http://openweathermap.org/img/wn/01d@2x.png",
            description:response.data.weather[0].description,

        });
          }
      if (weatherData.ready){
    return(
        <div className="Weather">
            <div className="row">
                <div className="col-9">
                <input type="text"
                placeholder=" Enter a city"
                autoFocus="on"
                className="form-control"></input>
                </div>
                <div className="col-3">
                <input type="submit" value="Search" className="searchButton w-100"></input>
                </div>
                <form>
                <WeatherInfo data={weatherData} />
                </form>
            </div>
           </div>
    );} else{
   const apiKey = "9ea02d04e1b4b40cf8fbc6da7f94247b";
   let city="new york";
   let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiURL).then(handleResponse);
   return(
    <p> Loading...</p>
        );
    }
}