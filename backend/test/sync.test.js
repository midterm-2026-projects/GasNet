const request = require('supertest')
const app = require('../src/index.js')

describe('GET /api/sync-status', () => {
  it('returns sync status payload', async () => {
    const res = await request(app).get('/api/sync-status').expect(200)
    expect(res.body).toHaveProperty('syncStatus')
    expect(res.body).toHaveProperty('lastSync')
    expect(res.body).toHaveProperty('connectionStatus')
  })
})
