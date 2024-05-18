import { Request, Response } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

import {
  createUser,
  getUserByEmail,
  validatePassword,
} from "../services/authService";
import logger from "../utils/Logger";

dotenv.config();
const { STAFF_CODE, JWT_SECRET } = process.env;

/**
 * user register
 */
export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, staffCode } = req.body;
    if (!email || !password || !role)
      return res.status(400).json({ message: "Invalid format" });

    if (role === "staff" && staffCode !== STAFF_CODE)
      return res.status(400).json({ message: "Invalid staff code" });

    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "User exist" });

    const user = await createUser({
      username,
      email,
      password,
      role,
    });

    if (user) return res.status(200).json({ success: true, user }).end();
    else return res.status(500).json({ message: "user sign up error" });
  } catch (error) {
    logger.error(error, "user sign up error: ");
    return res.sendStatus(500);
  }
};

/**
 * user login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Invalid format" });

    const user = await validatePassword(email, password);
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    /**
     * generate jwt token with expired in 7 days
     */
    const token = jwt.sign(user, JWT_SECRET!, {
      expiresIn: "7days",
    });

    return res.status(200).json({ success: true, user, token }).end();
  } catch (error) {
    logger.error(error, "user login error: ");
    return res.sendStatus(500);
  }
};

export const validateUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    return res.status(200).json({ success: true, user });
  } catch (error) {
    logger.error(error, "validate user error: ");
    return res.sendStatus(500);
  }
};
