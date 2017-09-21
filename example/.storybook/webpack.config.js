var path = require("path");

module.exports = {
  resolve:{
    alias:{
      'react-outline$':path.join(__dirname, "../../dist/main.js")
    }
  },
  module: {
      loaders: [
          { test: /\.css$/, loader: "style-loader!css-loader" }
      ]
  }
};
