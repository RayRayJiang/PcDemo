<?php
@header("content-type:text/html;charset=utf-8");
@header("Access-Control-Allow-Origin: *");
$con = mysql_connect("b-5pkkyhtzapzmpf.bch.rds.gz.baidubce.com", "b_5pkkyhtzapzmpf", "g2g4IipWwfYfIhWD");
$select_db = mysql_select_db("b_5pkkyhtzapzmpf");
mysql_query("set character set 'utf8'");

?>