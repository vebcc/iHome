<?php

$db = 1; // zmiena pozwalajaca na rozruch pliku connection.php
require("config.php"); // dane logowania mysql
require("connection.php"); // polaczenie z baza danych

////////////////////////////////////////////////////
// Odbieranie komend i komunikacja z kontrolerami //
////////////////////////////////////////////////////

if(isset($_GET["id"]) && isset($_GET["name"]) && isset($_GET["value"])){ // formget
    $id = $_GET["id"];
    $name = $_GET["name"];
    $value = $_GET["value"];
    $dev=0;
    if(isset($_GET["dev"])){
        $dev=1;
    }
    $db_query = mysqli_query($con,"SELECT ip FROM devices WHERE id=$id");
    $db_row = mysqli_fetch_assoc($db_query);
    $reqip = $db_row["ip"];
    $newmessage =  $name.$value;
    $fp = @fopen("http://$reqip/$newmessage", "r"); //good
    if($fp){
        $newmessage = fread($fp,"30");
        fclose($fp);
        //getset($id ,$name."status");
        if($dev==0){
            echo $newmessage;
        }else{
            return $newmessage;
        }
    }else{
        $db_query = mysqli_query($con,"SELECT errorlog.from, errorlog.error, errorlog.dev_id FROM errorlog ORDER BY date DESC LIMIT 1");
        $db_row = mysqli_fetch_assoc($db_query);
        $from = $db_row["from"];
        $error = $db_row["error"];
        $devid = $db_row["dev_id"];
        if($from!="handlers" && $error!="data" && $devid!=$id){
            $db_query = mysqli_query($con,"INSERT INTO `ihome`.`errorlog` (`id`, `from`, `error`, `date`, `value` , `dev_id` ) VALUES (NULL, 'handlers', 'data', CURRENT_TIMESTAMP, 'Błąd komunikacji z kontrolerem' , $id)");
        }
        if($dev==0){
            echo -1;
        }else{
            return -1;
        }
    }
}

$con->close(); // konczenie polaczenia z baza danych
?>
