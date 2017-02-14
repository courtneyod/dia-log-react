var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
   headers: {
       "Access-Control-Allow-Origin": "*" ,
       "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
},

  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.jsx',
      reducers: 'src/reducers/reducers.jsx',
      actions: 'src/actions/actions.jsx',
      store: 'src/store/configureStore.jsx',
      Weather: 'src/components/Weather.jsx',
      Nav: 'src/components/Nav.jsx',
      About: 'src/components/About.jsx',
      AddPhotoBtn: 'src/components/AddPhotoBtn.jsx',
      NewEntryContainer: 'src/components/newPhoto/NewEntryContainer.jsx',
      NewEntryForm: 'src/components/newPhoto/NewEntryForm.jsx',
      NewEntryNav: 'src/components/newPhoto/NewEntryNav.jsx',
      AddHealthStats: 'src/api/AddHealthStats.js',
      Photo: 'src/components/Photo.jsx',
      PhotoList: 'src/components/PhotoList.jsx',
      Auth: 'src/components/login/Auth.jsx',
      LoginContainer: 'src/components/login/LoginContainer.jsx',
      GoogleAuth: 'src/components/login/GoogleAuth.jsx',
      LoginForm: 'src/components/login/LoginForm.jsx',
      LoginLogo: 'src/components/login/LoginLogo.jsx',
      SignUp: 'src/components/login/SignUp.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/',
 },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
}};
