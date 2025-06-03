import React from "react";
import { Trash2 } from "lucide-react";

export default function MovieCardsPreview({ movies, onRemove }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4 mt-4 pb-2">
      {movies.map((movie, idx) => (
        <div
          key={movie.tmdbId}
          className="bg-white rounded-2xl shadow p-4 flex  min-w-[380px] md:min-w-[440px] max-w-xl w-full"
        >
          {movie.poster && (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-32 rounded-xl mr-4"
            />
          )}
          <div className="flex-1 relative">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{movie.title}</h3>
              </div>
              <p className="text-sm mb-1">{movie.overview}</p>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-bold">Genres:</span>{" "}
                {movie.genres.join(", ")}
              </div>
              <div className="text-sm mb-1">
                <span className="font-bold">Actors:</span>{" "}
                {movie.actors.join(", ")}
              </div>
              <div className="text-sm mb-1">
                <span className="font-bold">Director:</span>: {movie.director}
              </div>
              <div className="text-sm mb-1">
                <span className="font-bold">Release:</span> {movie.release}
              </div>
              <div className="text-sm mb-1">
                <span className="font-bold">Rating:</span> {movie.rating}
              </div>
              <div className="text-sm mb-1">
                <span className="font-bold">Duration:</span>
                {movie.duration} min
              </div>
              {movie.trailer && (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-red-600 underline text-md"
                >
                  Watch Trailer
                </a>
              )}
            </div>
            <button
              onClick={() => onRemove(idx)}
              className="absolute bottom-0 right-0 text-red-400 hover:text-red-600 mb-2 mr-2"
              title="Remove"
            >
              <Trash2 size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
