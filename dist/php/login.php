<?php
@require_once("config.php");
$key = $_GET["key"];
$userpwd = $_GET["userpwd"];
$sql = "select * from userlist where username = '$key' or usertel = '$key'";
$result = mysql_query($sql);
$item = mysql_fetch_array($result);
$obj = array();
if($item){
    if($item["userpwd"] == $userpwd){
        $obj["code"] = 1;
        $obj["msg"] = "登陆成功";
        $obj["id"] = $item["id"];
    }else{
        $obj["code"] = 0;
        $obj["msg"] = "密码错误";
    }
}else{
    $obj["code"] = 0;
    $obj["msg"] = "用户名或手机号不存在";
}
echo json_encode($obj);
?>