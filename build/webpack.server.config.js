/* @flow */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: "node",
  entry: './src/js/server.js',
  context: path.resolve(__dirname, '..'),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "server.js"
  },
  externals: [nodeExternals()],
};
