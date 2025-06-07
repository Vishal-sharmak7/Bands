import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MerchBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const merch = location.state?.merchs;

  if (!merch) {
    return <div className="text-center mt-20">No product details found.</div>;
  }

  return (
    <div className="flex justify-center items-center mt-10 mb-40 p-4 bg-white">
  <div className="flex flex-col sm:flex-row gap-6 max-w-4xl w-full bg-gray-50 rounded-lg shadow-md p-6">
    
    {/* Image on Left */}
    <div className="flex justify-center sm:justify-start">
      <img
        src={merch.image}
        alt={merch.title}
        className="rounded-lg w-60 h-60 object-cover"
      />
    </div>

    {/* Details on Right */}
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-2">{merch.title}</h2>
      <p className="text-gray-700 mb-4">{merch.description}</p>
      <p className="text-lg font-semibold text-red-600 mb-4">
        Price: ₹{merch.price}
      </p>

      <div>
        <button  className="relative overflow-hidden rounded-md bg-red-600 px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110">
            Add to Cart
          </button>
      </div>
      
    </div>

    

  </div>
</div>

  );
};

export default MerchBook;
