<?php
@require_once("config.php");
$userid = $_GET["userid"];
$provincename = $_GET["provincename"];
$cityname = $_GET["cityname"];
$townname = $_GET["townname"];
$streetname = $_GET["streetname"];
$receiver = $_GET["receiver"];
$receivertel = $_GET["receivertel"];

$sql = "insert INTO  addresslist(userid,provincename,cityname,townname,streetname,receiver,receivertel) values ($userid,'$provincename','$cityname','$townname','$streetname','$receiver',$receivertel)";
$result = mysql_query($sql);
$count = mysql_affected_rows();
$obj = array();
if($count > 0){
    $obj["code"] = 1;
    $obj["msg"] = "加入成功";
}else{
    $obj["code"] = 0;
    $obj["msg"] = "加入失败";
}
echo json_encode($obj);


?>