import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const env = process.env.NODE_ENV || 'development';
const masterTemplate = {
  development: './src/views/index.pug',
};
const localURL = 'http://localhost:8000/';

const config = {
  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js?[hash]',
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.(pug)$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              data: {},
              pretty: true,
            },
          },
        ],
      },
    ],
  },


  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `${masterTemplate[env]}`),
      minify: {
        removeComments: true,
      },
      inject: true,
    }),
    new webpack.DefinePlugin({
      URL: JSON.stringify(localURL),
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

