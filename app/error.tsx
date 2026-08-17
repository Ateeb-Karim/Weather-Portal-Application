"use client";

import { useWeather } from "@/context/WeatherContext";
import Image from "next/image";

export default function Error() {
  const { error } = useWeather();

  return (
    <>
      <Image
        src="/images/404.png"
        alt="Not found"
        width={120}
        height={120}
        className="drop-shadow-lg w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36"
      />
      <p className="text-sm sm:text-lg capitalize font-medium text-white/80 mt-1 text-center">
        {error || "Search for a city"}
      </p>
      <p className="text-xs sm:text-sm text-white/50 text-center px-2">
        {error
          ? "Please try another city"
          : "Get started by entering a city name above"}
      </p>
    </>
  );
}
