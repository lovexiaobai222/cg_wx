const C = require('../constants/api.js')
const http = require('./handleRequest.js')

const {
  PostMethod,
  GetMethod,
  PutMethod,
  DeleteMethod
} = http
/*
 * http.PostMethod Post请求
 * http.GetMethod Get请求
 * http.PutMethod 新增请求
 * http.DeleteMethod 删除请求
 * */
module.exports = {
  authDic: (params) => GetMethod(C.AUTH_DIC, params), //字典表
  authTempDic: (params) => GetMethod(C.AUTH_TEMP_DIC, params), //查询投递公司
  authLogin: (params) => PostMethod(C.AUTH_LOGIN, params), //账号密码登陆
  authLoginweixin: (params) => PostMethod(C.AUTH_LOGINWEIXIN, params), //微信登陆
  fastLogin: (params) => PostMethod(C.FASTLOGIN, params), //微信登陆
  authBindPhone: (params) => PostMethod(C.AUTH_BINDPHONE, params), //绑定手机号
  authRegister: (params) => PostMethod(C.AUTH_REGISTER, params), //账号注册
  authRegCaptcha: (params) => PostMethod(C.AUTH_REGCAPTCHA, params), //请求快速登录3、注册1、忘记密码2验证码
  authCaptcha: (params) => PostMethod(C.AUTH_CAPTCHA, params), //请求绑定手机号、修改密码验证码
  authBaseinfo: (params) => PostMethod(C.AUTH_BASEINFO, params), // 完善基本信息
  authLogout: (params) => PostMethod(C.AUTH_LOGOUT, params), // 退出登录

  pradminlistbycompany: (params) => GetMethod(C.PRADMIN_LISTBYCOMPANY, params), //采购申请列表 
  storeadminlistbycompany: (params) => GetMethod(C.STORE_LISTBYCOMPANY, params), //仓库列表 
  productadminlistbycompany: (params) => GetMethod(C.PRODUCTADMIN_LISTBYCOMPANY, params), //物料列表 
  supplieradminlistbycompany: (params) => GetMethod(C.SUPPLIERADMIN_LISTBYCOMPANY, params), //供应商列表
  pradminaddrecord: (params) => GetMethod(C.PRADMIN_ADDRECORD, params), //新增采购申请



};