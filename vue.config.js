// vue.config.js
module.exports = {
    chainWebpack: (config) => {
      config.module
        .rule('js')
        .test(/\.m?js$/)
        .include
          .add(/node_modules/)
          .end()
        .use('babel-loader')
          .loader('babel-loader')
          .end();
    }
  };
  