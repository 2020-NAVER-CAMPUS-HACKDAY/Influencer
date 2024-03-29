const webpack = require('webpack');

// 배포시에는 본 env 설정이 무시됩니다.
const { parsed: localEnv } = require('dotenv').config({
  path: './env/.env',
});

module.exports = {
  target: 'serverless',
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
};
