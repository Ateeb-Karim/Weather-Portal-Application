"use client";

import SearchBar from "@/components/SearchBar";
import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Cloud,
} from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import Loading from "./loading";
import Image from "next/image";
import Error from "./error";
import StateCard from "@/components/StateCard";

function windDirection(deg: number) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
}

function formatTime(unix: number, timezoneOffsetSec: number) {
  const date = new Date((unix + timezoneOffsetSec) * 1000);
  return date.toUTCString().slice(17, 22);
}

export default function Home() {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <Loading />;

  if (error || !weatherData?.weather?.[0]) return <Error />;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6">
      <div className="relative z-10 flex gap-5 items-center justify-center flex-col shadow-2xl p-6 sm:p-8 backdrop-blur-md bg-white/10 border-2 border-white/40 rounded-3xl w-full max-w-sm sm:max-w-md text-white animate-[fadeIn_0.4s_ease-out]">
        <SearchBar />

        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-sm text-white/60 font-medium">
            {weatherData.name}
            {weatherData.sys?.country ? `, ${weatherData.sys.country}` : ""}
          </p>
          <Image
            src={`/images/${weatherData.weather[0].main}.png`}
            alt="weather image"
            width={120}
            height={120}
            className="drop-shadow-lg w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36"
            loading="eager"
          />

          <div className="flex items-start leading-none">
            <span className="text-5xl sm:text-7xl font-bold tracking-tight">
              {weatherData.main.temp.toFixed(1)}
            </span>
            <span className="text-xl sm:text-2xl font-semibold mt-1">
              &deg;C
            </span>
          </div>
          <p className="text-base sm:text-lg capitalize font-medium text-white/80 mt-1 text-center">
            {weatherData.weather[0].description}
          </p>
          <p className="text-xs text-white/40">
            H: {weatherData.main.temp_max.toFixed(0)}&deg; &nbsp;·&nbsp; L:{" "}
            {weatherData.main.temp_min.toFixed(0)}&deg;
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-2 pt-4 border-t border-white/20 w-full">
          <StateCard
            icon={<Thermometer size={18} strokeWidth={2} />}
            value={`${weatherData.main.feels_like.toFixed(1)}\u00b0`}
            label="Feels like"
          />
          <StateCard
            icon={<Droplets size={18} strokeWidth={2} />}
            value={`${weatherData.main.humidity}%`}
            label="Humidity"
          />
          <StateCard
            icon={
              <Wind
                size={18}
                strokeWidth={2}
                style={{ transform: `rotate(${weatherData.wind.deg}deg)` }}
              />
            }
            value={`${weatherData.wind.speed} m/s`}
            label={windDirection(weatherData.wind.deg)}
          />
          <StateCard
            icon={<Gauge size={18} strokeWidth={2} />}
            value={`${weatherData.main.pressure}`}
            label="Pressure hPa"
          />
          <StateCard
            icon={<Eye size={18} strokeWidth={2} />}
            value={`${(weatherData.visibility / 1000).toFixed(1)} km`}
            label="Visibility"
          />
          <StateCard
            icon={<Cloud size={18} strokeWidth={2} />}
            value={`${weatherData.clouds.all}%`}
            label="Cloud cover"
          />
          <StateCard
            icon={<Sunrise size={18} strokeWidth={2} />}
            value={formatTime(weatherData.sys.sunrise, weatherData.timezone)}
            label="Sunrise"
          />
          <StateCard
            icon={<Sunset size={18} strokeWidth={2} />}
            value={formatTime(weatherData.sys.sunset, weatherData.timezone)}
            label="Sunset"
          />
        </div>
      </div>
    </div>
  );
}
