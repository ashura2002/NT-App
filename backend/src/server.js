import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import connect from "./config/db.js";
import noteRoute from "./routes/noteRoute.js";
import ai_router from "./routes/askAiRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

const allowOrigins = [process.env.ALLOW_ORIGIN, "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allowing request with no origin like postman

      if (allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use("/auth", userRouter);
app.use("/api/notes", noteRoute);
app.use("/api", ai_router);

connect().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
