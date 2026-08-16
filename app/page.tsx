import SearchBar from "@/components/SearchBar";

export default async function Home() {
  return (
    <div className="flex gap-2 items-center justify-center flex-col border-gray-700 rounded-lg shadow-xl backdrop-blur-md p-5">
      <SearchBar />
    </div>
  );
}
