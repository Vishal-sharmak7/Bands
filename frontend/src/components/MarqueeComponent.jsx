import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import load from "../assets/loading.gif";
import axios from "axios";

const MarqueeComponent = () => {
  const [song, setSong] = useState([]);
  const [loading, setloading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full mt-10">
        <img src={load} alt="Loading" className="w-32 h-auto" />
      </div>
    );
  }

  return (
    <>
      
      <Marquee gradient={true}  speed={50} pauseOnHover >
        {song.map((songs, idx) => (
          <div
            key={idx}
            className="w-48 mx-4 flex-shrink-0 rounded overflow-hidden mt-5 "
          >
            <div className="p-2 flex flex-col items-center">
             <a href={songs.link}>
               <img
                src={songs.image}
                alt={`Song ${idx}`}
                
                className="h-40 w-40 object-cover rounded-md"
              />
             </a>
             <p className="italic p-4 font-light text-center">{songs.name}</p>
            </div>
          </div>
        ))}
      </Marquee>

  
    </>
  );
};

export default MarqueeComponent;
