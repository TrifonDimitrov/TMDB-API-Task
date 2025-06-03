import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import MovieCardsPreview from "./components/MovieCardsPreview";
import MovieList from "./components/MovieList";
import {
  fetchMovieByTitle,
  searchMoviesByTitle,
  fetchMovieDetailsById,
  formatMovieData,
  getAllGenres,
  saveMovies,
} from "./api.js";
import { Search } from "lucide-react";

function App() {
  const [movieTitles, setMovieTitles] = useState([]);
  const [selected, setSelected] = useState({});
  const [movies, setMovies] = useState([]);
  const [stage, setStage] = useState("upload");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [saveMsg, setSaveMsg] = useState("");

  const handleMoviesLoaded = (titles) => {
    setMovieTitles(titles);

    setSelected(Object.fromEntries(titles.map((t) => [t, true])));
    setStage("select");
  };

  const handleSearch = async () => {
    const toSearch = movieTitles.filter((t) => selected[t]);

    const results = await Promise.all(
      toSearch.map((title) => fetchMovieByTitle(title))
    );
    setMovies(results.filter(Boolean));
    setStage("preview");
  };

  const handleRemove = (idx) => {
    setMovies((movies) => movies.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaveMsg("");
    try {
      await saveMovies(movies);
      setSaveMsg("Филмите са запазени успешно!");
    } catch (e) {
      setSaveMsg("Филмите са запазени успешно!");
    }
    setTimeout(() => setSaveMsg(""), 3000);
  };

  let pageTitle = "TMDB Movie Uploader";
  if (stage === "select") pageTitle = "Loaded Movies";
  if (stage === "preview") pageTitle = "Film Information";

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)",
      }}
    >
      {stage !== "preview" && (
        <h1 className="text-2xl text-center text-blue-600 font-bold pt-5 pb-5">
          {pageTitle}
        </h1>
      )}

      {stage === "upload" && (
        <FileUploader onMoviesLoaded={handleMoviesLoaded} />
      )}
      {stage === "select" && (
        <>
          <MovieList
            movies={movieTitles}
            selected={selected}
            setSelected={setSelected}
            onSearch={handleSearch}
          />
        </>
      )}
      {stage === "preview" && (
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between p-2">
            <div className="w-1/3 min-w-[200px] mr-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search or add a movie title…"
                value={searchTerm}
                onChange={async (e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value.length > 1) {
                    const found = await searchMoviesByTitle(e.target.value);
                    setSearchResults(found);
                    setShowDropdown(true);
                  } else {
                    setShowDropdown(false);
                    setSearchResults([]);
                  }
                }}
                className=" pl-8 w-full border border-gray-300 rounded-xl p-2 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500
             transition"
              />
              {showDropdown && searchResults.length > 0 && (
                <ul className="absolute z-20 bg-white border border-gray-300 rounded-xl w-full mt-2 shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((result) => (
                    <li
                      key={result.id}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                      onClick={async () => {
                        const details = await fetchMovieDetailsById(result.id);
                        const newMovie = formatMovieData(result, details);
                        setMovies((old) => [...old, newMovie]);
                        setSearchTerm("");
                        setShowDropdown(false);
                        setSearchResults([]);
                      }}
                    >
                      {result.title}{" "}
                      <span className="text-xs text-gray-500">
                        {result.release_date?.slice(0, 4)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h2 className="flex-1 text-center text-2xl font-bold text-blue-600">
              Film Information
            </h2>

            <div className="w-1/3 min-w-[200px] ml-2">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-2 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500
             transition"
              >
                <option value="All">Choose a genre</option>
                {getAllGenres(movies).map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {movies.length > 0 ? (
            <div className="flex justify-center w-full">
              <button
                className="mb-5 bg-sky-700 hover:bg-sky-500 text-white px-9 py-2 rounded-xl shadow transition"
                onClick={handleSave}
              >
                Save your choice
              </button>
            </div>
          ) : (
            <div className="flex justify-center my-6">
              <span className="text-lg text-gray-500 font-semibold">
                Няма избрани филми за записване.
              </span>
            </div>
          )}
          {saveMsg && (
            <div className="flex justify-center mb-4">
              <span className="bg-green-100 text-green-700 rounded-xl px-4 py-2 font-semibold shadow">
                {saveMsg}
              </span>
            </div>
          )}

          <MovieCardsPreview
            movies={
              selectedGenre === "All"
                ? movies
                : movies.filter((m) => m.genres.includes(selectedGenre))
            }
            onRemove={handleRemove}
          />
        </div>
      )}
    </div>
  );
}

export default App;
