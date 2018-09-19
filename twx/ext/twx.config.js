// twx.config.js 存放初始化后不会修改的配置
var debug = false
var envConfig = ["production", "stg", "test"];
var envSelIdx = 0;
if (debug) {
  wx.setStorageSync('envSelectedIdx', envSelIdx); //切换环境,改这里就行  0:production 1:stg 2:test 
  let storageEnvSelIdx = wx.getStorageSync('envSelectedIdx');
  if (typeof(storageEnvSelIdx) != 'undefined' && isNaN(parseInt(storageEnvSelIdx)) == false) {
    envSelIdx = parseInt(storageEnvSelIdx);
  }
}
var env = envConfig[envSelIdx];
var config = {
  env: env,
  debug: debug,
  appId: 'wx2669fc45a313f669', //独立小程序的APPID
  host: function() {
    if (env == 'production') {
      return 'tqt-pro.tqt.com';
    } else if (env == 'stg') {
      return 'tqt-stg.tqt.com';
    } else if (env == 'test') {
      return 'tqt-test.tqt.com';
    } else {
      return 'tqt-pro.jd.com';
    }
  },

  debugSetupConfig: function() {
    var app = getApp();
    let envSelectedIdx = parseInt(wx.getStorageSync('envSelectedIdx'))
    let newEnv = envConfig[isNaN(envSelectedIdx) ? 0 : envSelectedIdx];
    if (envSelectedIdx) {
      app.globalRequestUrl = 'https://wxapp.m.tqt.com'
    } else {
      app.globalRequestUrl = 'https://wxapp.m.tqt.com'
    }
    env = newEnv;
  }
}
module.exports = config;