const express = require("express");
const app = express();
const bookingRoutes = require("../src/routes/bookingRoutes");
require("express-async-errors");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/bookings", bookingRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    status: "error",
    message: message,
  });
});

module.exports = app;
