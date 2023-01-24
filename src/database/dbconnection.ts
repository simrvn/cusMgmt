import mongoose from "mongoose";

const connectDB = async () => {
  try{
      const connect = await mongoose.connect(process.env.MONGO_URI as string);

      console.log(`MongoDB connected : ${connect.connection.host}`);
  }catch(err){
      console.log(err);
  }
}

export {connectDB}

