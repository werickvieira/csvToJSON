import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  entry: './example/index.js',
  output: {
    filename: 'bundle.js?[hash]',
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        removeComments: true,
      },
      inject: true,
    }),
    new webpack.DefinePlugin({
      URL: JSON.stringify("http://localhost:8000/"),
    }),
  ],
  devtool: 'source-map',
  devServer: {
    noInfo: true,
    contentBase: path.resolve(__dirname, ''),
    port: 8000,
    host: '0.0.0.0',
  },
};

export default config;