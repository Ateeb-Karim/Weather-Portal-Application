"use client";

import { useWeather } from "@/context/WeatherContext";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [text, setText] = useState<string>("");

  const { handleSearch } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSearch(text);
    setText("");

    console.log("handle submit", text);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 items-center justify-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-2xl p-3"
      >
        <input
          type="text"
          placeholder="Enter city name"
          className="px-6 py-4 bg-transparent outline-none text-white placeholder-white/60 text-xl w-80 rounded-full ring-1 ring-white/40 transition-all capitalize tracking-wider focus:ring-offset-1"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white h-12 w-12 flex items-center justify-center cursor-pointer rounded-full backdrop-blur-md transition-all active:scale-95"
        >
          <Search size={22} strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
}
