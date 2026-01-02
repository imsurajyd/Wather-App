import Sun from "../assect/Sun.png";
import SunCloud from "../assect/Cloudsun.png";
import Moon from "../assect/Moon.png";
import MoonCloud from "../assect/Cloudmoon.png";
import Coldtemp from "../assect/Coldtemp.png";
import Hottemp from "../assect/hottemp.png";
import WeatherSkeleton from "./WeatherSkeleton";

import DayClear from "../assect/Cleansky.avif"; 
import NightClear from "../assect/Nightsky.avif"; 
import NightCloud from "../assect/Nightcloud.avif";

import { ImLocation } from "react-icons/im";
import { GiSunrise, GiSunset, GiWhirlwind } from "react-icons/gi";
import { IoWater } from "react-icons/io5";

import { useEffect, useState } from "react";
import axios from "axios";

const Wather = () => {
  /* -------------------- STATE -------------------- */
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "india");
  const [locationData, setLocationData] = useState(null);
  const [cloudData, setCloudData] = useState(null);
  const [astroData, setAstroData] = useState(null);
  const [error, setError] = useState("");

  /* -------------------- API URL -------------------- */
  const API = `https://api.weatherapi.com/v1/forecast.json?key=0bdb2be251764bb69d2162259253012&q=${city}&days=1&aqi=yes`;

  /* -------------------- FETCH DATA -------------------- */
  const getData = async () => {
    try {
      const res = await axios.get(API);
      setLocationData(res.data.location);
      setCloudData(res.data.current);
      setAstroData(res.data.forecast.forecastday[0].astro);
      setError("");
      localStorage.setItem("lastCity", city);
    } catch (err) {
      setError("Enter City,State,country...");
    }
  };

  /* -------------------- USE EFFECT -------------------- */
  useEffect(() => {
    getData();
  }, []);

  /* -------------------- LOADING STATE -------------------- */
  if (!locationData || !cloudData || !astroData) {
    return <WeatherSkeleton />;
  }

  /* -------------------- DERIVED DATA -------------------- */
  const isDay = cloudData.is_day === 1;
  const isCloudy = cloudData.cloud > 30;

  let backgroundImage;

  if (isDay && !isCloudy) backgroundImage = DayClear;
  else if (isDay && isCloudy) backgroundImage = DayCloud;
  else if (!isDay && !isCloudy) backgroundImage = NightClear;
  else backgroundImage = NightCloud;

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // Decide weather image based on day/night and cloudiness
  const weatherImage = isDay
    ? isCloudy
      ? SunCloud
      : Sun
    : isCloudy
    ? MoonCloud
    : Moon;

  const tempIcon = cloudData.temp_c <= 20 ? Coldtemp : Hottemp;

  const dateObj = new Date(locationData.localtime);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
  });
  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

  /* -------------------- RENDER UI -------------------- */
  return (
    <>
      <p className="absolute bottom-15 left-1/2 -translate-x-1/2 text-white font-semibold">~Suraj</p>
      {/* SEARCH BAR */}
      <div className="absolute bg-white rounded-sm top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getData()}
          className="px-4 py-2 rounded-lg outline-none"
        />
        <button
          onClick={getData}
          className="bg-white px-4 py-2 rounded-lg font-semibold"
        >
          Search
        </button>
      </div>
      {error && (
        <p className="absolute top-15 left-1/2 -translate-x-1/2 text-red-400 mt-2 font-semibold">
          {error}
        </p>
      )}

      {/* MAIN CONTAINER */}
      <div className="h-dvh w-dvw flex" style={backgroundStyle}>
        {/* LEFT PANEL */}
        <div className="w-1/3 h-full flex flex-col justify-center items-center gap-8">
          <div className="flex items-center gap-3">
            <ImLocation className="text-3xl text-white" />
            <h2 className="text-5xl text-white font-semibold font-serif">
              {locationData.name}
            </h2>
          </div>

          <p className="text-center text-white text-2xl">
            <span>{formattedDate}</span>
            <br />
            <span className="opacity-80">{dayName}</span>
          </p>

          <div className="flex items-center gap-5">
            <img className="h-30" src={tempIcon} alt="Temperature Icon" />
            <h1 className="text-8xl text-white font-bold">
              {cloudData.temp_c}°
            </h1>
          </div>

          <p className="text-2xl text-white">
            Feels like{" "}
            <span className="font-semibold">{cloudData.feelslike_c}°</span>
          </p>
        </div>

        {/* CENTER PANEL */}
        <div className="w-1/3 h-full flex flex-col items-center justify-center">
          <img
            src={weatherImage}
            alt="Weather Icon"
            className="w-150 mx-auto"
          />
          <h3 className="text-3xl font-semibold text-white">
            {cloudData.condition.text}
          </h3>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/3 h-full flex flex-col justify-center px-20 gap-6">
          <div className="flex gap-4 text-3xl text-white items-center">
            <GiSunrise />
            <p>{astroData.sunrise}</p>
          </div>

          <div className="flex gap-4 text-3xl text-white items-center">
            <GiSunset />
            <p>{astroData.sunset}</p>
          </div>

          <div className="flex gap-4 text-3xl text-white items-center">
            <IoWater />
            <p>{cloudData.humidity}% Humidity</p>
          </div>

          <div className="flex gap-4 text-3xl text-white items-center">
            <GiWhirlwind />
            <p>{cloudData.wind_kph} km/h</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wather;
