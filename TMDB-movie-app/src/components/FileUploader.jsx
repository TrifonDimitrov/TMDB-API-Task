import React from "react";

export default function FileUpload({ onMoviesLoaded }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result
        .split(/\r?\n/)
        .map((x) => x.trim())
        .filter(Boolean);
      onMoviesLoaded(lines);
    };
    reader.readAsText(file);
  };

  return (
    <form className="bg-white/90 bg-gray-100 border border-gray-200 shadow-xl rounded-2xl  w-full max-w-2xl mx-auto  ">
      <div className="p-6">
        <label className="block mb-2 text-center font-semibold text-gray-700">
          Upload your movie list
        </label>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="block w-full text-sm border border-gray-300 rounded-lg p-1 m-3 focus:ring-blue-600 focus:border-blue-500 text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-100 file:text-violet-700
      hover:file:bg-violet-200 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500
             transition "
        />
      </div>
    </form>
  );
}
