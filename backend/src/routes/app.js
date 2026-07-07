const express = require("express");

const transactionSynchronizationRoutes = require("./transactionSynchronizationRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GasNet Backend API is running.",
  });
});

app.use("/api", transactionSynchronizationRoutes);

module.exports = app;
