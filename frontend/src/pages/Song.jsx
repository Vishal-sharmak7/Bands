import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import load from "../assets/loading.gif";
import { FaArrowRight, FaArrowLeft  } from "react-icons/fa";

const Song = () => {
  const [song, setSong] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setloading(true);
    axios
      .get(`${import.meta.env.VITE_REACT_URL}songs`)
      .then((res) => {
        setSong(res.data);
      })
      .catch((err) => {
        console.log("error fetching data", err);
      })
      
      .finally(() => {
        setloading(false);
      });
  }, []);

  // Calculate pagination range
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSongs = song.slice(startIndex, endIndex);

  const totalPages = Math.ceil(song.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full mt-10">
        <img src={load} alt="Loading" className="w-120 h-auto" />
      </div>
    );
  }

  return (
    <>
      <div className="text-center font-bold text-6xl mt-6">
        <h1>SONGS</h1>
      </div>

      {/* Song Cards */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {paginatedSongs.map((songs, idx) => (
          <div
            key={idx}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-75 h-110"
          >
            <div className="p-5 flex flex-col items-center">
              <img
                src={songs.image}
                alt=""
                className="h-75 w-75 object-cover mb-4 rounded"
              />

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                {songs.name}
              </h1>
              <a href={songs.link} target="_blank" rel="noopener noreferrer">
                <Button />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {song.length > itemsPerPage && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
          >
            <FaArrowLeft/>
          </button>

          <span className="text-xl font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : prev
              )
            }
            disabled={currentPage === totalPages}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
          >
            <FaArrowRight/>
          </button>
        </div>
      )}
    </>
  );
};

export default Song;
