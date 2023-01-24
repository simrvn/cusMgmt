import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongodb: any;

const connect = async () => {
  mongodb = await MongoMemoryServer.create();

  await mongoose.connect(mongodb.getUri() as string);
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
for (const key in collections){
  const collection = collections[key];
  await collection.deleteMany({});
}
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongodb.stop();
};

export { connect, closeDatabase, clearDatabase };
