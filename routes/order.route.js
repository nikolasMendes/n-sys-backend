import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { orderModel } from "../model/order.model.js";
import { clientModel } from "./../model/client.model.js";

const orderRouter = express.Router();

orderRouter.post("/", isAdmin, isAuth, attachCurrentUser, async (req, res) => {
  try {
    const newOrder = await orderModel.create(
      { ...req.body },
      { client: { ...req.body } }
    );

    await clientModel.findByIdAndUpdate(
      { _id: req.params.orderId },
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

orderRouter.delete("/:orderId", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const { orderId } = req.params;
    const deleteOrder = await orderModel.deleteOne({ _id: orderId });

    await orderModel.findOneAndUpdate(
      { _id: req.params.clientId },
      { $pull: { order: orderId } },
      { new: true, runValidators: true }
    );
    return res.status(200).json(deleteOrder);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
});

//GETALL TODOS OS PEDIDOS FINALIZADOS
orderRouter.get("/", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const allOrders = await orderModel
      .find({ client: req.params.orderId })
      .populate("client")
      .populate("product");
    return res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
});

orderRouter.get(
  "/details/:orderId",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      let getOneOrder = orderModel.findById(id);
      return res.status(200).json(getOneOrder);
    } catch (error) {
      console.log(error);
      // checking validation
      if (error.name === "ValidationError") {
        const message = Object.values(error.errors).map(
          (value) => value.message
        );
        return res.status(400).json({
          error: message,
        });
      }

      if (error.code === 11000) {
        return res.status(400).json(error.message);
      }

      return res.status(500).json(error.message);
    }
  }
);

orderRouter.put(
  "/edit/:orderId",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const editOrder = await orderModel.findOneAndUpdate(
        { _id: req.params.orderId },
        { ...req.body },
        { new: true, runValidators: true }
      );

      return res.status(200).json(editOrder);
    } catch (error) {
      console.log(error);
      // checking validation
      if (error.name === "ValidationError") {
        const message = Object.values(error.errors).map(
          (value) => value.message
        );
        return res.status(400).json({
          error: message,
        });
      }

      if (error.code === 11000) {
        return res.status(400).json(error.message);
      }

      return res.status(500).json(error.message);
    }
  }
);

export { orderRouter };
