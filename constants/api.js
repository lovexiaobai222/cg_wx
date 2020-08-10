/**
 * @module  api
 * api请求的地址常量
 * */
const host = `http://106.53.212.189:8080`

 
var obj = {
  AUTH_DIC: "/wx/auth/dict", //字典表
  AUTH_TEMP_DIC: "/wx/auth/tempDict", //查询投递公司
  AUTH_LOGIN: "/wx/auth/login", //账号密码登陆
  AUTH_LOGINWEIXIN: "/wx/auth/loginWeiXin", //微信登陆
  FASTLOGIN: "/wx/auth/fastLogin", //快速登陆
  AUTH_BINDPHONE: "/wx/auth/bindPhone", //绑定手机号
  AUTH_REGISTER: "/wx/auth/register", //账号注册
  AUTH_REGCAPTCHA: "/wx/auth/regCaptcha", //请求快速登录3、注册1、忘记密码2验证码
  AUTH_CAPTCHA: "/wx/auth/captcha", //请求绑定手机号、修改密码验证码
  AUTH_BASEINFO: "/wx/auth/baseInfo", // 完善基本信息
  AUTH_LOGOUT: "/wx/auth/logout", // 退出登录

  PRADMIN_LISTBYCOMPANY: "/pradmin/listbycompany", // 采购申请列表(purchasetype=41),采购订单列表(purchasetype=42)
  STORE_LISTBYCOMPANY: "/storeadmin/listbycompany", // 仓库列表
  PRODUCTADMIN_LISTBYCOMPANY: "/productadmin/listbycompany", // 物料列表
  SUPPLIERADMIN_LISTBYCOMPANY: "/supplieradmin/listbycompany", // 供应商列表
  PRADMIN_ADDRECORD: "/pradmin/addrecord", // 新增采购申请


}

for (var i in obj) {
  obj[i] = host + obj[i]
}

module.exports = {
  ...obj
}