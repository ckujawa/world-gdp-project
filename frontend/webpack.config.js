const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.tsx",

  stats: {
    logging: "error",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 7777,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: { loader: "html-loader" },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 100000}
          }
        ]
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],

  performance: { hints: false },
  watch: true,
  devtool: "source-map",
};
