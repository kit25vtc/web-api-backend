import express from "express";

import { login, signUp } from "../controllers/authController";

export default (router: express.Router) => {
  router.post("/auth/sign_up", signUp);
  router.post("/auth/sign_in", login);
};
