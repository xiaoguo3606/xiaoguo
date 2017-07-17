<?php
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
		$count = 0;
	}else{
		$count = file_get_contents($filename);
	}
	if ($_SESSION['count'] == "count") {/*防止用户反复刷新*/
		$_SESSION['user'] = 'true';
		$count++;
		/*增加访客次数*/
	}
	
	echo "本站总访问量：".$count."次";
	file_put_contents($filename, $count);
	/*将计数结果写入文件*/
?>