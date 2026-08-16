import { getData } from "@/lib/weatherAPI";

export default async function Home() {
  const data = await getData();

  console.log(data);

  return (
    <div>
      <h1>weather app</h1>
    </div>
  );
}
