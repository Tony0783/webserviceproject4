const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8087", // 백엔드 API 서버 주소로 변경하세요
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        historyApiFallback: true,
      },
    },
  },
  lintOnSave: false,
  publicPath: './',  // 상대 경로로 설정하여 GitHub Pages에서 경로 문제 해결
});
