<?php
@require_once("config.php");
$id = $_GET["id"];
$sql = "SELECT * FROM goodslist  WHERE id=$id";
$result = mysql_query($sql);
$item = mysql_fetch_array($result);

$obj = array();
$obj["id"] = $item["id"];
$obj["goodsid"] = $item["goodsid"];
$obj["goodsname"] = $item["goodsname"];
$obj["goodsprice"] = $item["goodsprice"];
$obj["goodsimg"] = $item["goodsimg"];
$obj["goodsnum"] = $item["goodsnum"];
$obj["assessnum"] = $item["assessnum"];
echo json_encode($obj);
?>