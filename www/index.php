<?php
if(isset($_GET["name"]) && isset($_GET["value"])){
    $name = $_GET["name"];
    $value = $_GET["value"];
    $newmessage =  "$$name=$value#";

    include 'include/PhpSerial.php';
    $serial = new PhpSerial;
    $serial->deviceSet("/dev/ttyUSB0");
    $serial->confBaudRate(9600);
    $serial->confParity("none");
    $serial->confCharacterLength(8);
    $serial->confStopBits(1);
    $serial->confFlowControl("none");
    $serial->deviceOpen();

    //sleep(2);//delay
    $serial->sendMessage($newmessage);

    //$read = $serial->readPort();

    $serial->deviceClose();
}
?>

<html>
    <head>

    </head>
    <body>
    <a href="index.php?name=biurkoled&value=change">Dodaj</a>
    </body>

</html>
<?php
