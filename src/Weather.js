import React, {useState} from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(){
 const[weatherData,setWeatherData]=useState({ready: false});


    function handleResponse(response) {
        setWeatherData({
            ready: true,
            date: "Sun 10:00",
            temperature: response.data.main.temp,
            precipitation:``,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
            iconURL:"http://openweathermap.org/img/wn/01d@2x.png",
            description:response.data.weather[0].description,

        });
          }

  

          const apiKey = "9ea02d04e1b4b40cf8fbc6da7f94247b";
          let city="new york";
          let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

          axios.get(apiURL).then(handleResponse);
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
            </div>
            <h1>
              {city}
            </h1>
            <ul>
                <li>
                    {weatherData.date}
                </li>
                <li className="text-capitalize">
                    {weatherData.description}
                </li>
            </ul>
            <div className="row">
                <div className="col-6">
                <img src={weatherData.iconURL} alt={weatherData.description}/>
               <span className="temperature">{Math.round(weatherData.temperature)}</span>
                   <span className="unit">°C</span>
                </div>
                <div className="col-6">
                    <ul>
                        <li>
                            Precipitation: {weatherData.precipitation}
                        </li>
                        <li>
                            Humidity: {weatherData.humidity}
                        </li>
                        <li>
                            Wind: {weatherData.wind} Kh/h
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );} else{
        return(
<p> Loading...</p>

        );
    }
}