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

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      // normalize origin to remove trailing slash
      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error(`CORS policy: Origin ${origin} not allowed`));
      }
    },
    credentials: true, // allows cookies/auth headers
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
