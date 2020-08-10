
/**
 * 用户相关服务
 */
const Promise = require('../plugins/es6-promise/dist/es6-promise.min.js')
const util = require('../utils/util.js');
const api = require('../utils/api.js');

var wxLoginCode=""
/**
 * Promise封装wx.login
 */
function login() {
    // //清除同步异步缓存
    // wx.clearStorage()
    // wx.clearStorageSync()

    return new Promise(function(resolve, reject) {

        // wx.login 接口获得的用户登录态拥有一定的时效性,用户越久未使用小程序，用户登录态越有可能失效
        wx.login({
            success: res0 => {
                // 拿到用户登录凭证code
                if (res0.code) {
                    wxLoginCode=res0.code

                    // 查看用户信息是否授权
                    wx.getSetting({
                        success: (res1)=>{
                            //若授权成功 true
                            if (res1.authSetting['scope.userInfo']) {
                                // 获取用户信息
                                getUserInfo(resolve,reject)
                            }else{
                                //若拒绝授权，则重新授权
                                reOpenAuthorization(resolve,reject)
                            }
                        },
                        fail:function () {
                            wx.hideLoading()
                        }
                    })

                } else {
                    //wx.login接口登录失败
                    util.error('登录失败')
                    reject(res)
                }
            },
            fail: err=>{
                util.error('网路开小差，请稍后再试')
                reject(err)
            }
        })
    });
}

/*
* 获取用户信息
* */
function getUserInfo(resolve,reject) {
    // 获取用户信息
    wx.getUserInfo({
        success: (res2)=> {
            //用户已经授权过，获取userInfo
            var userInfo=res2.userInfo
            var params= {
                code:wxLoginCode,
                wxUserInfo:userInfo,
                // 后台通过登录凭证code与appId与appSecret 获取 session_key 和 openid,用于解密用户手机号
                // 'appid': "wx24d58484b8e0f311",
                // 'secret': "72b0af04ba6bcd2df57966f3bcab8e21",
                // 'grant_type': "authorization_code",
            }
            // 请求登录接口，将code传给后台
            api.authLoginweixin(params)
                .then(res=>{
                    //请求成功
                    util.success('登录成功')

                    //存储用户信息
                    wx.setStorageSync('userInfo', res.data.userInfo);
                    wx.setStorageSync('token', res.data.token)

                    //请求成功后处理跳转首页
                    resolve(res)
                })
                .catch(res=>{
                    //存储用户信息
                    wx.setStorageSync('userInfo', res.data.userInfo);
                    wx.setStorageSync('token', res.data.token)

                    reject(res)
                })
        }
    })
}


/*
* 用户信息重新授权
* */
function reOpenAuthorization(resolve,reject) {

    wx.showModal({
        title:"重新授权",
        content: '检测到您拒绝授权用户信息，将无法进入小程序，是否重新授权？',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
            // 点击“确定”：重新打开授权提示
            if (res.confirm) {
                /*
                * 用户点击了拒绝授权要十分钟之后才能再次弹起授权框
                * opensetting的目的就是为了让你兼容用户拒绝授权的场景，优化用户体验
                * 进入openSetting设置：重新打开授权提示
                * */
                wx.openSetting({
                    success: (openSettingRes) => {
                        //若授权用户信息成功 true
                        if (openSettingRes.authSetting['scope.userInfo']) {
                            // 获取用户信息
                            getUserInfo(resolve,reject)
                        }else{
                            //若拒绝授权，则重新授权
                            reOpenAuthorization(resolve,reject)
                        }
                    }
                })
            }else{
                // 点击了“拒绝”
                reject({msg:"拒绝重新授权"})
            }
        },
        fail:function () {
            //重新授权
            reOpenAuthorization(resolve,reject)
        }
    });
}



/**
 * 判断用户是否登录
 */
function checkLogin() {
    return new Promise(function(resolve, reject) {
        if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
            // 检验当前用户的session_key是否有效
            wx.checkSession({
                success: function() {
                    // console.log("当前处于登录状态");
                    resolve(true);
                },
                fail: function() {
                    // console.log("需要重新登录");
                    reject(false);
                }
            })
        } else {
            reject(false);
        }
    });
}

module.exports = {
    login,
    checkLogin,
};