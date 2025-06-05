import { Address } from "../models/address.user.model.js";

const handleAddress = async (req, res) => {
  try {
    const { userId, houseNo, street, city, state, postalCode, country } =
      req.body;

    const existing = await Address.findOne({ userId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Address already exists for this user" });
    }

    const newAddress = new Address({
      userId,
      houseNo,
      street,
      city,
      state,
      postalCode,
      country,
    });

    await newAddress.save();

    res
      .status(201)
      .json({ message: "Address saved successfully", address: newAddress });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const handleGetAddress = async (req, res) => {
  try {
    const { userId } = req.params; 

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const address = await Address.findOne({ userId });

    if (!address) {
      return res
        .status(404)
        .json({ message: "Address not found for this user" });
    }

    res.status(200).json({ address });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const handleupdate = async (req, res) =>{
   try {
    const { userId, houseNo, street, city, state, postalCode, country } =
      req.body;

      if (!userId) {
         return res.status(400).json("userId required")
      }

      const updateAddress = await Address.findOneAndUpdate(
        {userId},
        {houseNo, street, city, state, postalCode, country},
        { new: true, runValidators: true }
      )

        if (!updateAddress) {
           res.status(400).json("address not found ")
        }
        res.status(200).json({message:"address Updated ", address: updateAddress})
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
}

export default { handleAddress, handleGetAddress , handleupdate };
