import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAddress } from "../../Context/AddressContext";
import { addressInputContext } from "../../Context/Address.input.context";
import toast from "react-hot-toast";

const Cart = () => {
  const { formData, handleChange, handleSubmit } =
    useContext(addressInputContext);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { address } = useAddress();

  const userId = localStorage.getItem("userId");

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_URL}cart/${userId}`
      );
      setCart(res.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    await axios.put(`${import.meta.env.VITE_REACT_URL}cart/update`, {
      userId,
      productId,
      quantity,
    });
    fetchCart();
  };

  const handleRemoveItem = async (productId) => {
    const productRemove = await axios.delete(
      `${import.meta.env.VITE_REACT_URL}cart/remove`,
      {
        data: { userId, productId },
      }
    );
    if (productRemove) {
      toast.success("Item Removed");
    }
    fetchCart();
  };

  const handleClearCart = async () => {
    const cartRemove = await axios.delete(
      `${import.meta.env.VITE_REACT_URL}cart/delete/${userId}`
    );
    if (cartRemove) {
      toast.success("Cart Removed");
    }
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="p-4">Loading cart...</div>;

  //check cart empty or not
  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">Your cart is empty 🛒</div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      <ul className="space-y-4">
        {cart.items.map((item) => (
          <li
            key={item.product._id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-sm text-gray-600">
                  ₹{item.product.price} x {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-200 px-2 rounded"
                onClick={() =>
                  handleUpdateQuantity(item.product._id, item.quantity - 1)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="bg-gray-200 px-2 rounded"
                onClick={() =>
                  handleUpdateQuantity(item.product._id, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                className="ml-4 text-red-600 text-3xl"
                onClick={() => handleRemoveItem(item.product._id)}
              >
                ⨯
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div>
        {address ? (
          <div className="mt-10 p-4 rounded mb-4">
            <h3 className="text-lg font-semibold mb-2">📍 Delivery Address</h3>
            <p>
              {address.houseNo}, {address.street}
            </p>
            <p>
              {address.city}, {address.state} - {address.postalCode}
            </p>
            <p>{address.country}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className=" rounded-2xl flex flex-col p-10 md:p-20 items-center justify-center mt-6  w-full max-w-5xl mx-auto"
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
      </div>

      <div className="mt-6 text-right">
        <p className="text-lg font-bold">
          Total: ₹
          {cart.items.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )}
        </p>
        <button
          onClick={handleClearCart}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Clear Cart
        </button>
      </div>

      <div>
        <button
          onClick={handleClearCart}
          className="mt-2 bg-red-600 w-full text-white px-4 py-2 rounded hover:bg-green-600 transition ease-in"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
