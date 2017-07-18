<?php
	header("Content-Type:application/json;charset=utf-8");
	$name=$_POST["name"];
	$email=$_POST["email"];
	$msg=$_POST["msg"];
	$result='{"name":'.$name.',"email":'.$email.',"msg":'.$msg.'}';
	echo $result;
?>