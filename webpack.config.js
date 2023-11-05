const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
  mode: "development",
  watch: true,
  devServer: {
    static: { 
        directory: './dist',
        watch: true
    },
    port: 4200,
    liveReload : true
  },

  watchOptions: {
    ignored: ["**/node_modules"],
  },
  entry: "./app/index.js",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.(js)$/, use: "babel-loader" },

      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
        options: {
          name: '/img/[name].[ext]'
        }
    }
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html",
    }),
  ],
};
