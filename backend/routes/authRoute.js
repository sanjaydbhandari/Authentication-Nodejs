import express from "express";
import {signup,signin,userInfo,logout} from "../controllers/authController.js";
import {jwtAuth} from "../middlewares/jwtAuth.js";

const authRouter = express.Router();

authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.get("/userinfo",jwtAuth,userInfo);
authRouter.get("/logout",jwtAuth,logout);

export {authRouter};