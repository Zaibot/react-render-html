const webpack = require("webpack");
const path = require("path");

module.exports = [{
    devtool: "source-map",
    entry: "./index.js",
    target: "node",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.js",
        libraryTarget: "commonjs2"
    },
    module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader'
        },{
          test: /\.json$/,
          loader: 'json-loader'
        }]
    }
}];
