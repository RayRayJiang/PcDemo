<?php
@require_once("config.php");
$searchValue = $_GET["searchValue"];
$order = $_GET["order"];
$rank = $_GET["rank"];
$skipNum = $_GET["skipNum"];
$showNum = $_GET["showNum"];
$sql = "SELECT * FROM goodslist WHERE goodsname LIKE '%$searchValue%' ORDER BY $order $rank limit $skipNum,$showNum";
$result = mysql_query($sql);

$list = array();
while($item = mysql_fetch_array($result)){
    $obj = array();
    $obj["id"] = $item["id"];
    $obj["goodsid"] = $item["goodsid"];
    $obj["goodsname"] = $item["goodsname"];
    $obj["goodsprice"] = $item["goodsprice"];
    $obj["goodsimg"] = $item["goodsimg"];
    $obj["goodsnum"] = $item["goodsnum"];
    $obj["assessnum"] = $item["assessnum"];
    $list[] = $obj;
}
echo json_encode($list);

?>