const express = require("express");
const morgan = require("morgan");
const authRoute = require("./routes/authRoutes");
const todoRoute = require("./routes/taskRoute");

const app = express();
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello Behen ke Lode" });
});

app.use("/api/auth", authRoute);
app.use("/api/todo", todoRoute);

module.exports = app;
