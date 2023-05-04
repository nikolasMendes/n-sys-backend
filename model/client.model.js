import { Schema, model, Types } from "mongoose";

const clientSchema = new Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  address: { type: String, required: true },
  number: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  cellphone: { type: String, required: true },
  order: [{ type: Types.ObjectId, ref: "Order" }],
});

export const clientModel = model("Client", clientSchema);
