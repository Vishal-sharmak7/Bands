import { Bands } from "../models/bands.js";

export const bands = async (req, res) => {
  try {
    const bandsbrowse = await Bands.find({});
    return res.status(200).json({ bands: bandsbrowse, status: true });
  } catch (error) {
    return res.status(500).json({ msg: error.message, status: false });
  }
};
