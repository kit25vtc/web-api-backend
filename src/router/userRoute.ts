import express from "express";
import { authorization } from "../middlewares/authorization";
import {
  getFavoriteList,
  addDogToFavoriteList,
  removeDogFromFavoriteList,
} from "../controllers/userController";

export default (router: express.Router) => {
  /**
   * @openapi
   * '/user/myFavorites':
   *  get:
   *     tags:
   *     - My favorite list
   *     summary: Get my favorite dog list
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
   *                  myFavoriteList:
   *                      type: array
   *                      items:
   *                          type: object
   *                          properties:
   *                              _id:
   *                                  type: string
   *                              name:
   *                                  type: string
   *                              age:
   *                                  type: string
   *                              location:
   *                                  type: string
   *                              breed:
   *                                  type: string
   *                              color:
   *                                  type: string
   *                              dogImage:
   *                                  type: string
   *                              isAdopted:
   *                                  type: string
   *                              createdAt:
   *                                  type: string
   *                              updatedAt:
   *                                  type: string
   *      401:
   *        description: UnAuthentication
   *      400:
   *        description: Bad request
   *      500:
   *        description: System error
   */
  router.get("/user/myFavorites", authorization, getFavoriteList);

  /**
   * @openapi
   * '/user/myFavorites/{dogId}':
   *  put:
   *     tags:
   *     - My favorite list
   *     summary: Add a dog to my favorite list
   *     parameters:
   *      - name: dogId
   *        in: path
   *        description: The id of the dog
   *        required: true
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
   *      401:
   *        description: UnAuthentication
   *      400:
   *        description: Bad request
   *      500:
   *        description: System error
   */
  router.put("/user/myFavorites/:id", authorization, addDogToFavoriteList);

  /**
   * @openapi
   * '/user/myFavorites/{userId}':
   *  delete:
   *     tags:
   *     - My favorite list
   *     summary: Remove a dog from my favorite list
   *     parameters:
   *      - name: dogId
   *        in: path
   *        description: The id of the dog
   *        required: true
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
   *      401:
   *        description: UnAuthentication
   *      400:
   *        description: Bad request
   *      500:
   *        description: System error
   */
  router.delete(
    "/user/myFavorites/:id",
    authorization,
    removeDogFromFavoriteList
  );
};
