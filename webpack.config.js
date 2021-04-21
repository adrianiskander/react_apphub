const path = require('path');
const publicDir = path.join(__dirname, 'public');


module.exports = {
  entry: './client',
  output: {
    filename: 'app.js',
    path: publicDir
  },
  devServer: {
    contentBase: publicDir,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
