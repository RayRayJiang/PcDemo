<?php
@require_once("config.php");
$userid = $_GET["userid"];
$sql = "select * from addresslist where userid=$userid";
$result = mysql_query($sql);

$list = array();
while($item = mysql_fetch_array($result)){
    $obj = array();
    $obj["id"] = $item["id"];
    $obj["provincename"] = $item["provincename"];
    $obj["cityname"] = $item["cityname"];
    $obj["townname"] = $item["townname"];
    $obj["streetname"] = $item["streetname"];
    $obj["receiver"] = $item["receiver"];
    $obj["receivertel"] = $item["receivertel"];
    $list[] = $obj;
}
echo json_encode($list);
?>