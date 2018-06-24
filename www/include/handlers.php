<?php

include 'PhpSerial.php'; //biblioteka do seriala
$serial = new PhpSerial; // deklaracja nowego seriala
$serial->deviceSet("/dev/ttyUSB0"); // sciezka do serialmonitora
$serial->confBaudRate(9600); // baudrate
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);
$serial->confFlowControl("none");
$serial->deviceOpen(); // open port

function getset($id, $lenk, $dev=0){ // pobieranie danych z lamp po comie
    $tosend = "";
    switch($id){
        case 1:
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
            break;

        case 2:
            $fp = fopen("http://10.0.2.3/$lenk", "r");
            $tosend = fread($fp,"1");
            fclose($fp);
            break;

        case 3:
            $fp = fopen("http://10.0.2.4/$lenk", "r");
            $tosend = fread($fp,"10");
            fclose($fp);
            break;
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
    $name = $_GET["name"];
    $value = $_GET["value"];
    if(isset($_GET["onlycheck"]) && $_GET["onlycheck"]==1){
        switch($id){
            case 1:
                getset($id ,"$value=$name", 0);
                break;

            case 2:
                getset($id ,$name."status", 0);
                break;

            case 3:
                getset($id ,$name.$value, 0);
                break;
        }
    }else{
        switch($id){
            case 1:
                $newmessage =  "$$name=$value#";
                $serial->sendMessage($newmessage); // send messange
                if($value=="on" || $value=="off" || $value=="change"){
                    getset($id ,"status=$name");
                }else{
                    getset($id ,"values=$name");
                }
                break;

            case 2:
                $newmessage =  $name.$value;
                $fp = fopen("http://10.0.2.3/$newmessage", "r");
                $newmessage = fread($fp,"2");
                fclose($fp);
                getset($id ,$name."status");

                break;

            case 3:
                $newmessage =  $name.$value;
                if($fp = fopen("http://10.0.2.4/$newmessage", "r")){
                    $newmessage = fread($fp,"10");
                    fclose($fp);
                    getset($id ,$name.$value);
                }else{
                    echo "error";
                }
                break;
        }
    }
}

$serial->deviceClose();
?>
