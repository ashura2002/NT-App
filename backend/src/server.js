import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import connect from "./config/db.js";
import noteRoute from "./routes/noteRoute.js";
import ai_router from "./routes/askAiRoute.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN,
    credentials: true,
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


// deploy
// push github
