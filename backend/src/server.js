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

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // local dev
  process.env.ALLOW_ORIGIN?.replace(/\/$/, ""), // deployed frontend (no trailing slash)
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman/server requests

      const normalizedOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());

app.use("/auth", userRouter);
app.use("/api/notes", noteRoute);
app.use("/api", ai_router);

connect().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
