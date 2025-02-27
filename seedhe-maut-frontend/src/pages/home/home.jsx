import React, { useEffect, useState } from "react";
import "../home/Home.css";
import { getBands } from "../../services/bandservice.js";

const Home = () => {
  const [bandArray, setBandArray] = useState([]);

  useEffect(() => {
    const fetchBands = async () => {
      try {
        console.log("Before fetching:", bandArray); // Logs initial empty array
        const response = await getBands();
        console.log(response, "API Response");

        if (response.status) {
          setBandArray(response.bands); // State update is scheduled
        } else {
          console.error("Error fetching bands:", response.msg);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBands();
  }, []); // Runs only once when the component mounts

  // Use another useEffect to track changes to bandArray
  useEffect(() => {
    console.log("Updated bandArray:", bandArray); // Logs updated state
  }, [bandArray]); // Runs whenever bandArray changes

  return (
    <div>
      <div className="hello">HELLO USER</div>

      <ul>
        {bandArray.map((band) => (
          <li key={band.id}>{band.name}</li> // Display band names
        ))}
      </ul>

      <div className="parent">
        <div className="div1">1</div>
        <div className="div2">2</div>
        <div className="div3">3</div>
      </div>

      {/* Displaying fetched bands */}
      <div>
        <h2>Band List</h2>
        <ul>
          {bandArray.map((band, index) => (
            <li key={index}>{band.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
