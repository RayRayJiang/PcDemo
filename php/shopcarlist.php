<?php
@require_once("config.php");
$userid = $_GET["userid"];
$sql = "select * from watchshopcar where userid=$userid";
$result = mysql_query($sql);


$list = array();
while($item = mysql_fetch_array($result)){
    $obj = array();
    $obj["id"] = $item["id"];
    $obj["goodsid"] = $item["goodsid"];
    $obj["goodsname"] = $item["goodsname"];
    $obj["buynum"] = $item["buynum"];
    $obj["goodsimg"] = $item["goodsimg"];
    $obj["goodsprice"] = $item["goodsprice"];
    $list[] = $obj;
}
echo json_encode($list);
?>