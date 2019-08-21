var oLimg = document.querySelectorAll(".lunbo li");
var oLi = document.querySelectorAll(".smallbtn li");
var timer;
var index = 0;
start();
for (var i = 0; i < oLi.length; i++) {
    oLi[i].onmouseover = function () {
        index = this.index;
        end();
        changeImg();
    }
    oLi[i].onmouseout = function () {
        start();
    }
}

function start() {
    timer = setInterval(() => {
        index++;
        if (index > 6) {
            index = 0;
        }
        changeImg();
    }, 1500);
}
function end() {
    if (timer) {
        clearInterval(timer);
    }
}

function changeImg() {
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLimg[i].classList.remove("active");
        oLi[i].classList.remove("active");
    }
    oLimg[index].classList.add("active");
    oLi[index].classList.add("active");
}

var loginId = getCookie("loginId");
var username = getCookie("username");
if (loginId) {
    $(".logintxt").html(`${username}&nbsp;&nbsp;<span>退出</span>`)
}
$(".logintxt span").click(function () {
    var html = `<a href="watchlogin.html">登录&nbsp;/&nbsp;</a>
    <a href="watchregist.html">注册</a>`;
    $(".logintxt").html(html);
    setCookie("loginId", "", -1);
    setCookie("username", "", -1);
});