"use client";

import SearchBar from "@/components/SearchBar";
import { useWeather } from "@/context/WeatherContext";
import Image from "next/image";

export default function Error() {
  const { error } = useWeather();

  return (
    <>
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
    </>
  );
}
