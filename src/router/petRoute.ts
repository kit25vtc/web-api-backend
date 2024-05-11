import express from "express";

import {
  createNewDog,
  deleteDogRecord,
  getDogDetail,
  getDogList,
  updateDogRecord,
} from "../controllers/petController";
import upload from "../middlewares/fileUpload";
import { authorization } from "../middlewares/authorization";

export default (router: express.Router) => {
  /**
   * @openapi
   * '/dogs':
   *  get:
   *     tags:
   *     - Pets
   *     summary: Get all dog list
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
   *                  petsData:
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
   *      400:
   *        description: Bad request
   *      500:
   *        description: System error
   */
  router.get("/dogs", getDogList);

  /**
   * @openapi
   * '/dog':
   *  post:
   *     tags:
   *     - Pets
   *     summary: Create a dog data
   *     requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *              type: object
   *              required:
   *                  - name
   *              properties:
   *                  name:
   *                      type: string
   *                      default: Cat name
   *                  age:
   *                      type: number
   *                      default: 3
   *                  color:
   *                      type: string
   *                      default: White
   *                  breed:
   *                      type: string
   *                      default: Cat breed
   *                  location:
   *                      type: string
   *                      default: SSP
   *                  petPhoto:
   *                      type: image
   *                      default: pet_image.jpeg
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
   *                  pet:
   *                      type: object
   *                      properties:
   *                          _id:
   *                              type: string
   *                          name:
   *                              type: string
   *                          age:
   *                              type: string
   *                          location:
   *                              type: string
   *                          breed:
   *                              type: string
   *                          color:
   *                              type: string
   *                          dogImage:
   *                              type: string
   *                          isAdopted:
   *                              type: string
   *                          createdAt:
   *                              type: string
   *                          updatedAt:
   *                              type: string
   *      401:
   *        description: UnAuthentication
   *      400:
   *        description: Bad request
   *      500:
   *        description: System error
   */
  router.post("/dog", upload.single("dogPhoto"), authorization, createNewDog);

  /**
   * @openapi
   * '/dog/{dogId}':
   *  get:
   *     tags:
   *     - Pets
   *     summary: Get a single dog data by the dogId
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
   *                  pet:
   *                      type: object
   *                      properties:
   *                          _id:
   *                              type: string
   *                          name:
   *                              type: string
   *                          age:
   *                              type: string
   *                          location:
   *                              type: string
   *                          breed:
   *                              type: string
   *                          color:
   *                              type: string
   *                          dogImage:
   *                              type: string
   *                          isAdopted:
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
  router.get("/dog/:id", getDogDetail);

  /**
   * @openapi
   * '/dog/{dogId}':
   *  put:
   *     tags:
   *     - Pets
   *     summary: Update a single pet data by the petId
   *     parameters:
   *      - name: petId
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
  router.put(
    "/dog/:id",
    upload.single("dogPhoto"),
    authorization,
    updateDogRecord
  );

  /**
   * @openapi
   * '/dog/{dogId}':
   *  delete:
   *     tags:
   *     - Pets
   *     summary: Delete a single dag data by the dogId
   *     security:
   *      - bearerAuth: []
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
  router.delete("/dog/:id", authorization, deleteDogRecord);
};
