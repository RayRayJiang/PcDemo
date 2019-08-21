var oProvince = document.querySelector('#province');
var oCity = document.querySelector('#city');
var oQu = document.querySelector('#qu');
var xhr = new XMLHttpRequest();
xhr.open("get", "http://api.yytianqi.com/citylist/id/2", true);
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var result = xhr.responseText;
        var result = JSON.parse(result);
        var list = result["list"];
        list.forEach(provinceItem => {
            var {
                name,
                city_id
            } = provinceItem;
            var option = document.createElement("option");
            option.innerHTML = name;
            option.value = city_id;
            oProvince.appendChild(option);
        });
        oProvince.onchange = function () {
            var provinceId = this.value;
            var provinceInfo = list.filter(function (item) {
                return item["city_id"] == provinceId //找到跟省城市id相同的省份对象
            })[0];
            var citylist = provinceInfo["list"];
            oCity.innerHTML = `<option>请选择城市</option>`;
            oQu.innerHTML = `<option>请选择城市</option>`;
            citylist.forEach(function (item) {
                var {
                    name,
                    city_id
                } = item;
                var option = document.createElement('option');
                option.value = city_id;
                option.innerHTML = name;
                oCity.appendChild(option);
            })
            oCity.onchange = function () {
                var cityId = this.value; //找到当前的城市id
                var quInfo = citylist.filter(function (item) {
                    return item["city_id"] == cityId;
                })[0];
                qulist = quInfo["list"];
                oQu.innerHTML = `<option>请选择城市</option>`;
                qulist.forEach(function (item) {
                    var {
                        name,
                        city_id
                    } = item;
                    var option = document.createElement('option');
                    option.value = city_id;
                    option.innerHTML = name;
                    oQu.appendChild(option);
                });
            }
        }
    }
}

var userid = getCookie("loginId");
setAddress();

function setAddress() {
    $.ajax({
        type: "get",
        url: "http://rayy6369.gz01.bdysite.com/ray/php/zjaddress.php",
        data: {
            userid: userid
        },
        dataType: "json",
        success: function (list) {
            var html = "";
            list.forEach(item => {
                var { id, provincename, cityname, townname, streetname, receiver, receivertel } = item;
                html += `<ul>
                        <li class="username">
                            <div class="name">${receiver}</div>
                            <div class="tel">电话: ${receivertel}</div>
                            <div class="addbtn">送货到该地址</div>
                        </li>
                        <li class="usermsg">
                            <p>${provincename} ${cityname} ${townname} ${streetname}</p>
                            <div class="bianji">编辑</div>
                            <div class="del" data-id=${id}>删除</div>
                        </li>
                    </ul> `;
            });
            $(".addressmid").html(html);
        }
    });
}

document.onclick = function (e) {
    var ev = event || e;
    var target = ev.target || ev.srcElement;
    if (target.className == "del") {
        var id = target.getAttribute("data-id");
        $.ajax({
            type: "get",
            url: "http://rayy6369.gz01.bdysite.com/ray/php/deladdress.php",
            data: {
                id: id
            },
            dataType: "json",
            success: function (obj) {
                if (obj["code"] == 1) {
                    $(target).parent().parent().remove();
                } else {
                    alert(obj["msg"]);
                }
            }
        });
    }
}

$(".addressbtn").click(function () {
    var newname = $(".newname").val();
    var newTel = $(".newtel").val();
    var newProvince = $("#province option:selected").html();
    var newCity = $("#city option:selected").html();
    var newQu = $("#qu option:selected").html();
    var street = $(".street").val();
    if (newname == "" || newTel == "" || newProvince == "" || newCity == "" || newQu == "" || street == "") {
        $(".shadowbox").show();
        $("#shadowtxt").html("输入内容不能为空");
        $("#shadowbtn").click(function () {
            $(".shadowbox").hide();
        });
    } else {
        $.ajax({
            type: "get",
            url: "http://rayy6369.gz01.bdysite.com/ray/php/address.php",
            data: {
                userid: userid,
                provincename: newProvince,
                cityname: newCity,
                townname: newQu,
                streetname: street,
                receiver: newname,
                receivertel: newTel
            },
            dataType: "json",
            success: function (obj) {
                if (obj["code"] == 1) {
                    setAddress();
                    $(".newname").val("");
                    $(".newtel").val("");
                    $("#province").html(`<option value="">请选择省份</option>`);
                    $("#city").html(`<option value="">请选择城市</option>`);
                    $("#qu").html(`<option value="">请选择城区</option>`);
                    $(".street").val("");
                } else {
                    alert(obj["添加失败"]);
                }
            }
        });
    }
});





