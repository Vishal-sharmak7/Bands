import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import notfound from "../assets/notfound.gif";
import load from "../assets/loading.gif";

const Store = () => {
  const [merch, setMerch] = useState([]);
  const navigate = useNavigate();
  const [filterd, setfilterd] = useState([]);
  const [searchInput, setsearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
     setLoading(true);
    axios
      .get(`${import.meta.env.VITE_REACT_URL}merch`)
      .then((res) => {
        setMerch(res.data);
        setfilterd(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
       .finally(() => {
      setLoading(false);
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

  const handlesearch = () => {
    const result = merch.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setfilterd(result);
  };

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === "" || selectedCategory === "Categories") {
      setfilterd(merch);
      return;
    }

    const result = merch.filter((item) =>
      item.title.toLowerCase().includes(selectedCategory.toLowerCase())
    );

    setfilterd(result);
  };

  const handlePricechange = (selectPrice) => {
    let sorted = [...merch];

    if (selectPrice === "All") {
      setfilterd(merch);
    } else if (selectPrice === "High to Low") {
      sorted.sort((a, b) => b.price - a.price);
      setfilterd(sorted);
    } else if (selectPrice === "Low to High") {
      sorted.sort((a, b) => a.price - b.price);
      setfilterd(sorted);
    } else if (selectPrice === "Under 1000") {
      const filtered = merch.filter((item) => item.price < 1000);
      setfilterd(filtered);
    }
  };

  if (loading) {
      return <div className="flex justify-center items-center w-full mt-10">
        <img src={load} alt="Loading" srcset="" className="w-120  h-auto" />
      </div>
  }

  return (
    <>
      <div className="mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
            placeholder="Search..."
            className="p-2 italic border rounded-2xl w-full md:w-64"
          />

          <button
            onClick={handlesearch}
            className="bg-red-600 hover:bg-red-500 text-white rounded-3xl px-4 py-2 w-full md:w-auto"
          >
            Find
          </button>

          <select
            className="p-2 border rounded-2xl w-full md:w-52"
            onChange={(e) => handlePricechange(e.target.value)}
          >
            <option className="font-semibold italic">All</option>
            <option className="font-semibold italic">High to Low</option>
            <option className="font-semibold italic">Low to High</option>
            <option className="font-semibold italic">Under 1000</option>
          </select>

          <select
            className="p-2 border rounded-2xl w-full md:w-52"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option className="font-semibold italic">Categories</option>
            <option className="font-semibold italic">NAYAAB</option>
            <option className="font-semibold italic">T-SHIRT</option>
            <option className="font-semibold italic">LUNCH BOX</option>
            <option className="font-semibold italic">LIMITED EDITION</option>
            <option className="font-semibold italic">MIXTAPE CD</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {filterd.length > 0 ? (
          filterd.map((merchs, idx) => (
            <div
              key={idx}
              className="max-w-sm bg-white border border-gray-200 rounded-lg  shadow-md overflow-hidden"
            >
              <div className="p-5 flex flex-col items-center">
                <img
                  onClick={() => navigate("/merchBook", { state: { merchs } })}
                  src={merchs.image}
                  alt=""
                  className="h-60 w-60 object-cover mb-4 rounded cursor-pointer"
                />

                <h5 className="text-2xl font-bold text-center tracking-tight text-gray-900 mb-2">
                  {merchs.title}
                </h5>

                <p className="mb-4 text-gray-700 font-semibold">
                  Price: ₹{merchs.price}
                </p>

                <button
                  onClick={() => handleAddToCart(merchs._id)}
                  className="relative overflow-hidden rounded-md bg-red-600 px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full mt-10">
            <img src={notfound} alt="Not Found" className="w-120  h-auto" />
          </div>
        )}
      </div>
    </>
  );
};

export default Store;
