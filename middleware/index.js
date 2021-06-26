const path = require('path')
const ip = require('ip')
const bodyParser = require('koa-bodyparser')

const miSend = require('./mi-send')

// 引入日志中间件
const miLog = require('./mi-log')

//引入跨域
const cors = require("koa2-cors")
const miRule = require('./mi-rule');
const onerror = require('koa-onerror');

//引入数据库连接 
const {connect} = require('../config/connect')
module.exports = (app) => { 
  connect()
  onerror(app);
  miRule({
      app,
      rules: [{ //指定controller文件夹下的js文件，挂载在app.controller属性
              folder: path.join(__dirname, '../controller'),
              name: 'controller'
          },
          { // 指定service文件夹下的js文件，挂载在app.service属性
              folder: path.join(__dirname, '../service'),
              name: 'service'
          }
      ]
  });
  // 注册中间件
  app.use(miLog({
    env: app.env,  // koa 提供的环境变量
    projectName: 'koa2-tutorial',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))
  app.use(bodyParser())
  app.use(miSend())
  app.use(cors())
}                                                                                                                                                                                                                                                              