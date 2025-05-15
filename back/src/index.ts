import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authRoutes } from "./routes/auth.routes";
import { authenticate } from "./middlewares/auth.middleware";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Route protégée exemple
app.get("/api/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export { app };
