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
    switch($id){
        case 1:
            $reqip ="10.0.2.6";
            break;
        case 2:
            $reqip ="10.0.2.3";
            break;
        case 3:
            $reqip ="10.0.2.4";
            break;
        case 4:
            $reqip ="10.0.2.5";
            break;
        case 5:
            $reqip ="10.0.2.7";
            break;
    }
    $newmessage =  $name.$value;
    $fp = @fopen("http://$reqip/$newmessage", "r"); //good
    if($fp){
        $newmessage = fread($fp,"10");
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
            echo 0;
        }else{
            return 0;
        }
    }
}

$con->close(); // konczenie polaczenia z baza danych
?>
