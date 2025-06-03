import React from "react";

export default function MovieList({ movies, selected, setSelected, onSearch }) {
  const toggle = (title) => {
    setSelected((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  return (
    <div className="flex justify-center  ">
      <div className=" bg-white/80 border border-gray-300 bg-gray-100 shadow-lg rounded-2xl p-6 w-full max-w-md">
        <ul className="mb-6">
          {movies.map((title) => (
            <li
              key={title}
              className="flex items-center bg-sky-100 rounded-full px-4 py-2 shadow border m-0.5 cursor-pointer hover:scale-105"
              onClick={() => toggle(title)}
            >
              <input
                type="checkbox"
                checked={!!selected[title]}
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggle(title)}
                className=" accent-blue-600 mr-4 w-4 h-4 rounded hover:scale-110 cursor-pointer"
              />
              <span className="text-base text-gray-700">{title}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            className="bg-blue-600 flex-none w-1/2 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
            onClick={onSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
