import instance from "../config/razorpay.js";

const ProductOrder = async (req, res) => {
  try {
    const { price, productIds } = req.body;

    // Validation
    if (!price || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: "Missing or invalid price/productIds" });
    }

    // generate unique receipt

    const receiptId = `receipt_order_${Date.now()}`; 

    const options = {
      amount: price * 100, // Razorpay expects paise
      currency: "INR",
      receipt: receiptId,
      notes: {
        productIds: JSON.stringify(productIds), // Save safely in string form
      },
    };

    const order = await instance.orders.create(options);
    console.log("Razorpay Order:", order);

    res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay Error:", err.message);
    res.status(500).json({ error: "Server error creating Razorpay order" });
  }
};

export default ProductOrder;
