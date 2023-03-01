import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { WiCloud, WiLightning, WiShowers, WiRain, WiSnow, WiDaySunny} from "react-icons/wi";
import "../css/detailWeather.css";
import { useNavigate } from "react-router-dom";

export default function DetailsWeather() {
  const api="https://api.openweathermap.org/data/2.5/";
  const key="";
  const [latitude,setLatitude]=useState('');
  const [longitude,setLongitude]=useState('');
  const [weatherFourDays,setWeatherFourDays]=useState([]);
  const { lat,long } = useParams();
  const navigate = useNavigate();
  
   useEffect(() => {
    setLatitude(lat)
    setLongitude(long)
    const serverUrlFourDays = api+'forecast?lat='+latitude+'&lon='+longitude+'&appid='+key+'&units=metric'
    fetch(serverUrlFourDays, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
            setWeatherFourDays(json.list);      
        })      
 
   }, [latitude,longitude]);
   useEffect(()=>{
        setLatitude(lat)
        setLongitude(long)
   },[])

   const handleClick = () => {
    navigate("/");
  };

   const getLogo=(days)=>{
    if (typeof days.main != "undefined") {
      if (days.weather[0].main === "Clouds") {
        return <WiCloud style={{fontSize: '50px'}}/>;
      } else if (days.weather[0].main === "Thunderstorm") {
        return <WiLightning style={{fontSize: '50px'}}/>;
      } else if (days.weather[0].main === "Drizzle") {
        return <WiShowers style={{fontSize: '50px'}}/>;
      } else if (days.weather[0].main === "Rain") {
        return <WiRain style={{fontSize: '50px'}}/>;
      } else if (days.weather[0].main === "Snow") {
        return <WiSnow style={{fontSize: '50px'}}/>;
      } else if (days.weather[0].main === "Clear") {
        return <WiDaySunny style={{fontSize: '50px'}}/>;
      }
    } else return <div>...Loading</div>;
   }

    return (
    <>
    <h2 className="detailHead">Weather Details</h2>
    {typeof weatherFourDays != "undefined"? (
          <div>
            <div>
              <div className="allDays">
                {weatherFourDays.slice(0, 5).map((days,index)=>
                  <div className="day" >
                    <div ><b>Day {index+1}</b></div>
                    <div>{getLogo(days)}</div>
                    <div >{days.weather[0].main}</div>
                    <div >Temp: {Math.round(days.main.temp)}</div>
                    <div >Feels like: {Math.round(days.main.feels_like)}</div>
                    <div >Humidity: {Math.round(days.main.humidity)}</div>
                    <div >Pressure: {Math.round(days.main.pressure)}</div>
                  </div>)}
              </div>
            </div>
          </div>
        ) :  ""
        }
        <button className="searchMoreBtn" onClick={handleClick} type="button">
                Search More
              </button>
    </>
    );
}