<?php
error_reporting(E_ERROR | E_PARSE);
$db = 1; // zmiena pozwalajaca na rozruch pliku connection.php
require("config.php"); // dane logowania mysql
require("connection.php"); // polaczenie z baza danych

if(isset($_GET["id"]) && isset($_GET["getcam"])){
	if(isset($_GET["camtest"])){
		$camtest = $_GET["camtest"];
	}else{
		$camtest = 0;
	}
	$id = $_GET["id"];
	$getcam = $_GET["getcam"];

	if($getcam==1){
		$db_query = mysqli_query($con,"SELECT camdata.id, camdata.ip, camdata.name, camdata.password, camdata.port, camdata.url, camdata.username FROM camdata WHERE id=$id;");
		$db_row = mysqli_fetch_assoc($db_query);

		$server = 	$db_row["ip"];
		$port = 	$db_row["port"];
		$url =		$db_row["url"];
		$username = $db_row["username"];
		$password = $db_row["password"];

		set_time_limit(0);
		$fp = fsockopen($server, $port, $errno, $errstr, 3);
		if(!$fp){
			if($errno=111){
				echo"-1";
			}
			//echo "$errstr($errno)<br>\n";
			//echo "problemik";
		}else{
			if($camtest==0){
			$header="POST /video HTTP/1.1\r\n".
				"Host:10.0.1.2\n".
				"Content-Type: application/x-www-form-urlencoded\r\n".
				"User-Agent: PHP-Code\r\n".
				"Authorization: Basic ".base64_encode($username.':'.$password)."\r\n".
				"Connection: close\r\n\r\n";
			fputs($fp, $header);
			while($str=trim(fgets($fp, 4096))){
				header($str);
				//TODO: Error kiedy polaczenie z serwerem jest ale brak obrazu
			}
			fpassthru($fp);
			fclose($fp);
			}else if($camtest==1){
				echo 1;
			}
		}
	}else{
		echo "getcam error!";
	}

}else{
	echo "Tell me something about camera";
}
?>
