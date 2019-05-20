module.exports = {
    plugins: [
      require("postcss-cssnext")({
        browsers: ["last 5 versions", "Android >= 4.0"]
      })
    ]
  };