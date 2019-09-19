//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //接入Bmob后端云服务
    var Bmob = require('utils/Bmob-2.2.0.min.js');
    Bmob.initialize("49f38a82f26a10b4", "WXhang");
    // 登录
    /*wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })*/
    //Bomb通过微信支持的code实现一键登录，登陆成功后会在本地缓存保存用户的信息
    Bmob.User.auth().then(res => {
      console.log(res)
      console.log('一键登陆成功')
    }).catch(err => {
      console.log(err)
    });
    // 获取用户信息(判断是否已授权)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.showLoading({
            title: '数据加载中',
            mask: true
          })
          wx.getUserInfo({
            success: res => {
              wx.hideLoading()
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})