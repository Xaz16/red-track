const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
  filename: 'app.css'
});

module.exports = {
  entry: [
    './src/js/index.ts',
    './src/scss/main.scss'
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        loader: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                root: './build/'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({
                    browsers: [
                      '> 3%',
                      'iOS 7',
                      'android >= 4.2'
                    ]
                  })
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/manifest.json', to: '', toType: 'file' },
      { from: 'src/assets/', to: '', toType: 'dir' },
      { from: 'src/html/popup.html', to: '', toType: 'file' },
      ]),
    extractSass,
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    alias: {
      bootstrap: path.join(__dirname, '/node_modules/bootstrap/scss/bootstrap.scss')
    }
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
  },
};
