import mongoose from "mongoose";

const MyFavoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    dogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dog",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const MyFavoriteModel = mongoose.model("MyFavorite", MyFavoriteSchema);
