<?php
$db = 1; // zmiena pozwalajaca na rozruch pliku connection.php
require("config.php"); // dane logowania mysql
require("connection.php"); // polaczenie z baza danych

if(isset($_GET["id"]) && isset($_GET["gettemp"])){ // formget
    $id = $_GET["id"];
    $gettemp = $_GET["gettemp"];
    // zapytanie sprawdzajace czy maincode sie zgadza
    if($gettemp==1){
        $db_query = mysqli_query($con,"SELECT HOUR(date) AS hour, MINUTE(date) AS min, AVG(temp) AS tout FROM temperature WHERE temp_id=$id AND  date >= now() - INTERVAL 23 HOUR GROUP BY hour ORDER BY date");
        while($db_row = mysqli_fetch_assoc($db_query)){
            $date = $db_row["hour"];
            $temp = $db_row["tout"];
            $minute = $db_row["min"];
            echo "$date, $minute, $temp,";
        }
        $db_query->free();
    }
}

if(isset($_GET["id"]) && isset($_GET["gethumi"])){ // formget
    $id = $_GET["id"];
    $gethumi = $_GET["gethumi"];
    // zapytanie sprawdzajace czy maincode sie zgadza
    if($gethumi==1){
        $db_query = mysqli_query($con,"SELECT HOUR(date) AS hour, MINUTE(date) AS min, AVG(humi) AS wout FROM humidity WHERE humi_id=$id AND  date >= now() - INTERVAL 23 HOUR GROUP BY hour ORDER BY date");
        while($db_row = mysqli_fetch_assoc($db_query)){
            $date = $db_row["hour"];
            $humi = $db_row["wout"];
            $minute = $db_row["min"];
            echo "$date, $minute, $humi,";
        }
        $db_query->free();
    }
}

if(isset($_GET["id"]) && isset($_GET["getsensordata"])){ // formget
	$id = $_GET["id"];
	$getdata = $_GET["getsensordata"];
	// zapytanie sprawdzajace czy maincode sie zgadza
	if($getdata==1){
		$db_query = mysqli_query($con,"SELECT count(motionsensor.mode) as ilosc, motionsensor.mode, HOUR(date) AS hour FROM motionsensor WHERE dev_id=$id AND date >= now() - INTERVAL 23 HOUR AND motionsensor.mode=1 GROUP BY hour ORDER BY date");
		while($db_row = mysqli_fetch_assoc($db_query)){
			$date = $db_row["hour"];
			$ilosc = $db_row["ilosc"];
			$mode = $db_row["mode"];
			echo "$date, $mode, $ilosc,";
		}
		$db_query->free();
	}
}

$con->close(); // konczenie polaczenia z baza danych
?>
