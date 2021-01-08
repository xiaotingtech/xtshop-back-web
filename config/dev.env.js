'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://sunny.xtshop.com"',
  BASE_OOS_URL: '"https://xiaotingshop-cn-hangzhou.aliyuncs.com"',
})
