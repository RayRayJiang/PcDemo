
$("#dlbtn").click(function () {
    var inputKey = $("#key").val();
    var inputUserpwd = $("#userpwd").val();
    if (inputKey == "" & inputUserpwd == "") {
        $(".shadowbox").show();
        $("#shadowtxt").html("用户名或密码不能为空");
        $("#shadowbtn").click(function () {
            $(".shadowbox").hide();
        });
    } else {
        function setLogin(inputKey, inputUserpwd) {
            var p = new Promise(function (resolve, reject) {
                $.ajax({
                    type: "get",
                    url: "http://rayy6369.gz01.bdysite.com/ray/php/login.php",
                    data: {
                        key: inputKey,
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
        setLogin(inputKey, inputUserpwd).then(function (obj) {
            if (obj["code"] == 1) {
                let loginId = obj["id"];
                setCookie("loginId", loginId, 7);
                setCookie("username", inputKey, 7);
                let backUrl = getCookie("backUrl");
                if (backUrl) {
                    window.location.href = backUrl;
                } else {
                    window.location.href = "zhuye.html";
                }
            } else {
                $(".shadowbox").show();
                $("#shadowtxt").html(obj["msg"]);
                $("#shadowbtn").click(function () {
                    $(".shadowbox").hide();
                });
            }
        });
    }
});