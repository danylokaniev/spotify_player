const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/index.tsx', './src/index.css'],
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3200,
    watchContentBase: true,
    progress: true,
    hot: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false,
              presets: [
                '@babel/preset-typescript',
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      esmodules: true,
                      node: 'current',
                    },
                  },
                ],
              ],
              plugins: [
                '@babel/plugin-syntax-import-meta',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                [
                  '@babel/plugin-transform-runtime',
                  { regenerator: true, },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/, // .css
        exclude: /\.m\.css$/, // for module styles
        use: [MiniCssExtractPlugin.loader,'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.svg$/,
        use: ['svg-loader'],
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.tsx', '.ts'] },
};