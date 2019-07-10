const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const root = filePath => path.resolve(__dirname, filePath);

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: root('dist'),
    compress: true,
    port: 9000
  },
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      }
    ]
  },
  output: {
    path: root('dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin([{ from: root('public'), to: root('dist') }])
  ]
};
