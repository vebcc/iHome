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

if(isset($_GET["from"]) && isset($_GET["error"])  && isset($_GET["geterrorlog"])){ // formget
    $geterrorlog = $_GET["geterrorlog"];
    $from = $_GET["from"];
    $error = $_GET["error"];
    $db_query;
    if($geterrorlog==1){
        if($from=="*"){
            if($error=="*"){
                $db_query = mysqli_query($con,"SELECT errorlog.id, errorlog.from, errorlog.dev_id, errorlog.error, errorlog.date, errorlog.value FROM errorlog ORDER BY date DESC LIMIT 5");
            }else{
                $db_query = mysqli_query($con,"SELECT errorlog.id, errorlog.from, errorlog.dev_id, errorlog.error, errorlog.date, errorlog.value FROM errorlog WHERE errorlog.error=$error ORDER BY date DESC LIMIT 5");
            }
        }else{
            if($error!="*"){
                $db_query = mysqli_query($con,"SELECT errorlog.id, errorlog.from, errorlog.dev_id, errorlog.error, errorlog.date, errorlog.value FROM errorlog WHERE errorlog.from=$from ORDER BY date DESC LIMIT 5");
            }else{
                $db_query = mysqli_query($con,"SELECT errorlog.id, errorlog.from, errorlog.dev_id, errorlog.error, errorlog.date, errorlog.value FROM errorlog WHERE errorlog.from=$from AND errorlog.error=$error ORDER BY date DESC LIMIT 5");
            }
        }
        echo "<div><tr><th>ID</th><th>Plik</th><th>Urządzenie</th><th>Wartość</th><th>Data</th></tr></div>";
        while($db_row = mysqli_fetch_assoc($db_query)){
            $dbid = $db_row["id"];
            $dbfrom = $db_row["from"];
            $dberror = $db_row["error"];
            $dbdate = $db_row["date"];
            $dbvalue = $db_row["value"];
            $devid = $db_row["dev_id"];
            echo "<tr><td>$dbid</td><td>$dbfrom</td><td>$dberror - $devid</td><td>$dbvalue</td><td>$dbdate</td></tr>";

            //<td>$dbfrom</td><td>$dberror</td>

        }
        $db_query->free();
    }
}

$con->close(); // konczenie polaczenia z baza danych
?>
