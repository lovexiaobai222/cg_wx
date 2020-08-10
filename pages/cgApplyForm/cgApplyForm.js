
Page({
  data: {
    pickerOption: ['111', '222', '333'],
    productOption: ['金属', '有色'],
    catagoryIndex: 0,
    productIndex: 0,
    dialogVisible: false
  },
  onLoad: function (options) {

  },
  bindPickerChange(e) {
    this.setData({
      catagoryIndex: e.detail.value
    })
  },
  // 显示弹框
  showDialog(e) {
    this.setData({
      dialogVisible: true
    })
  },
  // 关闭弹框
  onClose(){
    this.setData({
      dialogVisible: false
    })
  },
  // 新增物料(弹框)
  addRecord(params){
    console.log(params,"-------params")
  },
  // 提交表单
  submitForm(){

  },
});