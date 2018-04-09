import path from 'path'
import webpack from 'webpack'

let Config = {
  entry: [
    './src/js/app.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/bundle.js'
  },
}