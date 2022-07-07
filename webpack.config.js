const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          }
        },
        { 
         test: /\.(s[ac]ss||css)$/i,
         use:[
           {
             loader: MiniCssExtractPlugin.loader, 
             options: {
               publicPath: "./",
             },
           },
           "css-loader",
           "sass-loader",
         ],
        },
        {
         test: /\.html$/i,
         use: [
           {
           loader: 'html-loader',
           options: {
             minimize:true,
           },
           }
          ],
        },
        {
         test: /\.(svg|jpg|jpeg|gif|png)$/i,
         type: 'asset/resource',
        },
        {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: 'asset/resource',
        }, 
    ]  
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:"./src/template.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
}; 