import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { clientModel } from "./../model/client.model.js";

const clientRouter = express.Router();

//POST
clientRouter.post("/", isAuth, isAdmin, attachCurrentUser, async (req, res) => {
  try {
    const newClient = await clientModel.create({
      ...req.body,
    });

    return res.status(201).json(newClient);
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

//GET ALL
clientRouter.get("/", isAuth, isAdmin, attachCurrentUser, async (req, res) => {
  try {
    const getAllClients = await clientModel.find();

    return res.status(200).json(getAllClients);
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

//GET DETAILS

clientRouter.get(
  "/details/:id",
  isAuth,
  isAdmin,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let getOneClient = await clientModel.findById(id);

      return res.status(200).json(getOneClient);
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

clientRouter.put(
  "/edit/:id",
  isAuth,
  isAdmin,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let editClient = await clientModel.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json(editClient);
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

//DELETE

clientRouter.delete(
  "/delete/:id",
  isAdmin,
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let deleteClient = await clientModel.findByIdAndDelete(id);
      return res.status(200).json(deleteProduct);
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
