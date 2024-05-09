import mongoose from "mongoose";
import logger from "./Logger";

/**
 * connect Mongo Database
 */
async function DBconnect() {
  const MongoUri = process.env.MONGO_URI!;

  try {
    await mongoose.connect(MongoUri);
    logger.info("MongoDB has connected");
  } catch (error) {
    logger.error(error, "Can not connect to database: ");
  }
}

export default DBconnect;
