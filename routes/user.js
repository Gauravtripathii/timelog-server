import express from "express";

import { greetUser,RegisterUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", greetUser);
router.post("/signup",RegisterUser);

export default router;