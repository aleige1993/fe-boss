'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  UPLOAD_FILE_MAX_SIZE: 50 * 1024,
  HTTPMOCK_ON: false,
  HTTPMOCK_TIMEOUT: 500,
  XHRLOG: true, // 是否console出ajax的详细信息；右上角的Notice是否打印url和code
  HTTPBASEURL: '"http://10.164.238.15:8080"' // 开发服务器
  // HTTPBASEURL: '"http://192.168.201.200:8089"' //
  // HTTPBASEURL: 'http://10.164.5.47:8091' // 幸小杰
  // HTTPBASEURL: 'http://10.164.1.36:28080' // 李卫
  // HTTPBASEURL: 'http://10.164.1.57:8080' // 赵明
  // HTTPBASEURL: 'http://10.164.4.180:48080' // 陈锋
  // HTTPBASEURL: 'http://10.164.1.91:8090' // 程世军
});
