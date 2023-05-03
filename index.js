import express from "express";
import * as dotenv from "dotenv";
import { connectToDB } from "./config/db.config.js";
import cors from "cors";
import { userRouter } from "./routes/user.route.js";

dotenv.config();

connectToDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
