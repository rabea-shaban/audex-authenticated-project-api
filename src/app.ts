import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Authenticated Project API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export default app;
