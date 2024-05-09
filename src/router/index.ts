import express, { Response } from "express";

import authRoute from "./authRoute";

const router = express.Router();
export default (): express.Router => {
  /**
   * server status checking
   */
  router.get("/status", (_, res: Response) => {
    res.sendStatus(200);
  });

  /**
   * user authorization route
   */
  authRoute(router);

  return router;
};
