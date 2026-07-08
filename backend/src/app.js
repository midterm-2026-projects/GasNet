import express from "express";

import syncRouter from "./routes/syncStatus.js";
import salesAnalyticsRouter from "./routes/salesAnalytics.js";
import branchPerformanceAnalysisRouter from "./routes/branchPerformanceAnalysis.js";
import transactionSynchronizationRoutes from "./routes/transactionSynchronizationRoutes.js";
import inventorySynchronizationRoutes from "./routes/inventorySynchronizationRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GasNet Backend API is running.",
  });
});

app.use("/api", syncRouter);
app.use("/api", salesAnalyticsRouter);
app.use("/api", branchPerformanceAnalysisRouter);
app.use("/api", transactionSynchronizationRoutes);
app.use("/api", inventorySynchronizationRoutes);

export default app;