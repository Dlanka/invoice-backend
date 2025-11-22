const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./database");

const dotenv = require("dotenv");
const authMiddleware = require("./middlewares/auth.middleware");

const authRouter = require("./routes/auth.route");
const tenantRouter = require("./routes/tenant.route");
const customerRouter = require("./routes/customer.route");
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route");
const { capitalize } = require("./utils/string");

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

app.use(authMiddleware);

app.use("/tenant", tenantRouter);
app.use("/customer", customerRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);

// Error handle middleware
app.use((error, req, res, next) => {
  let status = error.statusCode || 500;
  let message = error.message;
  let errors = error.errors;
  let description = error.description || "";

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];

    status = 400;
    message = `${capitalize(field)} '${value}' already exists.`;
  }

  // Validation errors
  if (error.name === "ValidationError") {
    status = 400;
    message = error.message;
  }

  res.status(status).json({
    message,
    errors,
    description,
  });
});

app.listen(3001, () => console.log("🚀 Auth Service running on port 3001"));
