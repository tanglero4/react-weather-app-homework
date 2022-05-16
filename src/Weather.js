import React, {useState} from "react";
import axios from "axios";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props){
 const [weatherData,setWeatherData] = useState({ ready: false });
 const[city, setCity]= useState(props.defaultCity);


    function handleResponse(response) {
        console.log(response.data);
        setWeatherData({
            ready: true,
            date: new Date(response.data.dt*1000),
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
            icon:response.data.weather[0].icon,
            description:response.data.weather[0].description,

        });
          }
          function search(){
            const apiKey = "9ea02d04e1b4b40cf8fbc6da7f94247b";
            let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            axios.get(apiURL).then(handleResponse);
          }
          function handleSubmit(event){
event.preventDefault();
search(city);
          }

function handleCityChange(event){
setCity(event.target.value);
}


      if (weatherData.ready){
    return(
        <div className="Weather">
            <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-9">
                <input type="text"
                placeholder=" Enter a city"
                autoFocus="on"
                className="form-control"
                onChange={handleCityChange}/>
                </div>
                <div className="col-3">
                <input type="submit" value="Search" className="searchButton w-100"/>
                </div>
                </div>
                </form>
                <WeatherInfo data={weatherData} />
            </div>
    );} else{
        search();
   return "Loading...";
    }
}