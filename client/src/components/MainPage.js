import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/mainPage.css";

export default function MainPage() {
  const api = "https://api.openweathermap.org/data/2.5/";
  const key = "";
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [weatherState, setWeatherState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const serverUrl1 =
      api +
      "weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      key +
      "&units=metric";
    fetch(serverUrl1, { method: "GET" })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setWeather(json);
        setWeatherState(json.weather[0].main);
      });
  }, [latitude, longitude]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      const serverUrl =
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=5&appid=" +
        key +
        "&units=metric";
      fetch(serverUrl, { method: "GET" })
        .then((response) => response.json())
        .then((json) => {
          setLatitude(json[0].lat);
          setLongitude(json[0].lon);
        });
    }
  };

  const handleClick = () => {
    navigate("/details/" + latitude + "/" + longitude);
  };
  return (
    <>
      <section className="headSection">
        <header className="header">
          <h1 className="heading">
            From this distant vantage point, the Earth might not seem of any
            particular interest. But for us, it's different. Consider again that
            dot. That's here, that's home, that's us. - Carl Sagan
          </h1>
        </header>
        <div id="section07" class="demo">
         <h2>Explore the world weather</h2>
         <a href="#search_section"><span></span><span></span><span></span></a>
        </div>
      </section>

      <section id="search_section"
        className="searchSection"
        style={{ backgroundImage: "../../public/images/search2.jpg" }}
      >
        <div className="searchResultDiv">
        <div className="inputDiv">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div className="showResultDiv">
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div>
              <button className="moreInfoBtn" onClick={handleClick} type="button">
                More Info
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        </div>
      </section>
    </>
  );
}
