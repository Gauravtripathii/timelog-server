import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";

const app = express();

app.use(express());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/users", userRoutes);

const CONNECTION_URL = "mongodb://localhost:27017/timelog";
const PORT = 69;

mongoose.set("strictQuery", false);

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    app.listen(PORT, () =>
      console.log(`Server is listning in Port -> '${PORT}'`)
    )
  ).catch((error) => console.log(error.message));