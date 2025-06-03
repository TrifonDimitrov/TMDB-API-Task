const TMDB_API_KEY = "65a747d2b7573562c3ac9ee56b0e8118";

export async function fetchMovieByTitle(title, apiKey = TMDB_API_KEY) {
  const results = await searchMoviesByTitle(title, apiKey);
  if (!results.length) return null;

  const details = await fetchMovieDetailsById(results[0].id, apiKey);

  return formatMovieData(results[0], details);
}

export async function searchMoviesByTitle(title, apiKey = TMDB_API_KEY) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      title
    )}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchMovieDetailsById(movieId, apiKey = TMDB_API_KEY) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,videos`
  );
  return res.json();
}

export function formatMovieData(tmdbMovie, details) {
  const actors = details.credits?.cast?.slice(0, 4).map((a) => a.name) || [];
  const directorObj = details.credits?.crew?.find((c) => c.job === "Director");
  const director = directorObj ? directorObj.name : "";
  const trailerObj = details.videos?.results?.find((v) => v.type === "Trailer");
  const trailer = trailerObj
    ? `https://www.youtube.com/watch?v=${trailerObj.key}`
    : "";

  return {
    tmdbId: tmdbMovie.id,
    title: tmdbMovie.title,
    overview: tmdbMovie.overview,
    actors,
    genres: details.genres?.map((g) => g.name) || [],
    poster: details.poster_path
      ? `https://image.tmdb.org/t/p/w200${details.poster_path}`
      : "",
    release: tmdbMovie.release_date,
    rating: tmdbMovie.vote_average,
    trailer,
    director,
    duration: details.runtime,
  };
}

export function getAllGenres(movies) {
  return Array.from(new Set(movies.flatMap((m) => m.genres))).sort();
}

export async function saveMovies(data) {
  await fetch("http://example.com/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
