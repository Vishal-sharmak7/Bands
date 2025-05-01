import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MerchBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const merch = location.state?.merchs;

  const handlePurchase = (e) => {
    e.preventDefault();
    alert(`Thank you for purchasing ${merch.title}!`);
    navigate('/store');
  };

  if (!merch) {
    return <div className="text-center mt-20">No product details found.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4  bg-gray-100">

      <div className='flex align-center justify-center'>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-100">
        <img src={merch.image} alt={merch.title} className="rounded-lg w-full h-60 object-fit mb-6 " />
        <h2 className="text-xl font-bold text-center mb-4">{merch.title}</h2>
        <p className="text-gray-700 mb-2">{merch.description}</p>
        <p className="text-lg font-semibold text-red-600 mb-6">Price: {merch.price}</p>
      </div>

        <form onSubmit={handlePurchase} className="space-y-4 m-14">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Shipping Address"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-transform hover:scale-105"
          >
            Confirm Purchase : Price {merch.price}
          </button>

          <button
          onClick={() => navigate('/store')}
          className="mt-4 w-full  text-red-600 border border-red-600 py-2 rounded-lg hover:bg-red-100"
        >
          Cancel
        </button>
        </form>

       
      </div>
    </div>
  );
};

export default MerchBook;
