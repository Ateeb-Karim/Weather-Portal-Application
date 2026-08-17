"use client";

import { useWeather } from "@/context/WeatherContext";
import { Search } from "lucide-react";
import React, { useState } from "react";

export default function SearchBar() {
  const [text, setText] = useState<string>("");

  const { handleSearch } = useWeather();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    handleSearch(text);
    setText("");
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 sm:gap-3 items-center justify-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-2xl p-2 sm:p-3 w-full"
      >
        <input
          type="text"
          placeholder="Enter city name"
          className="flex-1 min-w-0 px-4 sm:px-6 py-1.5 sm:py-4 bg-transparent outline-none text-white placeholder-white/60 text-base sm:text-xl rounded-full ring-1 ring-white/40 transition-all capitalize tracking-wider focus:ring-offset-1"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          type="submit"
          className="shrink-0 bg-white/10 hover:bg-white/20 border border-white/20 text-white h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center cursor-pointer rounded-full backdrop-blur-md transition-all active:scale-95"
        >
          <Search size={18} strokeWidth={2.5} className="sm:hidden" />
          <Search size={22} strokeWidth={2.5} className="hidden sm:block" />
        </button>
      </form>
    </div>
  );
}
