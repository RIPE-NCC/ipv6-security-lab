const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

var dir_app = path.resolve(__dirname, "app");
var dir_build = path.resolve(__dirname, "build");
var dir_html = path.resolve(__dirname, "html");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
        static: dir_build,
        compress: true,
        historyApiFallback: true,
        port: 4022,
        proxy: [{
            context: ['/console/hostA', '/console/hostB', '/console/hostC', '/console/admin', '/version.txt'],
            target: 'http://localhost:8080',
            ws: true
        }]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  entry: [path.resolve(dir_app, "index.js")],
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: [/app/],
        // includes don't work with linked (local) modules,
        // such as the @ripe-rnd/ui-components
        // so excluding is the way to go.
        exclude: /.*node_modules\/((?!@ripe-rnd).)*$/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          "css-loader",
        ],
      },
      { test: /\.html$/, loader: "html-loader", options: { esModule: true } },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    symlinks: false,
  },
  output: {
    path: dir_build,
    publicPath: "/",
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: dir_html }],
    }),
    new MiniCssExtractPlugin(),
  ],
};
