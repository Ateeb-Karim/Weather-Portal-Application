"use client";

import SearchBar from "@/components/SearchBar";
import { useWeather } from "@/context/WeatherContext";
import Image from "next/image";

export default function Error() {
  const { error } = useWeather();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6">
      <div className="relative z-10 flex gap-5 items-center justify-center flex-col shadow-2xl p-6 sm:p-8 backdrop-blur-md bg-white/10 border-2 border-white/40 rounded-3xl w-full max-w-sm sm:max-w-md text-white animate-[fadeIn_0.4s_ease-out]">
        <SearchBar />
        <Image
          src="/images/404.png"
          alt="weather image"
          width={120}
          height={120}
          className="drop-shadow-lg w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36"
          loading="eager"
        />
        <p className="text-base sm:text-lg capitalize font-medium text-white/80 mt-1 text-center">
          {error || "Search for a city"}
        </p>
        <p className="text-sm text-white/50 text-center">
          {error
            ? "Please try another city"
            : "Get started by entering a city name above"}
        </p>
      </div>
    </div>
  );
}
