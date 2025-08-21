import express from "express";
const noteRoute = express.Router();
import verifyToken from "../middlewares/authMiddleware.js";
import {
  getAllNotes,
  createNotes,
  editNotes,
  deleteNotes,
} from "../controller/noteController.js";

//   /api/notes magsugod ilang url
noteRoute.get("/", verifyToken, getAllNotes);
noteRoute.post("/", verifyToken, createNotes);
noteRoute.put("/:id", verifyToken, editNotes);
noteRoute.delete("/:id", verifyToken, deleteNotes);

export default noteRoute;
