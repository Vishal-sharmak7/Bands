import mongoose from "mongoose";
import "dotenv/config";
const DB_NAME = "seedhemaut";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${"mongodb+srv://sarthaktyagi797:sarthak123@cluster0.t4nf1.mongodb.net"}/${DB_NAME}`
    );
    console.log(
      `\n MongoDb connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export { connectDB };
