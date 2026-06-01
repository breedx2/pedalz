const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // resolve: {
  //   extensions: ['.js'],
  // },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        type: 'asset/resource',
    }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: [
      "index.html", "dist/**"
    ],
    compress: true,
    port: 9000,
  },
};