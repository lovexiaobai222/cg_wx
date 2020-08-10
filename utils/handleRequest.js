const Promise = require('../plugins/es6-promise/dist/es6-promise.min.js')
const util = require('./util.js')

/**
 * 微信请求 http 封装
 * @param url 请求路径
 * @param params 请求参数
 */
const http = (url,params,method,header={}) => {
    wx.showLoading({
        title: '加载中...',
    })
    return new Promise((resolve,reject)=>{
        wx.request({
            url: url,
            method: method,
            data: params,
            header: {
                "Content-Type": "application/json",
                // 'X-Litemall-Token': wx.getStorageSync('token'),
                ...header
            },
            success: (res) => {
                wx.hideLoading()
                //  console.log('request res: ' ,res)

                if (res.statusCode === 400) {
                    util.error('参数异常')
                    return;
                } else if (res.statusCode === 401) {
                    util.error('参数错误')
                    return;
                } else if (res.statusCode === 404) {
                    util.error('接口路径异常')
                    return;
                } else if (res.statusCode === 500) {
                    util.error('服务器异常')
                    return;
                } else if (res.statusCode === 502) {
                    util.error('请求响应无效')
                    return;
                } else if (res.statusCode === 504) {
                    util.error('网关超时')
                    return;
                }


                //若请求成功
                if(res.statusCode === 200){
                    /*success为true  正常数据*/
                    if (res.data && `${res.data.success}`==="true"){
                        resolve(res.data)
                    }
                    else{
                        util.error(res.data.msg)
                        reject(res.data);
                    }
                }
            },
            fail: (error) => {
                wx.hideLoading()

                util.error('网路开小差，请稍后再试')
                reject(error);
            },
        })
    })
}



module.exports = {
    PostMethod:(url,params) => {return http(url,params,"POST")},
    GetMethod:(url,params) => {return http(url,params,"GET")},
    PutMethod:(url,params) => {return http(url,params,"PUT")}, //PUT 方法封装（新增数据）
    DeleteMethod:(url,params) => {return http(url,params,"DELETE")} //DELETE 方法封装（删除数据）
}
