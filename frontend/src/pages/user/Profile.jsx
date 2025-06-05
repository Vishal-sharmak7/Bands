import React, { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuPen } from "react-icons/lu";

import { useAddress } from "../../Context/AddressContext";
import { addressInputContext } from "../../Context/Address.input.context";
import axios from "axios";

const Profile = () => {
  const { address, setAddress } = useAddress();

  const loggedInUser = localStorage.getItem("loggedInUser");
  const { formData, handleChange, handleSubmit } =
    useContext(addressInputContext);

  const UpdateAddress = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Assuming you're storing it in localStorage

      const response = await axios.put(
        `${import.meta.env.VITE_REACT_URL}/address/update`,
        {
          userId,
          ...formData,
        }
      );

      console.log("Updated successfully:", response.data);
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Failed to update address:", error);
      alert("Update failed");
    }
  };

  return (
    <>
      <div className="text-3xl flex flex-col items-center text-center mt-6">
        <div className="text-9xl text-red-500">
          <FaRegUserCircle />
        </div>
        <span className="mt-4 font-semibold">{loggedInUser}</span>
      </div>

      {/* Show Address Info */}
      {address ? (
        <div>
          <div className="text-center mt-6 p-4 rounded-md max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">📍 Delivery Address</h3>
            <p>
              {address.houseNo}, {address.street}
            </p>
            <p>
              {address.city}, {address.state} - {address.postalCode}
            </p>
            <p>{address.country}</p>
          </div>
          <div className="text-center mt-6 p-4 rounded-md max-w-3xl mx-auto">
            <button className="bg-red-400 rounded-3xl w-10 h-10 text-center items-center cursor-pointer"
            onClick={()=>setAddress(false)}
            type="submit"
            >
              <LuPen />
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl flex flex-col p-10 md:p-20 items-center justify-center mt-6 shadow-md w-full max-w-5xl mx-auto"
        >
          <div className="text-xl font-semibold mb-10 text-center">
            Add/Update Address 🏠
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 w-full">
            <input
              type="text"
              name="houseNo"
              placeholder="House No"
              value={formData.houseNo}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 text-xl rounded-full hover:bg-red-700 transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Profile;
