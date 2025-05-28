import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Store = () => {

     const [merch, setMerch] = useState([]);
     const navigate = useNavigate();

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_REACT_URL}merch`)
      .then((res) => {
        setMerch(res.data); // res.data should be an array
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
    
      
    }, [])
    
  return (
   <>
    <div className="flex flex-wrap justify-center gap-8">
          {merch.map((merchs, idx) => (
            <div
              key={idx}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-5 flex flex-col items-center">
                <img
                  src={merchs.image}
                  alt=""
                  className="h-100 w-100 object-cover mb-4 rounded"
                />

                <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                  {merchs.title}
                </h5>

                <p className="mb-2 font-normal text-gray-700">
                     {merchs.description}
                </p>

                <p className="mb-4  text-gray-700 font-semibold">
                  Price: {merchs.price}
                </p>

                <button
                  onClick={() => navigate("/merchBook", { state: { merchs } })}
                  className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                >
                  Book Now
                </button>

                

               
              </div>
            </div>
          ))}
        </div>
   </>
  )
}

export default Store