import fs from "fs";
import path from "path";
import { Request, Response } from "express";

import logger from "../utils/Logger";
import {
  createDogRecord,
  deleteDogRecordById,
  getDogs,
  getDogById,
} from "../services/petService";

export const getDogList = async (req: Request, res: Response) => {
  try {
    const pets = await getDogs();

    const petsData = await Promise.all(
      pets.map(async (pet) => {
        const petData = pet.toObject();
        const imageFolder = path.join(__dirname, "..", "uploads");
        const imageBase64 =
          pet.dogImage &&
          (await fs.promises.readFile(imageFolder + `/${pet.dogImage}`));
        if (imageBase64) {
          petData.dogImage = imageBase64.toString("base64");
        }
        return petData;
      })
    );

    return res.status(200).json({ success: true, petsData });
  } catch (error) {
    logger.error(error, "get dog list error: ");
    return res.sendStatus(500);
  }
};

export const createNewDog = async (req: Request, res: Response) => {
  try {
    const { name, description, age, location, color, breed, petImage } =
      req.body;
    const user = req.body.user;

    const pet = await createDogRecord({
      name,
      description,
      age,
      location,
      color,
      breed,
      petImage,
      handleBy: user?._id,
    });

    return res.status(200).json({ success: true, pet });
  } catch (error) {
    logger.error(error, "create new dog record error: ");
    return res.sendStatus(500);
  }
};

export const getDogDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const pet = await getDogById(id);

    if (pet) {
      const imageFolder = path.join(__dirname, "..", "uploads");
      const imageBase64 =
        pet.dogImage &&
        (await fs.promises.readFile(imageFolder + `/${pet.dogImage}`));
      if (imageBase64) {
        pet.dogImage = imageBase64.toString("base64");
      }
      return res.status(200).json({ success: true, pet });
    } else return res.status(400).json({ message: "Dog record not found!" });
  } catch (error) {
    logger.error(error, "dog detail error: ");
    return res.sendStatus(500);
  }
};

export const updateDogRecord = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, description, age, location, color, breed, petImage } =
      req.body;

    const pet = await getDogById(id);
    if (!pet) return res.status(400).json({ message: "Pet not found!" });

    if (name) pet.name = name;
    if (description) pet.description = description;
    if (age) pet.age = age;
    if (location) pet.location = location;
    if (color) pet.color = color;
    if (breed) pet.breed = breed;
    if (petImage) pet.dogImage = petImage;

    await pet.save();
    return res.status(200).json({ success: true, pet });
  } catch (error) {
    logger.error(error, "create new dog record error: ");
    return res.sendStatus(500);
  }
};

export const deleteDogRecord = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deletedDog = await deleteDogRecordById(id);

    return res.status(200).json({ success: true, deletedDog });
  } catch (error) {
    logger.error(error, "delete dog record error: ");
    return res.sendStatus(500);
  }
};
