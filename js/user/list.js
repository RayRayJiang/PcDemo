var goodsList = document.querySelector(".goodslist");
var searchInput = document.querySelector("#serach");
var chaBtn = document.querySelector("#chabtn");
var orderList = document.getElementsByName("order");
var rankList = document.getElementsByName("rank");

var searchValue = "";
var order = "goodsprice";
var rank = "asc";
var showNum = 6;
var pageIndex = 1;
setData(searchValue, order, rank, showNum, pageIndex);

chaBtn.onclick = function () {
    searchValue = searchInput.value;
    setData(searchValue, order, rank, showNum, pageIndex);
};
for (var i = 0; i < orderList.length; i++) {
    orderList[i].onclick = function () {
        order = this.value;
        setData(searchValue, order, rank, showNum, pageIndex);
    }
}
for (var i = 0; i < rankList.length; i++) {
    rankList[i].onclick = function () {
        rank = this.value;
        setData(searchValue, order, rank, showNum, pageIndex);
    }
}

$.ajax({
    type: "get",
    url: "http://rayy6369.gz01.bdysite.com/ray/php/goodscount.php",
    dataType: "json",
    success: function (obj) {
        let count = obj["count"];
        new Page("#content", {
            count: count,
            shownum: showNum,
            showpage: 5,
            callBack: function (pageIndex) {
                setData(searchValue, order, rank, showNum, pageIndex);
            }
        })
    }
});

function setData(searchValue, order, rank, showNum, pageIndex) {
    $.ajax({
        type: "get",
        url: "http://rayy6369.gz01.bdysite.com/ray/php/goodslist.php",
        data: {
            searchValue: searchValue,
            order: order,
            rank: rank,
            skipNum: (pageIndex - 1) * showNum,
            showNum: showNum
        },
        dataType: "json",
        success: function (objlist) {
            var html = "";
            objlist.forEach(item => {
                var { id, goodsid, goodsname, goodsprice, goodsimg } = item;
                html += `<ul class="goods" onclick=window.con(${id})>
                            <li>
                                <img src="../imges/goodsimges/${goodsimg}.jpg" alt="">
                            </li>
                            <p>${goodsname}</p>
                            <p>${goodsid}</p>
                            <b>￥${goodsprice}.00</b>
                        </ul>`;
            });
            goodsList.innerHTML = html;
        }
    });
}
function con(id) {
    window.location.href = `listdetail.html?id=${id}`;
}

var loginId = getCookie("loginId");
var username = getCookie("username");
if (loginId) {
    $(".logintxt").html(`${username}&nbsp;&nbsp;<span>退出</span>`);
}
$(".logintxt span").click(function () {
    var html = `<a href="watchlogin.html">登录&nbsp;/&nbsp;</a>
    <a href="watchregist.html">注册</a>`;
    $(".logintxt").html(html);
    setCookie("loginId", "", -1);
    setCookie("username", "", -1);
});