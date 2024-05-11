import { MyFavoriteModel } from "../models/myFavorite";

// get user favorite dog list
export const getMyFavoriteList = (userId: string) =>
  MyFavoriteModel.findOne({ user: userId });
