import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { Server as SocketIOServer } from "socket.io";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import mediaRoutes from "./routes/media.js";
import utilityRoutes from "./routes/utility.js";
import propertiesRoutes from "./routes/properties.js";
import agentsRoutes from "./routes/agents.js";
import dashboardRoutes from "./routes/dashboard.js";
import valuationsRoutes from "./routes/valuations.js";
import { initSocket } from "./socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = Number(process.env.PORT ?? 5000);
const uploadsDir = path.join(__dirname, "uploads");
const clientUrl = process.env.CLIENT_URL ?? "http://localhost:5173";
const allowedOrigins = [
  clientUrl,
  "http://localhost:8080",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8080",
];

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  "/uploads",
  cors({ origin: allowedOrigins, credentials: true }),
  express.static(uploadsDir, {
    setHeaders: (res) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 120 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests. Please wait a moment and try again.",
});
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/utility", utilityRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/agents", agentsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/valuations", valuationsRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: allowedOrigins, methods: ["GET", "POST"], credentials: true },
});

app.set("io", io);
initSocket(io);

try {
  await sequelize.authenticate();
        console.log("Database authentication succeeded.");
} catch (error) {
    console.error("Unable to authenticate to the database:", error);
}

server.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
