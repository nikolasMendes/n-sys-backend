import { Schema, model, Types } from "mongoose";

const paymentSchema = new Schema({
  description: { type: String, required: true },
  value: { type: String, required: true },
  type: { type: String, required: true },
  typeMoney: { type: String, required: true },
  date: { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const paymentModel = model("Payment", paymentSchema);
