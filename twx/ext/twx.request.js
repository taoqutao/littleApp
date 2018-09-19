var twx = require('../twx.js').twx;
var util = require('../../utils/util.js')

var requestd = {};
var _requestID = 1;
var __kMaxRequestCount = 6;
var _requestQueue = [];//等待的queue
var _runQueue = [];//正在请求的request

function _generateRequestID() {
    return _requestID++;
}

function _formatRequestURL(url) {
  if (twx.config.env === 'test') {
    if (url.indexOf("/mobileService/tradeService") == 0) {
      return "http://pttrade.jd.com" + url;
    }
  }
    if (url.indexOf('https://') == 0) {
        return url;
    } else if (url.indexOf("/") == 0) {
        return "https://" + twx.config.host() + url;
    } else {
        // console.warn('url 格式错误');
    }
}

function __createHeader(header) {
    var _header = header || {};
    try {
        var headerCookie = util.getCookies();
        //判断是否有独自cookie请求
        var selfCookie = _header.Cookie;
        selfCookie && (headerCookie += selfCookie);
        if (!_header['content-type']){
            _header['content-type'] = 'application/x-www-form-urlencoded';
        }
        _header["UserAgent"] = "JD-servicewechat";
        _header["wechatAppId"] = twx.appId;
        _header["unifiedAppId"] = "503";//统一登陆 appId,需求登陆的接口要传，不需要的可不传
        _header["traderName"] = 1;
        _header["outerVersion"] = twx.globalData.appVersion || '';
        _header["innerVersion"] = twx.globalData.innerVersion || '';
        _header["level4Addr"] = twx.getLevel4Addr || '';
        _header['Cookie'] = headerCookie;
        var netType = ['wifi', '2g', '3g', '4g', 'none', 'unknown'].indexOf(twx.networkType);
        netType = netType == -1 ? 6 : netType + 1;
        _header["clientInfo"] = JSON.stringify({
            clientSystem: twx.systemInfo.platform || 'other',
            "clientVersion": twx.systemInfo.system || 'unknown',
            "netType":  netType,
            "phoneType": twx.systemInfo.model || 'unknown',
            "wechatVersion": twx.systemInfo.version || 'unknown',
            "lngAndLat": {
              "lng": twx.globalData.lng || '',
              "lat": twx.globalData.lat || ''
            }
        });
    } catch (e) {

    }
    return _header;
}

//取消队列中的请求,只能移除等待队列中的请求
function cancel(requestID) {
    if (requestID > 0) {
        //等待中移除
        for (var i = 0; i < _requestQueue.length; i++) {
            var obj = _requestQueue[i];
            if (obj.requestID == requestID) {
                _requestQueue.splice(i, 1);
                return 1;
            }
        }
    }

    return 0;
}

//发送网络请求, 异步返回结果，函数返回值为本次请求生成的requestID， 该requestID在cancel时候可以使用
function request(object) {
    var header = __createHeader(object.header);
    object.header = header;

    if (!object.data) {
        object.data = {};
    }
    var data = object.data;

    object.url = _formatRequestURL(object.url);
    // console.log( "twx.request.url==" + object.url );
    object.method = object.method || 'POST';
    object.requestID = _generateRequestID();

    var oSuccess = object.success || function() {};

    var nSuccess = function(res) {
        if (res && res.data && res.data.rtn_code && res.data.rtn_code == '406') {
            wx.removeStorageSync('jdlogin_pt_key');
        }
        //写埋点用的加密pin
        wx.setStorageSync('desPin', res.data.desPin);
        util.setCookies(res.data);
        oSuccess(res);
    }
    object.success = nSuccess;

    var oComplete = object.complete || function () { };
    var nComplete = function (res) {
        //移除请求
        for (var i = 0; i < _runQueue.length; i++) {
            var obj = _runQueue[i];
            if (obj.requestID == nComplete.requestID) {
                _runQueue.splice(i, 1);
                break;
            }
        }

        if (oComplete) {
            oComplete(res);
        }
        setTimeout(function () {
            //等待队列吐出请求
            // console.log( "before ", _runQueue.length, " wait = ", _requestQueue.length );
            if (_requestQueue.length > 0) {
                var nextRequestObject = _requestQueue.splice(0, 1)[0];
                _runQueue.push(nextRequestObject);
                wx.request(nextRequestObject);
            }
            // console.log( "after ", _runQueue.length, " wait = ", _requestQueue.length );
        }, 0);
    }

    nComplete.startTime = +new Date();
    nComplete.requestID = object.requestID;
    object.complete = nComplete;

    // 添加一个正在请求的队列
    if (_runQueue.length >= __kMaxRequestCount) {
        // console.log("加入等待队列 ",object);
        _requestQueue.push(object);
    } else {
        _runQueue.push(object);
        wx.request(object);
    }

    return object.requestID;
}

requestd.request = util.wxPromisify(request);
requestd.cancel = cancel;

module.exports = requestd;