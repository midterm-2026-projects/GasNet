import express from "express";
import syncRouter from "./routes/syncStatus.js";
import salesAnalyticsRouter from "./routes/salesAnalytics.js";
import branchPerformanceAnalysisRouter from "./routes/branchPerformanceAnalysis.js";
import transactionSynchronizationRoutes from "./routes/transactionSynchronizationRoutes.js";
import inventoryRouter from "./routes/inventory.js";
import reportRouter from "./routes/report.js";
import alertRoutes from "./routes/alertRoutes.js";
import analyticsDashboardRouter from "./routes/analyticsDashboard.js";
import supabaseTablesRouter from "./routes/supabaseTables.js";


import syncRoutes from "./routes/sync.js";

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
app.use("/api", inventoryRouter);

app.use("/api", transactionSynchronizationRoutes);

app.use("/api", reportRouter);
app.use("/api/alerts", alertRoutes);
app.use("/api", analyticsDashboardRouter);
app.use("/api", supabaseTablesRouter);

app.use("/api", reportRouter);
app.use("/api/alerts", alertRoutes);

app.use("/api/sync", syncRoutes);

export default app;

