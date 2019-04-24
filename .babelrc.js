module.exports = {
  presets: [
    ['@babel/env', { "targets": { "node": 8 } }]
  ],
  plugins: [
    "add-module-exports"
  ]
}
