const { Author } = require("../models/Auth");
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { email, password, dob, date } = req.body;
  try {
    if (!email || !password || !dob || !date) {
      return res.status(400).send("Please fill all the fields");
    }
    const userExist = await Author.findOne({ email });
    if (userExist) {
      return res.status(400).send("User already exists");
    }
    const user = new Author({ email, password, dob, date });
    await user.save();
    const token = createToken({ email });
    res.status(201).json({message:"User created",token});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send("Please fill all the fields");
    }
    const user = await Author.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist");
    }
    const isMatch = await Author.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const token = createToken({ email });
    res.status(200).json({ message: "User Logged in", token });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  };
