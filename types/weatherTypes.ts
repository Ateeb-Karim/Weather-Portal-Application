// src/types/weatherTypes.ts

export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
};

export type WindData = {
  speed: number;
  deg: number;
  gust?: number;
};

export type CloudsData = {
  all: number;
};

export type RainData = {
  "1h"?: number;
  "3h"?: number;
};

export type SnowData = {
  "1h"?: number;
  "3h"?: number;
};

export type SysData = {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type CoordData = {
  lon: number;
  lat: number;
};

export type WeatherDataType = {
  coord: CoordData;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: CloudsData;
  rain?: RainData;
  snow?: SnowData;
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  message?: string;
};
