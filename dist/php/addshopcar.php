<?php
@require_once("config.php");
$id = $_GET["id"];
$num = $_GET["num"];
$sql = "update  watchshopcar set buynum = buynum+$num where id = $id";
mysql_query($sql);
$count = mysql_affected_rows();
$obj = array();
if($count > 0){
    $obj["code"] = 1;
    $obj["msg"] = "添加成功";
}else{
    $obj["code"] = 0;
    $obj["msg"] = "添加失败";
}
echo json_encode($obj);
?>