import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { bankModel } from "./../model/bank.model.js";

const bankRouter = express.Router();

bankRouter.post("/", isAuth, isAdmin, attachCurrentUser, async (req, res) => {
  try {
    const newBank = await bankModel.create({ ...req.body });

    return res.status(201).json(newBank);
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

//GET
bankRouter.get("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const getAllBanks = await bankModel.find();

    return res.status(200).json(getAllBanks);
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
bankRouter.get("/details/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const { id } = req.params;
    let getOneBank = bankModel.findById(id);
    return res.status(200).json(getOneBank);
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
//PUT
bankRouter.put(
  "/edit/:id",
  isAuth,
  isAdmin,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let editBank = await bankModel.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json(editBank);
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

bankRouter.delete(
  "/delete/:id",
  isAdmin,
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let deleteBank = await bankModel.findByIdAndDelete(id);
      return res.status(200).json(deleteBank);
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
