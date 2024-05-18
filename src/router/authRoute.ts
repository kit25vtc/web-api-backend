import express from "express";

import { login, signUp, validateUser } from "../controllers/authController";
import { authorization } from "../middlewares/authorization";

export default (router: express.Router) => {
  /**
   * @openapi
   * '/auth/sign_up':
   *  post:
   *     tags:
   *     - User Authentication
   *     summary: User Sign Up
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *              type: object
   *              required:
   *                  - username
   *                  - email
   *                  - password
   *                  - role
   *              properties:
   *                  username:
   *                      type: string
   *                      default: Chan Tai Man
   *                  email:
   *                      type: string
   *                      default: example@example.com
   *                  password:
   *                      type: string
   *                      default: stringPassword123!
   *                  role:
   *                      type: string
   *                      default: user
   *                  staffCode:
   *                      type: string
   *                      default: staff_code
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  success:
   *                      type: boolean
   *                  user:
   *                      type: object
   *                      properties:
   *                          _id:
   *                              type: string
   *                          username:
   *                              type: string
   *                          email:
   *                              type: string
   *                          role:
   *                              type: string
   *                          createdAt:
   *                              type: string
   *                          updatedAt:
   *                              type: string
   *      400:
   *        description: Bad request
   *      500:
   *        description: System error
   */
  router.post("/auth/sign_up", signUp);

  /**
   * @openapi
   * '/auth/sign_in':
   *  post:
   *     tags:
   *     - User Authentication
   *     summary: User Sign In
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *              type: object
   *              required:
   *                  - email
   *                  - password
   *              properties:
   *                  email:
   *                      type: string
   *                      default: example@example.com
   *                  password:
   *                      type: string
   *                      default: stringPassword123!
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  success:
   *                      type: boolean
   *                  user:
   *                      type: object
   *                      properties:
   *                          _id:
   *                              type: string
   *                          username:
   *                              type: string
   *                          email:
   *                              type: string
   *                          role:
   *                              type: string
   *                  token:
   *                      type: string
   *      400:
   *        description: Bad request
   *      500:
   *        description: System error
   */
  router.post("/auth/sign_in", login);

  router.get("/auth/me", authorization, validateUser);
};
