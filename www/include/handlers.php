<?php

include '../PhpSerial.php'; //biblioteka do seriala
$serial = new PhpSerial; // deklaracja nowego seriala
$serial->deviceSet("/dev/ttyUSB0"); // sciezka do serialmonitora
$serial->confBaudRate(9600); // baudrate
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);
$serial->confFlowControl("none");
$serial->deviceOpen(); // open port

function getset($lenk, $dev=0){ // pobieranie danych z lamp po comie
    $tosend = "";
    $towrite = "$$lenk#";
    global $serial;

    $serial->sendMessage($towrite);
    $read = $serial->readPort();
    $i=0;
    $thisnot=true;
    while($thisnot){
        if($read[$i]!="%"){
            $tosend.=$read[$i];
        }else{
            $thisnot=false;
        }
        $i++;
    }
    if($dev==0){
        echo $tosend;
    }else{
        return $tosend;
    }
}

////////////////////////////////////////////////////
// Odbieranie komend i komunikacja z kontrolerami //
////////////////////////////////////////////////////

if(isset($_GET["id"]) && isset($_GET["name"]) && isset($_GET["value"])){ // formget
    $id = $_GET["id"];
    switch($id){
        case 1:
            $name = $_GET["name"];
            $value = $_GET["value"];
            $newmessage =  "$$name=$value#";

            $serial->sendMessage($newmessage); // send messange

            getset("status=$name", 0);
            break;
        case 2:

            break;

    }
}

//$name = "biurkoled";
//$value = "change";
//$newmessage =  "$$name=$value#";

//$serial->sendMessage($newmessage); // send messange

$serial->deviceClose();
?>
