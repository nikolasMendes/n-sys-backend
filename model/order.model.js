import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema({
  client: { type: Types.ObjectId, ref: "Client" },
  product: [{ type: Types.ObjectId, ref: "Product" }],
  unities: { type: Number, required: true },
  typePayment: { type: String, required: true },
  statusPayment: { type: String, required: true },
  statusDelivery: { type: String, required: true },
});

export const orderModel = model("Order", orderSchema);
