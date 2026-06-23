const { defineConfig } = require('vitest/config')

module.exports = defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/**/*.test.*', 'src/**/*.test.*'],
    setupFiles: 'src/setupTests.js'
  }
})
