function spanShow(name, spantxt) {
    $(name).click(function () {
        $(spantxt).show();
    }).blur(function () {
        $(spantxt).hide();
    });
}
spanShow("#username", ".usertxt");
spanShow("#userpwd", ".pwdtxt");
spanShow("#usertel", ".teltxt");

function judge(ele, name, spantxt) {
    var result = ele.test($(name).val());
    if (result === true) {
        $(spantxt).show().html("√").css("color", "green");
        return result;
    } else {
        $(spantxt).show().css("color", "red");
        return result;
    }
}

$("#zcbtn").click(function () {
    judge(/^[0-9a-zA-z\u4E00-\u9FA5]{7,14}$/, "#username", ".usertxt");
    judge(/^1\d{10}$/, "#usertel", ".teltxt");
    judge(/^[0-9a-zA-Z]{8,14}$/, "#userpwd", ".pwdtxt");

    if (judge(/^[0-9a-zA-z\u4E00-\u9FA5]{7,14}$/, "#username", ".usertxt") === false) {
        return;
    }
    if (judge(/^1\d{10}$/, "#usertel", ".teltxt") === false) {
        return;
    }
    if (judge(/^[0-9a-zA-Z]{8,14}$/, "#userpwd", ".pwdtxt") === false) {
        return;
    }

    var inputUsername = $("#username").val();
    var inputUsertel = $("#usertel").val();
    var inputUserpwd = $("#userpwd").val();
    setRegist(inputUsername, inputUsertel, inputUserpwd).then(function (obj) {
        if (obj["code"] == 1) {
            window.location.href = "watchlogin.html";
        } else {
            $(".usertxt").show().html("用户名或手机号已存在").css("color","red");
        }
    });
});

function setRegist(inputUsername, inputUsertel, inputUserpwd) {
    var p = new Promise(function (resolve, reject) {
        $.ajax({
            type: "get",
            url: "http://rayy6369.gz01.bdysite.com/ray/php/userlist.php",
            data: {
                username: inputUsername,
                usertel: inputUsertel,
                userpwd: inputUserpwd
            },
            dataType: "json",
            success: function (obj) {
                resolve(obj);
            }
        });
    });
    return p;
}





