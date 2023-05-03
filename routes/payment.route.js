import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { paymentModel } from "./../model/payment.model.js";

const paymentRouter = express.Router();

paymentRouter.post(
  "/",
  isAuth,
  isAdmin,
  attachCurrentUser,
  async (req, res) => {
    try {
      const newPayment = await paymentModel.create({ ...req.body });

      return res.status(201).json(newPayment);
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
  }
);

//GET
paymentRouter.get("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const getAllPayments = await paymentModel.find();

    return res.status(200).json(getAllPayments);
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
// GET DETAILS
paymentRouter.get(
  "/details/:id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let getOnePayment = paymentModel.findById(id);
      return res.status(200).json(getOnePayment);
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
  }
);
//PUT
paymentRouter.put(
  "/edit/:id",
  isAuth,
  isAdmin,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let editPayment = await paymentModel.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json(editPayment);
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
  }
);

paymentRouter.delete(
  "/delete/:id",
  isAdmin,
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let deletePayment = await paymentModel.findByIdAndDelete(id);
      return res.status(200).json(deletePayment);
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
  }
);
