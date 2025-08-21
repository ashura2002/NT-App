import express from "express";
import {
  registerAccount,
  loginAccount,
  deleteAccount,
} from "../controller/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

//   /auth magsugod ilang url
userRouter.post("/register", registerAccount);
userRouter.post("/login", loginAccount);
userRouter.delete("/user-info/:id", verifyToken, deleteAccount);

export default userRouter;
