<?php
	header("Content-Type:application/text;charset=utf-8");
	$name=$_POST["name"];
	$email=$_POST["email"];
	$msg=$_POST["msg"];
	
	$con=mysql_connect("localhost","xiaoguo3606","woainiDream123");
	
	if(!$con){
		die('Could not connect:'.mysql_error());
		echo '{"result":"error","success":"false"}';
	}
	
	mysql_select_db("xiaoguo3606",$con);
	
	$query="INSERT INTO usermessage(name,email,msg) VALUES('".$name."','".$email."','".$msg."')";
	if(!mysql_query($query,$con)){
		die('Error:'.mysql_error());
	}
	
	echo "success";
	mysql_close($con);
?>