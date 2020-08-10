
const api = require('../../utils/api.js')
//$stopWuxRefresher 停止当前下拉刷新 $stopWuxLoader 停止当前上拉加载
import { $startWuxRefresher, $stopWuxRefresher, $stopWuxLoader } from '../../wux-weapp-master/dist/index'

/**
 * @Discription 采购订单
 * @author xujing
 * @created 2020/8/9 17:48
 */
Page({
  data: {
    meta: { //分页信息
      pageNo: 1,
      pageize: 10,
      totalPage: 0, //总页数
      totalCount: 0, //所有数据
    },
    applyList: [], //采购申请列表
  },
  onLoad: function () {
    // 下拉刷新到第一页
    $startWuxRefresher()
  },
  onPagecroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  // 上拉加载更多
  onLoadmore() {
    console.log('>>>>>>>>>>>>>>>>>>>>>加载下一页', this.data.meta)
    if (this.data.meta.pageNo < this.data.meta.totalPage) {
      //获取列表信息
      const _this = this
      //请求下一页数据列表
      var params = {
        companyid: 6,
        purchasetype: 42,//采购订单类型（42）
        pageNo: this.data.meta.pageNo + 1,
        pageize: 10
      }
      // 发起请求
      api.pradminlistbycompany(params)
        .then(res => {
          const { entities, pageNo, pageSize, totalPage, totalCount } = res.content
          const meta = {
            pageNo,
            pageSize,
            totalPage,
            totalCount
          }

          if (meta.pageNo < meta.totalPage) {
            // 停止当前上拉加载
            $stopWuxLoader()
          } else {

            console.log('没有更多数据啦！！！且不能继续上拉操作')
            // 停止当前上拉加载（且不能继续上拉操作）
            $stopWuxLoader('#wux-refresher', this, true)
          }

          _this.setData({
            meta: meta,
            applyList: ~~meta.pageNo === 1 ? [...entities] :
              [
                ..._this.data.applyList,
                ...results
              ]
          })
        })
        .catch(res => {
          // 停止当前上拉加载
          $stopWuxLoader()
        })
    }
  },
  // 下拉 不做任何操作
  onPulling() {
  },
  // 下拉刷新到第一页
  onRefresh() {
    console.log("<<<<<<下拉刷新到第一页")
    //获取列表信息
    const _this = this
    //刷新请求第一页
    var params = {
      companyid: 6,
      purchasetype: 42,//采购订单类型（42）
      pageNo: 1,
      pageSize: 10
    }
    // 发起请求
    api.pradminlistbycompany(params)
      .then(res => {
        // 停止当前下拉刷新
        $stopWuxRefresher()

        const { entities, pageNo, pageSize, totalPage, totalCount } = res.content
        const meta = {
          pageNo,
          pageSize,
          totalPage,
          totalCount
        }
        console.log(entities,"------entities")

        _this.setData({
          meta: meta,
          applyList: [...entities]
        })
      })
      .catch(res => {
        // 停止当前下拉刷新
        $stopWuxRefresher()
      })
  },
  //跳转采购申请详情
  toDetail(e) {
    const item = e.currentTarget.dataset.item
    //跳转详情页面
    wx.navigateTo({
      url: '/pages/orderDetail/index?item=' + JSON.stringify(item)
    })
  },
  goToForm(){
    wx.navigateTo({
      url: '/pages/orderForm/orderForm'
    })
  }
})