import { Schema, model, Types } from "mongoose";

const bankSchema = new Schema({
  institution: { type: String, required: true },
  account: { type: String, required: true },
  typeAccount: { type: String, required: true },
  numberpix: { type: String, required: true },
  balanceInitial: { type: String, required: true },
  DateBalanceInitial: { type: String, required: true },
});

export const bankModel = model("Bank", bankSchema);
