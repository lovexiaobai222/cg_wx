const api = require('../../utils/api.js')
const util = require('../../utils/util.js')

Page({
  data: {
    dialogVisible: false,//新增弹框
    popVisible:false,//select弹框
    selectType:"",//当前显示的select列表类型
    productList:[ 
      {key:11,text:"水泥",unit:"吨",spec:"普通",productCode:"0001"},
      {key:12,text:"钢筋",unit:"斤",spec:"普通",productCode:"0002"},
      {key:13,text:"橡胶",unit:"kg",spec:"特级",productCode:"0003"},
    ],//物料列表
    storeList:[
      {key:101,text:"仓库1",storeCode:"0001"},
      {key:102,text:"仓库2",storeCode:"0002"},
    ],//仓库列表
    dialogForm:{
      productId:"",//物料id
      productCode:"",//物料编码
      productName:"",//物料名称
      spec:"",//规格
      unit:"",//单位
      amount:"",//物料数量
    },//弹框表单
    applyForm:{
      storeId:"",//仓库id
      storeName:"",//仓库名称
      productList:[],//物料表单
    },//申请表单
  },
  onLoad: function (options) {
    // 请求仓库列表 companyid:用户登录的companyid
    api.storeadminlistbycompany({companyid:6,pageNo:1,pageSize:999})
      .then(res=>{
        const {entities=[]} = res.content
        this.setData({
          storeList:entities.map(item=>{return {...item,key:item.storeId,text:item.storeName}})
        })
      })
    // 请求物料列表
    api.productadminlistbycompany({companyid:6,pageNo:1,pageSize:999})
      .then(res=>{
        const {entities=[]} = res.content
        // console.log(entities,"--------entities")
        this.setData({
          productList:entities.map(item=>{return {...item,key:item.productId,text:item.productName+"（"+item.spec+"）"}})
        })
      })
  },
  // 显示弹框
  showDialog() {
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
  changePopVisible(e){
    this.setData({
      selectType:e.target.id,
      popVisible: !this.data.popVisible
    })
  },
  // select改变
  onChange(e){
    const {value={}} = e.detail
    // console.log(value,"select改变")
    switch(this.data.selectType){
      case "product"://匹配物料
        const {dialogForm={}} = this.data
        dialogForm.productId=value.key //物料id
        dialogForm.productCode=value.productCode //物料编码
        dialogForm.productName=value.text //物料名称
        dialogForm.spec=value.spec //规格
        dialogForm.unit=value.unit //单位
        dialogForm.price=value.preferedPrice //价格
        this.setData({ dialogForm })
        break;
      case "store"://匹配仓库
        const {applyForm={}} = this.data
        applyForm.storeId=value.key //仓库id
        applyForm.storeName=value.text //仓库名称
        this.setData({ applyForm })
        break;
      default:
        break;
    }

    this.setData({ popVisible: false })
  },
  // input改变
  onInputChange(e){
    const {value={}} = e.detail
    // console.log(value,"input改变")
    const {dialogForm={}} = this.data
    dialogForm.amount=value
    this.setData({
      dialogForm
    })
  },
  // (弹框中)新增物料
  addRecord(){
    const {applyForm={},dialogForm={}} = this.data
    console.log(dialogForm,"-------dialogForm")
    applyForm.productList.push(dialogForm)
    this.setData({
      applyForm,//申请表单
      dialogForm:{},//弹框表单
      dialogVisible:false
    })
  },
  // 删除物料
  deleteProduct(e){
    const id=e.target.id
    const {applyForm={}} = this.data
    const {productList=[]} = applyForm
    const arr=productList.filter(item=>~~item.productId !== ~~id)
    applyForm.productList=arr
    this.setData({applyForm})
  },
  // 提交表单
  submitForm(){
    const {applyForm={}} = this.data
    console.log(applyForm,"-------applyForm")
    const params={
      "recordId":null, //订单id
      "recordCode": null, //订单编号
      "creatorId": 4, //创建者id，此处为施工用户的id
      "Username":null, //创建者名称
      "createTime": "2020-07-07T10:28:13.000+00:00", //创建时间
      "companyId": 2, //用户登录的companyid
      "remarks": null, //备注
      "recordRelations": [], //关联单据清单（采购申请单无关联单据，此处上传空）
      "voucherList": [], //凭证清单（采购申请凭证可为空）
      "productList": [ //物料清单
          {
              "productId": 1,
              "amount": 1.0,
              "price": null,
              "recordId": 1594117692974
          }
      ],
      "storeId":null, //仓库id（默认为施工用户所属仓库）
      "storeName":null, //仓库名称
      "purchaseType": 41, //采购订单类型（41）
      "purchaseState": 2, //订单状态（已提交1，已确认2，已退回3）
      "supplierId": null, //供应商id（此处为null）
      "amount": null, //采购金额（此处为null）
      ...applyForm,
    }

    // 新增采购申请
    api.pradminaddrecord(params)
      .then(res=>{
        util.success("成功")
        console.log(res,"---res 新增采购申请")
      })
  },
});