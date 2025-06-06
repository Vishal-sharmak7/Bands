import instance from "../config/razorpay.js";

const ProductOrder = async (req, res) => {
  try {
    const { price, productId } = req.body;

    if (!price || !productId) {
      return res.status(400).json({ error: "Missing price or productId" });
    }

    const options = {
      amount: price *100, // Razorpay uses paisa
      currency: "INR",
      receipt: `receipt_order_${productId}`,
      notes: {
        productId,
      },
    };

    const order = await instance.orders.create(options);
    console.log("✅ Razorpay Order:", order); // DEBUGGING

    res.status(200).json(order);
  } catch (err) {
    console.error("❌ Razorpay Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export default ProductOrder;
