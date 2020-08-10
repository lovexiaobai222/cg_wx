
const api = require('../../utils/api.js')
//$stopWuxRefresher 停止当前下拉刷新 $stopWuxLoader 停止当前上拉加载
import { $startWuxRefresher, $stopWuxRefresher, $stopWuxLoader } from '../../wux-weapp-master/dist/index'

/**
 * @Discription 采购申请详情
 * @author xujing
 * @created 2020/8/9 17:48
 */
Page({
  data: {
    detail: {},
  },
  onLoad: function (option) {
    console.log(JSON.parse(option.item),"---item")
    //获取基本信息
    this.setData({
      detail: JSON.parse(option.item)
    })
  },
  toBack() {
    wx.navigateBack({ delta: 1 })
  },

})