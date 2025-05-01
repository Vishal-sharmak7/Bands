import { Store } from "../models/merchInfo.schema.js";

const merchInfo = async (req, res)=>{
    const {item, name, email, address } = req.body;

    if (!item || !name || !email || !address) {
        return res.status(400).json({ message: "All fields are required" });
      }

      try {
            const newBooking = new Store({
               item,
               name,
               email,
               address
             });
        
            await newBooking.save();
        
            res.status(200).json(newBooking); // Send back the saved booking
          } catch (error) {
            console.error("Error while booking:", error);
            res.status(500).json({ message: "Booking failed", error });
          }
}
export default merchInfo