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
  ArrowUp,
} from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import WeatherIcon from "@/components/WeatherIcons";
import Loading from "./loading";

function windDirection(deg: number) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function formatTime(unix: number, timezoneOffsetSec: number) {
  const date = new Date((unix + timezoneOffsetSec) * 1000);
  return date.toUTCString().slice(17, 22);
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6">
      <div className="relative z-10 flex gap-5 items-center justify-center flex-col shadow-2xl p-6 sm:p-8 backdrop-blur-md bg-white/10 border-2 border-white/40 rounded-3xl w-full max-w-sm sm:max-w-md text-white animate-[fadeIn_0.4s_ease-out]">
        {children}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function StateCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-white/80 bg-white/5 border border-white/10 rounded-2xl px-3 py-3 min-w-18 transition-transform hover:scale-105 hover:bg-white/10">
      {icon}
      <span className="text-sm font-semibold">{value}</span>
      <span className="text-[11px] text-white/50 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <Loading />;

  if (error || !weatherData?.weather?.[0]) {
    return (
      <Shell>
        <SearchBar />
        <WeatherIcon code={weatherData?.weather?.[0]?.id || 800} size={140} />
        <p className="text-base sm:text-lg capitalize font-medium text-white/80 mt-1 text-center">
          {error || "Search for a city"}
        </p>
        <p className="text-sm text-white/50 text-center">
          {error
            ? "Please try another city"
            : "Get started by entering a city name above"}
        </p>
      </Shell>
    );
  }

  const { main, weather, wind, sys, visibility, clouds, timezone, name } =
    weatherData;
  const description = weather[0].description;

  return (
    <Shell>
      <SearchBar />

      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-sm text-white/60 font-medium">
          {name}
          {sys?.country ? `, ${sys.country}` : ""}
        </p>
        <WeatherIcon code={weather[0].id} size={140} />

        <div className="flex items-start leading-none">
          <span className="text-5xl sm:text-7xl font-bold tracking-tight">
            {main.temp.toFixed(1)}
          </span>
          <span className="text-xl sm:text-2xl font-semibold mt-1">&deg;C</span>
        </div>
        <p className="text-base sm:text-lg capitalize font-medium text-white/80 mt-1 text-center">
          {description}
        </p>
        <p className="text-xs text-white/40">
          H: {main.temp_max.toFixed(0)}&deg; &nbsp;·&nbsp; L:{" "}
          {main.temp_min.toFixed(0)}&deg;
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-2 pt-4 border-t border-white/20 w-full">
        <StateCard
          icon={<Thermometer size={18} strokeWidth={2} />}
          value={`${main.feels_like.toFixed(1)}\u00b0`}
          label="Feels like"
        />
        <StateCard
          icon={<Droplets size={18} strokeWidth={2} />}
          value={`${main.humidity}%`}
          label="Humidity"
        />
        <StateCard
          icon={
            <Wind
              size={18}
              strokeWidth={2}
              style={{ transform: `rotate(${wind.deg}deg)` }}
            />
          }
          value={`${wind.speed} m/s`}
          label={windDirection(wind.deg)}
        />
        <StateCard
          icon={<Gauge size={18} strokeWidth={2} />}
          value={`${main.pressure}`}
          label="Pressure hPa"
        />
        <StateCard
          icon={<Eye size={18} strokeWidth={2} />}
          value={`${(visibility / 1000).toFixed(1)} km`}
          label="Visibility"
        />
        <StateCard
          icon={<Cloud size={18} strokeWidth={2} />}
          value={`${clouds.all}%`}
          label="Cloud cover"
        />
        <StateCard
          icon={<Sunrise size={18} strokeWidth={2} />}
          value={formatTime(sys.sunrise, timezone)}
          label="Sunrise"
        />
        <StateCard
          icon={<Sunset size={18} strokeWidth={2} />}
          value={formatTime(sys.sunset, timezone)}
          label="Sunset"
        />
      </div>
    </Shell>
  );
}
