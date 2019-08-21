var smallImg = document.querySelectorAll("#smallimg li");
var bigImglist = document.querySelectorAll("#bigimg li");
var bigBoxlist = document.querySelectorAll(".bigbox img");
var bigImgbox = document.querySelector(".bigimgbox");

var serachStr = window.location.search;
var id = serachStr.split("=")[1]; // 数据库商品的id
var titleright = document.querySelector(".titleright");
var goodshu = document.querySelector(".goodshu");
var nameList = document.querySelector(".namelist");
var goodsBigimg = document.querySelector(".goodsbigimg");
var smallOne = document.querySelector(".smallone");
var bigOne = document.querySelector(".bigone");
var imgOne = document.querySelector(".imgone");
var addLeft = document.querySelector(".addleft");
var addRight = document.querySelector(".addright");
var loginId = getCookie("loginId");

var num = $("#numinput").val();
$(".numdown").click(function () {
    num -= 1;
    if (num <= 1) {
        num = 1;
    }
    $("#numinput").val(num);
});
$(".numup").click(function () {
    num = num * 1 + 1;
    $("#numinput").val(num);
});

if (id) {
    $.ajax({
        type: "get",
        url: "http://rayy6369.gz01.bdysite.com/ray/php/goodsdetail.php",
        data: {
            id: id
        },
        dataType: "json",
        success: function (obj) {
            var { id, goodsid, goodsname, goodsprice, goodsimg, goodsnum, assessnum } = obj;
            titleright.innerHTML = `<a href="zhuye.html">首页 / /</a>
                                <span>${goodsname}${goodsid}</span>`;

            goodshu.innerHTML = `<h3>${goodsname}${goodsid}</h3>
                            <div class="proprice">
                                <b>价格</b>
                                <span>￥${goodsprice}.00</span>
                            </div>
                            <div class="prodesc">
                                月销售量
                                <b>${goodsnum}</b>
                                <span>丨</span>
                                累计评价
                                <b>${assessnum}</b>
                            </div>`;

            nameList.innerHTML = `<li>
                                <span>商品名称 : </span>
                                ${goodsname}${goodsid}
                                </li>
                                <li>
                                    <span>商品编号 : </span>
                                    ${goodsid}
                                </li>
                                <li>
                                    <span>货号 : </span>
                                    ${goodsid}
                                </li>
                                <a href="">更多参数</a>`;

            goodsBigimg.innerHTML = `<img src="../imges/goodsimges/${goodsimg}.jpg" alt="">`;
            smallOne.innerHTML = `<img src="../imges/goodsimges/${goodsimg}.jpg" alt="">`;
            bigOne.innerHTML = `<img src="../imges/goodsimges/${goodsimg}.jpg" alt="">`;
            imgOne.src = `../imges/goodsimges/${goodsimg}.jpg`;

            addLeft.onclick = function () {
                if (loginId) {
                    $.ajax({
                        type: "get",
                        url: "http://rayy6369.gz01.bdysite.com/ray/php/watchshopcar.php",
                        data: {
                            userid: loginId,
                            goodsid: id,
                            goodsname: goodsname,
                            goodsprice: goodsprice,
                            buynum: num,
                            goodsimg: goodsimg
                        },
                        dataType: "json",
                        success: function (obj) {
                            if (obj["code"] == 1) {
                                $(".shadowbox").show();
                                $("#shadowtxt").html("加入成功");
                                $("#shadowbtn").click(function () {
                                    $(".shadowbox").hide();
                                });
                                $(".delbtn").click(function () {
                                    $(".shadowbox").hide();
                                });
                            } else {
                                alert(obj["msg"]);
                            }
                        }
                    });
                } else {
                    setCookie("backUrl", window.location.href, 7);
                    window.location.href = "watchlogin.html";
                }

            }
            addRight.onclick = function () {
                if (loginId) {
                    $.ajax({
                        type: "get",
                        url: "http://rayy6369.gz01.bdysite.com/ray/php/watchshopcar.php",
                        data: {
                            userid: loginId,
                            goodsid: id,
                            goodsname: goodsname,
                            goodsprice: goodsprice,
                            buynum: num,
                            goodsimg: goodsimg
                        },
                        dataType: "json",
                        success: function (obj) {
                            if (obj["code"] == 1) {
                                window.location.href = "shopcar.html"
                            } else {
                                alert(obj["msg"]);
                            }
                        }
                    });
                } else {
                    setCookie("backUrl", window.location.href, 7);
                    window.location.href = "watchlogin.html";
                }
            }
        }
    });
} else {
    window.location.href = "watchlist.html";
}


var index = 0;
for (var i = 0; i < smallImg.length; i++) {
    smallImg[i].index = i;
    smallImg[i].onmouseover = function () {
        index = this.index;
        changImg();
    }
}
function changImg() {
    for (var i = 0; i < smallImg.length; i++) {
        smallImg[i].classList.remove("active");
        bigImglist[i].classList.remove("active");
        bigBoxlist[i].classList.remove("active");
    }
    smallImg[index].classList.add("active");
    bigImglist[index].classList.add("active");
    bigBoxlist[index].classList.add("active");
}

var bigbox = document.querySelector(".bigbox");
var shadow = document.querySelector(".shadow");
bigImgbox.onmouseover = function () {
    shadow.style.display = "block";
    bigbox.style.display = "block";
    bigImgbox.onmousemove = function (e) {
        var ev = event || e;
        var x = ev.pageX - bigImgbox.offsetLeft - shadow.offsetWidth / 2;
        var y = ev.pageY - bigImgbox.offsetTop - shadow.offsetHeight / 2;
        var maxLeft = bigImgbox.offsetWidth - shadow.offsetWidth;
        var maxTop = bigImgbox.offsetHeight - shadow.offsetHeight;
        if (x <= 0) {
            x = 0;
        }
        if (x >= maxLeft) {
            x = maxLeft;
        }
        if (y <= 0) {
            y = 0;
        }
        if (y >= maxTop) {
            y = maxTop;
        }
        shadow.style.left = x + "px";
        shadow.style.top = y + "px";
        for (var i = 0; i < bigBoxlist.length; i++) {
            bigBoxlist[i].style.left = -(bigImgbox.offsetWidth / shadow.offsetWidth) * x + "px";
            bigBoxlist[i].style.top = -(bigImgbox.offsetHeight / shadow.offsetHeight) * y + "px";
        }
    }
}
bigImgbox.onmouseout = function () {
    shadow.style.display = "none";
    bigbox.style.display = "none";
}
