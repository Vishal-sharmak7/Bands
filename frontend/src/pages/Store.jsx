import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Store = () => {
  const [merch, setMerch] = useState([]);
  const navigate = useNavigate();

 const userId = localStorage.getItem("userId")

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_URL}merch`)
      .then((res) => {
        setMerch(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_URL}add`, {
        userId,
        productId,
        quantity: 1,
      });
      toast.success("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

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
                onClick={() => navigate("/merchBook", { state: { merchs } })}
                src={merchs.image}
                alt=""
                className="h-100 w-100 object-cover mb-4 rounded cursor-pointer"
              />

              <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                {merchs.title}
              </h5>

              <p className="mb-4 text-gray-700 font-semibold">
                Price: ₹{merchs.price}
              </p>

              <button
                onClick={() => handleAddToCart(merchs._id)}
                className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Store;
