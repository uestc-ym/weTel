module.exports = {
    plugins: [
      require("postcss-cssnext")({
        browsers: ["last 5 versions", "Android >= 4.0"]
      }),
      require('postcss-salad')({
        browsers: ['ie > 9', 'last 2 versions'],
        features: {
          bem: {
            shortcuts: {
              component: 'b',
              descendent: 'e',
              modifier: 'm'
            },
            separators: {
              descendent: '__',
              modifier: '--'
            }
          }
        }
      })
    ]
  };