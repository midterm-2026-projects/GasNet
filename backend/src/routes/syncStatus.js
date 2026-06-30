const express = require('express')
const router = express.Router()

router.get('/sync-status', (req, res) => {
  res.json({
    syncStatus: 'synchronized',
    lastSync: new Date().toISOString(),
    connectionStatus: 'online'
  })
})

module.exports = router
