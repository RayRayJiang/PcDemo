<?php
@require_once("config.php");
$userid = $_GET["userid"];
$goodsid = $_GET["goodsid"];
$goodsname = $_GET["goodsname"];
$goodsprice = $_GET["goodsprice"];
$buynum = $_GET["buynum"];
$goodsimg = $_GET["goodsimg"];

$sql = "select count(*) from watchshopcar where userid=$userid and goodsid=$goodsid";
$result = mysql_query($sql);
$item = mysql_fetch_array($result);
if($item[0] > 0){
// 更新 
    $sql1 = "update watchshopcar set buynum = buynum+$buynum where userid=$userid and goodsid=$goodsid";
}else{
// 新增
    $sql1 = "insert INTO  watchshopcar(userid,goodsid,goodsname,goodsprice,buynum,goodsimg) values ($userid,$goodsid,'$goodsname',$goodsprice,$buynum,'$goodsimg')";
}

$result1 = mysql_query($sql1);
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