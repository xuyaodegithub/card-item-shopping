const { defineConfig } = require("@vue/cli-service");
const pxtorem = require("postcss-pxtorem");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            pxtorem({
              rootValue: 37.5,
              propList: ["*"],
              selectorBlackList: [],
              MediaQuery: true,
              minPixelValue: 1,
              replace: true,
              unitPrecision: 5,
            }),
          ],
        },
      },
    },
  },
});
