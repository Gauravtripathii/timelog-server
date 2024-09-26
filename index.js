import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/users", userRoutes);

mongoose.set("strictQuery", false);

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    app.listen(process.env.PORT, () =>
      console.log(`Server is listning in Port -> '${process.env.PORT}'`)
    )
  ).catch((error) => console.log(error.message));