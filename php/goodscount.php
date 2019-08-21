<?php
@require_once("config.php");
$sql = "SELECT COUNT(*) FROM goodslist";
$result = mysql_query($sql);
$item = mysql_fetch_array($result);
$obj = array();
$obj["count"] = $item["0"];
echo json_encode($obj);

?>