// 判断是否为登录状态 
// jumpLogin 参数传 true 表示非登录状态会自动弹出登录页面
// pageObejct 当前页面对象
// example.
// isLogin(true, this)
function isLogin(jumpLogin, pageObejct) {
    var key = wx.getStorageSync('loginkey');
    if (key) {
        return true;
    } else {
        if (jumpLogin) {
            utils.globalLoginShow(pageObejct);
        }

        return false;
    }
}

// 调起登陆页
// pageObejct 当前页面对象
function jumpLogin(pageObejct) {
    
}

export { isLogin, jumpLogin }
