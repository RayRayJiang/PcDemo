<?php
@require_once("config.php");
$id = $_GET["id"]; 
$sql = "DELETE from addresslist where id=$id";
mysql_query($sql);
$count = mysql_affected_rows(); 
$obj = array();
if($count > 0){
    $obj["code"] = 1;
    $obj["msg"] = "成功删除";
}else{
    $obj["code"] = 0;
    $obj["msg"] = "删除失败";
}
echo json_encode($obj);

?>