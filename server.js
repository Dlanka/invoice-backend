const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./database");

const dotenv = require("dotenv");
const authRouter = require("./routes/auth.route");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) =>
  res.send("Auth Service hot reload with single compose file! 🚀")
);

app.use("/auth", authRouter);

// Error handle middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  let message = error.message;
  let errors = error.errors;
  let description = error.description || "";

  res.status(status).json({
    message,
    errors,
    description,
  });
});

app.listen(3001, () => console.log("🚀 Auth Service running on port 3001"));
