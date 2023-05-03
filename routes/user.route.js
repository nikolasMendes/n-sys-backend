import express from "express";
import { userModel } from "./../model/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.config.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const userRouter = express.Router();

const SALT_ROUNDS = 10;

userRouter.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json("senha invalida");
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    const passwordHash = await bcrypt.hash(password, salt);

    const createdUser = await userModel.create({ ...req.body, passwordHash });

    delete createdUser._doc.passwordHash;

    return res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json("email ou senha invalidos");
    }
    if (await bcrypt.compare(password, user.passwordHash)) {
      const token = generateToken(user);

      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
        },
        token: token,
      });
    } else {
      return res.status(404).json("email ou senha invalidos");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

userRouter.put("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const updateUser = await userModel.findOneAndUpdate(
      { _id: req.currentUser._id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updateUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export { userRouter };
