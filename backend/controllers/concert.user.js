import {concert} from "../models/user.model.js";
const concertInfo = async (req, res) => {

  console.log("HELLO")
  const data = await concert.find(req.query);
  res.status(200).json(data);
  
};

export default concertInfo;
