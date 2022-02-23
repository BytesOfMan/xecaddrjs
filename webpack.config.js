const path = require('path')
const pkg = require('./package.json')

const base = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'xecaddr.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'xecaddr',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }]
            ]
          }
        }
      }
    ]
  }
}

module.exports = [
  Object.assign({}, base, {
    output: Object.assign({}, base.output, {
      filename: 'xecaddrjs-' + pkg.version + '.js'
    }),
    optimization: {
      minimize: false
    }
  }),
  Object.assign({}, base, {
    output: Object.assign({}, base.output, {
      filename: 'xecaddrjs-' + pkg.version + '.min.js'
    })
  })
]
