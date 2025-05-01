import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const MerchBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const merch = location.state?.merchs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePurchase = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        item: merch.title,
        price: merch.price,
      };

      await axios.post(`${import.meta.env.VITE_REACT_URL}merchInfo`, payload);

      alert(`Thank you for purchasing ${merch.title}!`);
      navigate("/store");
    } catch (err) {
      console.error("Error submitting purchase:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!merch) {
    return <div className="text-center mt-20">No product details found.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col sm:flex-row  ">
        <div className="p-6 sm:w-1/2 flex flex-col items-center text-center">
          <img
            src={merch.image}
            alt={merch.title}
            className="rounded-lg w-60 h-60 object-cover mb-6"
          />
          <h2 className="text-xl font-bold mb-4">{merch.title}</h2>
          <p className="text-gray-700 mb-2">{merch.description}</p>
          <p className="text-lg font-semibold text-red-600 mb-6">
            Price: {merch.price}
          </p>
        </div>

        <form onSubmit={handlePurchase} className="p-6 space-y-4 sm:w-1/2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-transform hover:scale-105"
          >
            Confirm Purchase : {merch.price}
          </button>

          <button
            type="button"
            onClick={() => navigate("/store")}
            className="w-full mt-2 text-red-600 border border-red-600 py-2 rounded-lg hover:bg-red-100"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default MerchBook;
