import express from 'express'
import { getAnalyticsDashboard } from '../controllers/analyticsDashboardController.js'

const router = express.Router()

router.get('/analytics-dashboard', getAnalyticsDashboard)

export default router

