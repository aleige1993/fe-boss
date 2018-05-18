'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  UPLOAD_FILE_MAX_SIZE: 50 * 1024,
  HTTPMOCK_ON: false,
  HTTPMOCK_TIMEOUT: 500,
  XHRLOG: true, // 是否console出ajax的详细信息；右上角的Notice是否打印url和code
   HTTPBASEURL: '"http://10.164.238.14:9093"' // 开发服务器
  // HTTPBASEURL: '"http://10.164.238.15:8080"' // 测试服务器
  // HTTPBASEURL: '"http://192.168.201.200:8089"' // 厉洪叶
});
