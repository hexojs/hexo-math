module.exports = {
  presets: [
    ['@babel/env', { "targets": { "node": 6 } }]
  ],
  plugins: [
    "add-module-exports"
  ]
}
