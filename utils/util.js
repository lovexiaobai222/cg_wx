/**
 * @Discription 公用js函数库
 * @author 徐静
 * @created 2019/5/29 23:26
 */


// 成功提示
var success = function (msg) {
    wx.showToast({
        title: msg||'成功',
        image: '/img/icon/success.png',
        duration: 2000
    })
}

// 失败提示
var error = function (msg) {
    wx.showToast({
        title: msg||'失败',
        image: '/img/icon/error.png',
        duration: 3000
    })
}

// 警告提示
var warning = function (msg) {
    wx.showToast({
        title: msg||'警告',
        image: '/img/icon/warning.png',
        duration: 3000
    })
}

/**
 * 判断JS变量是否空值
 * 如果是 undefined， null， ""， NaN，false，0，[]，{} ，含有空格的空白字符串，都返回true，否则返回false
 * @param v(变量v)
 * @returns {boolean}
 */
var isEmpty = function (v) {
    switch (typeof v) {
        case "undefined":
            return true;
        case "string":
            // 去掉空格、换行
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length === 0) {return true;}
            break;
        case "boolean":
            if (!v) {return true;}
            break;
        case "number":
            if (v === 0 || isNaN(v)) {return true;}
            break;
        case "object":
            if (v === null || v.length === 0) {return true;}
            for (const i in v) {
                return false;
            }
            return true;
    }
    return false;
}

// 毫秒 转 日月
var millisecondToYearMonth = function (time) {
    var date = new Date(parseInt(time, 10));
    //月份为0-11，所以+1，月份小于10时补个0
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

    return date.getFullYear() + "." + month
}
// 日月(2019.06) 转 毫秒
var yearMonthToMillisecond = function (time) {
    // IOS系统只识别 " / " 不识别 " - " 且 IOS只支持转化 年/月/日
    time=time.replace(/\./g, '/')

    // 2019/06
    if(time.length<=7){
        time=time+"/01"
    }
    var millisecond = Date.parse(new Date(time))

    return millisecond
}


// 去除字符串前后空格
var trim = function(str){
    return `${str}`.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
}

// 验证手机号
var checkPhone = function(value) {
    // 去除字符串前后空格
    value=trim(value)
    const exp = /^1[345789]\d{9}$/;
    return value && exp.test(value)
}
// 验证邮箱
var checkEmail = function(value) {
    // 去除字符串前后空格
    value=trim(value)
    const exp = /^\w+@\w+\.[a-z]+$/;
    return value && exp.test(value)
}

module.exports = {
    success: success,
    error: error,
    warning: warning,
    isEmpty: isEmpty,
    millisecondToYearMonth: millisecondToYearMonth,
    yearMonthToMillisecond: yearMonthToMillisecond,
    trim: trim,
    checkPhone: checkPhone,
    checkEmail: checkEmail,
}
