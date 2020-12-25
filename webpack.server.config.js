const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')

const { dependencies } = require('./package')

const isProduction = process.env.NODE_ENV !== 'development'

let config = {
  mode: isProduction ? 'production' : 'development',
  devtool: '#cheap-module-eval-source-map',
  target: 'node-webkit',
  entry: {
    index: path.join(__dirname, './server')
  },
  output: {
    path: path.join(__dirname, './dist/server'),
    filename: '[name].js'
  },
  externals: [
    // Externalize all dependencies inside of the application directory.
    function (context, request, callback) {
      if (dependencies && dependencies[request]) {
        return callback(null, 'commonjs ' + request)
      } else {
        callback()
      }
    }
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.join(__dirname, './server')
    }
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          output: { comments: false }
        }
      })
    ],
    noEmitOnErrors: true
  }
}


module.exports = config
