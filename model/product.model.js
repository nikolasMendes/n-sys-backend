import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  cost: { type: String, required: true },
  stock: { type: String, required: true },
  country: { type: String, required: true },
  winery: { type: String, required: true },
  grape: { type: String, required: true },
  image: { type: String, required: true },
});

export const productModel = model("Product", productSchema);
