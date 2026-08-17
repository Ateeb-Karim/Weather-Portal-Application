"use client";

import { createContext, useContext, useState } from "react";
import { WeatherDataType } from "@/types/weatherTypes";

export const WeatherContext = createContext<{
  weatherData: WeatherDataType;
  error: string | null;
  loading: boolean;
  handleSearch: (city: string) => void;
  city: string;
}>({
  weatherData: {} as WeatherDataType,
  error: null,
  loading: false,
  city: "",

  handleSearch: () => {},
});

export default function WeatherContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [weatherData, setWeatherData] = useState<WeatherDataType>(
    {} as WeatherDataType,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");

  const handleSearch = async (city: string) => {
    try {
      if (!city) return;
      setLoading(true);
      setError(null);

      const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`,
        {
          headers: {
            Authorization: `Bearer ${key}`,
            Application: "application/json",
          },
          next: {
            revalidate: 300,
          },
        },
      ).then((response) => response.json());

      console.log("search handle", city, data);
      if (data.cod !== "200") {
        return setError(data.message || "something went wrong");
      }

      setWeatherData(data);
      setCity(city);
    } catch (err) {
      if (err instanceof Error) {
        return setError(err.message);
      }
      return setError("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <WeatherContext.Provider
      value={{ weatherData, error, loading, city, handleSearch }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);

  if (!context) throw new Error("must be used inside weather context provider");

  return context;
}
