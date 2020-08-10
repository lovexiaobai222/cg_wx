const api = require('../../utils/api.js');

Page({
    data: {
        userInfo : {},
        exitVisible:false
    },
    onShow:function(){
        const _this=this
        // 查询个人资料(获取 hiddenResume)
        // api.jobinfoInfo()
        //     .then(res=>{
        //         if(res.data){
        //             _this.setData({
        //                 userInfo:{...res.data}
        //             })
        //         }
        //     })
    },
     //页面跳转
     jumpTo:function(e){
      switch (e.currentTarget.id){
          case "1": //个人资料
              wx.navigateTo({
                  url: '../myProfile/index'
              })
              break;
          case "2": //修改密码
              wx.navigateTo({
                  url: '../myResume/index'
              })
              break;
      }
  },
    //退出登录
    exit:function () {
        const _this=this
        wx.showModal({
            title:"退出登录",
            content: '是否确认退出登录？',
            confirmText: "确定",
            cancelText: "取消",
            success: function (res) {
                // 点击“确定”
                if (res.confirm) {
                    api.authLogout()
                        .then(res=>{
                            _this.setData({exitVisible:true})
                            wx.clearStorage()
                            wx.clearStorageSync()
                            // 隐藏 tabBar
                            wx.hideTabBar()
                        })
                }
            }
        })
    },
    //点击登录
    toLogin:function (e) {
        // 关闭所有页面，打开到应用内的某个页面
        switch (e.currentTarget.dataset.type){
            case "wx-login":
                wx.reLaunch({
                    url:"../start/start"
                })
                break;
            case "phone-login":
                wx.reLaunch({
                    url:"../login/login"
                })
                break;
        }
    }
})