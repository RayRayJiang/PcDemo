
// 增删改
function setCookie(key, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() - 8);// 转时区
    document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";path=/;expires=" + date;
}

// 查询
function getCookie(key) {
    var str = document.cookie;
    if (str) {
        var cookieList = str.split("; ");
        for (var i = 0; i < cookieList.length; i++) {
            var cookieStr = cookieList[i];
            var cookieItem = cookieStr.split("=");
            var cookieKey = decodeURIComponent(cookieItem[0]);
            var cookieValue = decodeURIComponent(cookieItem[1]);
            if (cookieKey == key) {
                return cookieValue;
            }
        }
        return "";
    } else {
        return "";
    }
}
