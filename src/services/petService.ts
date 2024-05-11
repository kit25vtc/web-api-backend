import { DogModel } from "../models/dog";
import logger from "../utils/Logger";

// get dog list
export const getDogs = () => DogModel.find();

// get dog by id
export const getDogById = (id: string) => DogModel.findById(id);

// create new dog record
export const createDogRecord = async (values: Record<string, any>) => {
  try {
    const dog = await new DogModel(values).save();
    return dog.toObject();
  } catch (error) {
    logger.error(error, "create dog record service error: ");
  }
};

// delete dog record by id
export const deleteDogRecordById = (id: string) =>
  DogModel.findOneAndDelete({ _id: id });
