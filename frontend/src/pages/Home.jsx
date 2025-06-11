import React, { useEffect, useState } from "react";
import pose from "../assets/pose.png";
import Button from "../components/Button";
import MarqueeComponent from "../components/MarqueeComponent";
import uk from "../assets/uk.png";
import Music from "../components/Music";
import vid from "../assets/seedhe car sen.gif";
import { useNavigate } from "react-router-dom";
import BlurText from "../components/framer-motion/BlurText";
import Magnet from "../components/magnet/Magnet";
import CircularGallery from "../components/ogl/CircularGallery";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/concerts");
  };

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <>
      <div>
        <img
          src={uk}
          alt=""
          className="w-full h-auto max-h-[150px] sm:max-h-[200px] md:max-h-[600px]"
        />
      </div>

      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.1} />
      </div>

      <div className="text-center">
        <h2 className="font-bold text-3xl sm:text-5xl mt-10">LATEST RELEASE</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 m-5 sm:m-10 p-5 sm:p-15">
        <div className="col-span-1 sm:col-span-3 text-center order-2 sm:order-1">
          <h2 className="font-bold text-3xl sm:text-5xl mt-10">LUNCH BREAK</h2>
          <p>
            <i>Aug 19, 2023</i>
          </p>
          <p className="font-semibold mt-5  text-sm sm:text-base">
            <BlurText
              text=" Whether it’s creating a universe for their thriving ‘nation’ with their intricate story lines, or singles that effortlessly hit thecharts, Seedhe Maut has undeniably pioneered contemporary Indianhip-hop. With ‘Lunch Break’, their third mixtape they introduce acutting-edge soundscape, which flows through multiple genres butwith the Seedhe Maut spin to it. They continue to question, rebeland mostly important remain unhinged, speaking to a generation thatis burdened with a world that refuses to change."
              delay={70}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className=" italic mb-8 text-black text-center"
            />
          </p>
          <div className="mt-10">
            <a href="https://lnk.to/Lunchbreak" target="blank">
              <Button />
            </a>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 mt-5 sm:mt-0 order-1 sm:order-2">
          <Magnet padding={50} disabled={false} magnetStrength={10}>
            <img src={pose} alt="" className="w-full h-auto rounded-lg" />
          </Magnet>
        </div>
      </div>

      <div className="w-full h-[40vh] relative overflow-hidden mt-12 max-h-[150px] sm:max-h-[200px] md:max-h-[600px] mb-10">
        <img src={vid} alt="" className="w-full h-full object-cover "  />
        <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent flex items-center justify-center ">
          <div className="text-white text-4xl sm:text-6xl font-bold text-center px-6">
            UK Concerts
            <br />
            <button
              onClick={handleClick}
              className="bg-cyan-50 text-red-600 w-64 sm:w-80 rounded-2xl hover:bg-red-500 hover:text-amber-50 hover:scale-90 transition-transform h-16 sm:h-20 text-lg sm:text-2xl mt-5"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <MarqueeComponent/>
      
    </>
  );
};

export default Home;
