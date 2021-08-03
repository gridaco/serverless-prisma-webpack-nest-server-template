const slsw = require("serverless-webpack");

const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: slsw.lib.entries,
  externals: [
    nodeExternals() // this is required
  ],
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        // without this the prisma generate above will not work
        { from: "./prisma/schema.prisma" },
        // copy .env file since nest js app referes it on runtime. -> not a good pattern, needs to be fixed.
        { from: ".env" }
      ]
    }),

    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          "@nestjs/microservices",
          "@nestjs/platform-express",
          "@nestjs/websockets",
          "@nestjs/websockets/socket-module",
          "@nestjs/microservices/microservices-module",
          "@prisma/client",
          "cache-manager",
          "class-validator",
          "class-transformer"
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        include: [__dirname],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
