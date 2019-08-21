<?php
@require_once("config.php");
$username = $_GET["username"];
$userpwd = $_GET["userpwd"];
$usertel = $_GET["usertel"];
$sql1 = "select count(*) from userlist where username = '$username' or usertel = '$usertel'";
$ressult = mysql_query($sql1);
$item = mysql_fetch_array($ressult);

$obj = array();
if($item["0"] > 0){
    $obj["code"] = 0;
    $obj["msg"] = "用户名或手机号已存在";
}else{
    $sql2 = "INSERT INTO userlist(username,userpwd,usertel) VALUES('$username','$userpwd','$usertel')";
    mysql_query($sql2);
    $count = mysql_affected_rows();
    if($count > 0){
        $obj["code"] = 1;
        $obj["msg"] = "注册成功";
    }else{
        $obj["code"] = 0;
        $obj["msg"] = "注册失败";
    }
}
echo json_encode($obj);

?>