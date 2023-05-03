import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { orderModel } from "../model/order.model.js";
import { clientModel } from "./../model/client.model.js";

const orderRouter = express.Router();

orderRouter.post("/", isAdmin, isAuth, attachCurrentUser, async (req, res) => {
  try {
    const newOrder = await orderModel.create({ ...req.body });

    await clientModel.findByIdAndUpdate(
      { id: req.currentuser._id },
      { $push: { order: newOrder._id } },
      { new: true, runValidators: true }
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(...err.errors).map(
        (value) => value.message
      );
      return res.status(400).json({
        error: message,
      });
    }
    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    res.status(500).json(error.message);
  }
});
