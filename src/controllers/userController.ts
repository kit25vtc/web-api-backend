import { Request, Response } from "express";
import path from "path";
import fs from "fs";

import logger from "../utils/Logger";
import { getDogById } from "../services/petService";
import { getMyFavoriteList } from "../services/userService";
import { MyFavoriteModel } from "../models/myFavorite";

export const getFavoriteList = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const favoriteList = await getMyFavoriteList(user._id);
    const myList: any[] = [];
    if (favoriteList && favoriteList.dogs.length > 0) {
      await Promise.all(
        favoriteList.dogs.map(async (dogId) => {
          const dog = await getDogById(dogId.toString());

          if (dog) {
            const dogData = dog.toObject();
            const imageFolder = path.join(__dirname, "..", "uploads");
            const imageBase64 =
              dog.dogImage &&
              (await fs.promises.readFile(imageFolder + `/${dog.dogImage}`));
            if (imageBase64) {
              dogData.dogImage = imageBase64.toString("base64");
            }
            myList.push(dogData);
          }
        })
      );
    }

    return res.status(200).json({ success: true, myFavoriteList: myList });
  } catch (error) {
    logger.error(error, "get favorite dog list error: ");
    return res.sendStatus(500);
  }
};

export const addDogToFavoriteList = async (req: Request, res: Response) => {
  try {
    const dogId = req.params.id;
    const { user } = req.body;
    if (!user || !dogId)
      return res.status(400).json({ message: "Invalid user or dog info!" });

    const dog = await getDogById(dogId);
    if (!dog) return res.status(400).json({ message: "dog not found!" });

    const existFavoriteList = await getMyFavoriteList(user._id);
    if (existFavoriteList) {
      existFavoriteList.dogs = [...existFavoriteList.dogs, dog._id];
      await existFavoriteList.save();

      return res
        .status(200)
        .json({ success: true, myFavoriteList: existFavoriteList });
    } else {
      const myFavoriteList = await new MyFavoriteModel({
        user: user._id,
        dogs: [dogId],
      }).save();

      return res
        .status(200)
        .json({ success: true, myFavoriteList: myFavoriteList });
    }
  } catch (error) {
    logger.error(error, "update favorite dog list error: ");
    return res.sendStatus(500);
  }
};

export const removeDogFromFavoriteList = async (
  req: Request,
  res: Response
) => {
  try {
    const dogId = req.params.id;
    const { user } = req.body;
    if (!user || !dogId)
      return res.status(400).json({ message: "Invalid user or dog info!" });

    const dog = await getDogById(dogId);
    if (!dog) return res.status(400).json({ message: "dog not found!" });

    const existFavoriteList = await getMyFavoriteList(user._id);
    if (existFavoriteList) {
      // remove dog's id from favorite list
      const updatedDogs = existFavoriteList.dogs.filter(
        (p) => p.toString() !== dog._id.toString()
      );
      existFavoriteList.dogs = updatedDogs;
      await existFavoriteList.save();

      return res
        .status(200)
        .json({ success: true, myFavoriteList: existFavoriteList });
    } else {
      return res
        .status(400)
        .json({ message: "dog not found in your favorite list!" });
    }
  } catch (error) {
    logger.error(error, "remove dog from favorite dogs list error: ");
    return res.sendStatus(500);
  }
};
