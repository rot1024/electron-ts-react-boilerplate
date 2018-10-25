"use strict";

const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              plugins: ["react-hot-loader/babel"],
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
              configFile: path.join(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
    ],
  },
};
