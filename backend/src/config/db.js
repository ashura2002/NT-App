import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongoDb connect successfull')
  } catch (error) {
    console.log("Connection failed!");
    process.exit(1);
  }
};

export default connect;
