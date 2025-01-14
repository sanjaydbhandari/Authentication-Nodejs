import express from "express";
import signup  from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/signup",signup);

module.exports = authRouter;