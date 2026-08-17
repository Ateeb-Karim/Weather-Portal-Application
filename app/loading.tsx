import SearchBar from "@/components/SearchBar";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6">
      <div className="flex gap-5 items-center justify-center flex-col shadow-2xl p-6 sm:p-8 backdrop-blur-md bg-white/10 border-2 border-white/40 rounded-3xl w-full max-w-sm sm:max-w-md text-white">
        <SearchBar />

        <div className="flex flex-col items-center gap-3 py-6">
          <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
          <p className="text-sm text-white/60">Fetching weather...</p>
        </div>
      </div>
    </div>
  );
}
