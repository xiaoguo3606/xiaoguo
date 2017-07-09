<?php
//	header("Content-Type:application;charset=utf-8");
	session_start();
	if (!isset($_SESSION["user"]))/*检测用户是否是首次访问*/
	{
		$_SESSION["user"] = "user";
		$_SESSION["count"] = "count";
	} else {
		$_SESSION["count"] = "no";
	}
	$filename = 'counter.txt';
	if (!file_exists($filename)){
		$counte = 0;
	}else{
		$counte = file_get_contents($filename);
	}
	if ($_SESSION['count'] == "count") {/*防止用户反复刷新*/
		$_SESSION['user'] = 'true';
		$counte++;
		/*增加访客次数*/
	}
	
	echo "欢迎您，本站总计访问量： $counte 次";
	file_put_contents($filename, $counte);
	/*将计数结果写入文件*/
?>