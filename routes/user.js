import express from "express";

import { greetUser,RegisterUser, LoginUser, LogoutUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", greetUser);
router.post("/signup",RegisterUser);
router.post("/login",LoginUser);
router.delete("/logout",LogoutUser);

export default router;