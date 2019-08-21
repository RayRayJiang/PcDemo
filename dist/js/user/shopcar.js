var goodsList = document.querySelector(".goodslist");
var loginId = getCookie("loginId");

if (loginId) {
    $.ajax({
        type: "get",
        url: "http://rayy6369.gz01.bdysite.com/ray/php/shopcarlist.php",
        data: {
            userid: loginId
        },
        dataType: "json",
        success: function (list) {
            var html = "";
            list.forEach(item => {
                var { id, goodsid, goodsname, buynum, goodsprice, goodsimg } = item;
                html += `<ul id="goodsone" class="ul_${id}">
            <li class="check_one">
                <input type="checkbox" class="checkone" data-id=${id}>
            </li>
            <li class="namebox">
                <div class="imgbox">
                    <img src="../imges/goodsimges/${goodsimg}.jpg" alt="">
                </div>
                <span>${goodsname}</span>
            </li>
            <li class="listprice">${(goodsprice * 1).toFixed(2)}</li>
            <li class="listnum">
                <span class="leftbtn" data-id=${id} data-price=${goodsprice}>-</span>
                <input id="inputnum" type="text" value="${buynum}">
                <span class="rightbtn" data-id=${id} data-price=${goodsprice}>+</span>
            </li>
            <li class="listtotal">${(buynum * goodsprice).toFixed(2)}</li>
            <li class="listset" data-id=${id}>删除</li>
        </ul>`;
            });
            goodsList.innerHTML = html;
        }
    });
} else {
    setCookie("backUrl", window.location.href, 7);
    window.location.href = "watchlogin.html";
}

document.onclick = function (e) {
    var ev = event || e;
    var target = ev.target || ev.srcElement;
    switch (target.className) {
        case "rightbtn": // 加数量
            var id = target.getAttribute("data-id");
            var goodsprice = target.getAttribute("data-price");
            $.ajax({
                type: "get",
                url: "http://rayy6369.gz01.bdysite.com/ray/php/addshopcar.php",
                data: {
                    id: id,
                    num: 1
                },
                dataType: "json",
                success: function (obj) {
                    if (obj["code"] == 1) {
                        var inputValue = $(target).prev().val();
                        inputValue = inputValue * 1 + 1;
                        $(target).prev().val(inputValue);
                        $(target).parent().next().html((inputValue * goodsprice).toFixed(2));
                        getTotal();
                    } else {
                        alert(obj["msg"]);
                    }
                }
            });
            break;

        case "leftbtn": // 减数量
            var chushi = $(target).next().val();
            if (chushi > 1) {
                var id = target.getAttribute("data-id");
                var goodsprice = target.getAttribute("data-price");
                $.ajax({
                    type: "get",
                    url: "http://rayy6369.gz01.bdysite.com/ray/php/addshopcar.php",
                    data: {
                        id: id,
                        num: -1
                    },
                    dataType: "json",
                    success: function (obj) {
                        if (obj["code"] == 1) {
                            var inputValue = $(target).next().val();
                            inputValue = inputValue * 1 - 1;
                            $(target).next().val(inputValue);
                            $(target).parent().next().html((inputValue * goodsprice).toFixed(2));
                            getTotal();
                        } else {
                            alert(obj["msg"]);
                        }
                    }
                });
            }
            break;

        case "listset": // 删除单个
            var id = target.getAttribute("data-id");
            $.ajax({
                type: "get",
                url: "http://rayy6369.gz01.bdysite.com/ray/php/delete.php",
                data: {
                    id: id
                },
                dataType: "json",
                success: function (obj) {
                    if (obj["code"] == 1) {
                        $(target).parent().remove();
                        getTotal();
                    } else {
                        alert(obj["msg"]);
                    }
                }
            });
            break;

        case "checkall": // 全选
            var checkoneList = document.querySelectorAll(".checkone");
            checkoneList.forEach(item => {
                item.checked = target.checked;
                getTotal();
            });
            break;

        case "checkone": // 单选
            var count = 1;
            var checkoneList = document.querySelectorAll(".checkone");
            checkoneList.forEach(item => {
                count *= item.checked;
            });
            if (count == 1) {
                document.querySelector(".checkall").checked = true;
            } else {
                document.querySelector(".checkall").checked = false;
            }
            getTotal();
            break;

        case "delall":
            var ids = [];
            var checkoneList = document.querySelectorAll(".checkone");
            checkoneList.forEach(item => {
                let id = item.getAttribute("data-id");
                if (item.checked) {
                    ids.push(id);
                }
            });
            $.ajax({
                type: "get",
                url: "http://rayy6369.gz01.bdysite.com/ray/php/delete.php",
                data: {
                    id: ids.join(",")
                },
                dataType: "json",
                success: function (obj) {
                    if (obj["code"] == 1) {
                        ids.forEach(id => {
                            document.querySelector(".ul_" + id).remove();
                            getTotal();
                        })
                    } else {
                        alert(obj["msg"]);
                    }
                }
            });
            break;
    }
}
function getTotal() {
    var num = 0;
    var total = 0;
    var checkoneList = document.querySelectorAll(".checkone");
    checkoneList.forEach(item => {
        if (item.checked) {
            var tr = $(item).parent().parent();
            var count = tr.find("#inputnum").val();
            var subtotal = tr.find(".listtotal").html();
            num += count * 1;
            total += subtotal * 1;
        }
    });
    $(".totalnum").html(num);
    $(".totalmoney").html(total.toFixed(2));
}

// $(".gopay").click(function () {
//         if ($(".checkone:checked").length > 0) {
//             window.location.href = "address.html";
//         } else {
//             alert();
//         }
// });
