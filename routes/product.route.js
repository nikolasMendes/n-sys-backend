import express from "express";
import { productModel } from "./../model/product.model.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const productRouter = express.Router();

//POST
productRouter.post("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const newProduct = await productModel.create({
      ...req.body,
    });

    return res.status(201).json(newProduct);
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
productRouter.get("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const getAllProduct = await productModel.find();

    return res.status(200).json(getAllProduct);
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
productRouter.get(
  "/details/:id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let getOneProduct = productModel.findById(id);
      return res.status(200).json(getOneProduct);
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
productRouter.put(
  "/edit/:id",
  isAuth,
  isAdmin,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let editProduct = await productModel.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json(editProduct);
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

productRouter.delete(
  "/delete/:id",
  isAdmin,
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let deleteProduct = await productModel.findByIdAndDelete(id);
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
