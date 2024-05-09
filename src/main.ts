import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import logger from "./utils/Logger";
import DBconnect from "./utils/DBconnect";
const port = 8080;

dotenv.config();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/**
 * server run at port 8080
 */
app.listen(port, async () => {
  // start running
  logger.info("Server is running at http://localhost:8080/");
  // mongoDB connect
  await DBconnect();
});
