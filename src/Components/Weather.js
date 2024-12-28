import React, { useEffect, useRef, useState } from "react";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import haze_icon from "../Assets/haze.png";
import humidity_icon from "../Assets/humidity.png";
import mist_icon from "../Assets/mist.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import "./Weather.css";

function Weather() {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

const search = async(city) =>{
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

    const icons = {
      "01d": clear_icon,
      "02d": cloud_icon,
      "03d": drizzle_icon,
      "04d": mist_icon,
      "09d": rain_icon,
      "10d": rain_icon,
      "13d": snow_icon,
      "01n": clear_icon,
      "02n": cloud_icon,
      "03n": drizzle_icon,
      "04n": mist_icon,
      "09n": rain_icon,
      "10n": rain_icon,
      "13n": snow_icon,
      "50d": haze_icon,
      "50n": haze_icon
    }

    const response = await fetch(url);
    const data = await response.json();

    if(data.cod === "404"){
      alert("City not found");
      setWeatherData(false);
      return
    }
    console.log(data)

    const icon = icons[data.weather[0].icon] || clear_icon;
    setWeatherData({
      city: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: icon
    })

  } catch (error) {
    console.log(error)
  }

}

useEffect(() => {
  search("")
}, [])

  return (
    <div className="container cont">
      <h1 className="text-center mt-3">WEATHER APP</h1>
      <div className="mt-4 search-cont">
        <input ref={inputRef} type="text" placeholder="Enter City" className="mx-3 p-2" />
        <img
          src={search_icon}
          alt="search-icon"
          className="img-des btn btn-light mx-1 p-2"
          onClick={()=>search(inputRef.current.value)}
        />
      </div>
      {weatherData ? <>
         <div className="mt-0 text-center">
        <img src={weatherData.icon} alt="weather-icon" className="my-2"/>
        <p className="temp mb-0">{weatherData.temp}°C</p>
        <p className="city mt-0 ">{weatherData.city}</p>
      </div>
      <div className="row mt-2">
        <div className="col-6 d-flex align-items-center">
          <img src={humidity_icon}/>
          <div className="ms-2 mt-3 font-col">
            <p className="mb-0 fs-3">{weatherData.humidity}%</p>
            <p className="fs-4">Humidity</p>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center">
        <img src={wind_icon}/>
          <div className="ms-2 mt-3 font-col">
            <p className="mb-0 fs-3">{weatherData.wind} km/h</p>
            <p className="fs-4">Wind Speed</p>
          </div>
        </div>
      </div>
      </>:<></>}
    </div>
  );
}

export default Weather;
