const express = require("express");
const morgan = require("morgan");
const authRoute = require("./routes/authRoutes");
const todoRoute = require("./routes/taskRoute");

const app = express();
app.use(morgan("dev"));

app.use(express.json());

const errorHandler = require("./middlewares/errorHandler");

app.get("/", (req, res) => {
  res.json({ message: "Hello Behen ke Lode" });
});

app.use("/api/auth", authRoute);
app.use("/api/todo", todoRoute);

// Mount error handler last
app.use(errorHandler);

module.exports = app;
