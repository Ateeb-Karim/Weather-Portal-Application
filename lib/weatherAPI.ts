const key = process.env.WEATHER_API_KEY;

export async function getData(city: string) {
  const resp = await fetch(
    `https://api.weatherstack.com/current?access_key=${key}&query=${city}`,
  );
  const data = await resp.json();
  console.log("data", data);
  return data;
}
