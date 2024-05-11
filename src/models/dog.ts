import mongoose from "mongoose";

const DogSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    age: { type: Number },
    location: { type: String },
    breed: { type: String },
    color: { type: String },
    dogImage: { type: String },
    isAdopted: { type: Boolean, default: false },
    handleBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const DogModel = mongoose.model("Dog", DogSchema);
