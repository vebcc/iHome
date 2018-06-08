<?php

include 'include/PhpSerial.php';
$serial = new PhpSerial;
$serial->deviceSet("/dev/ttyUSB0");
$serial->confBaudRate(9600);
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);
$serial->confFlowControl("none");
$serial->deviceOpen();

if(isset($_GET["name"]) && isset($_GET["value"])){
    $name = $_GET["name"];
    $value = $_GET["value"];
    $newmessage =  "$$name=$value#";



    //sleep(2);//delay
    $serial->sendMessage($newmessage);

    //$read = $serial->readPort();


}

//$serial->sendMessage($commandref[0]);
//sleep(1);
//$read = $serial->readPort();
//echo "Wynik: $read";
$commandref = array ('$values=glosnikiled#');

function getset($lenk){
    $tosend = "";
    global $serial;
    global $commandref;
    $serial->sendMessage($commandref[$lenk]);
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

    echo $tosend;
}


?>

<html>
    <head>
        <title>Panel - iHome</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <div class="container-fluid center">
          <div class="jumbotron">
              <h1>Panel iHome</h1>
          </div>
          <div class="row">

              <div class="col-md-3">
                  <h3>Biurko Led</h3>
                  <div class="btn-group center">
                      <a href="index.php?name=biurkoled&value=change" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?name=biurkoled&value=off" class="btn btn-primary btn-lg">On</a>
                      <a href="index.php?name=biurkoled&value=on" class="btn btn-primary btn-lg">Off</a>
                  </div>
              </div>

              <div class="col-md-3">
                  <h3>Głosniki LED</h3>
                  <div class="btn-group center">
                      <a href="index.php?name=glosnikiled&value=change" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?name=glosnikiled&value=on" class="btn btn-primary btn-lg">On</a>
                      <a href="index.php?name=glosnikiled&value=off" class="btn btn-primary btn-lg">Off</a>
                  </div>
                  <div class="center">
                      <span>1</span><input class="range" value="<?php getset(0); ?>" type="range" name="glosnikiled" min="1" max="100" step="1" onchange="range(this.value)"><span>100</span>
                  </div>
              </div>

              <div class="col-md-3">
                  <h3>Biurko Right</h3>
                  <div class="btn-group center">
                      <a href="index.php?name=biurkoled&value=change" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?name=biurkoled&value=off" class="btn btn-primary btn-lg">On</a>
                      <a href="index.php?name=biurkoled&value=on" class="btn btn-primary btn-lg">Off</a>
                  </div>
              </div>

              <div class="col-md-3">
                  <h3>Laser Disco</h3>
                  <div class="btn-group center">
                      <a href="index.php?name=biurkoled&value=change" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?name=biurkoled&value=off" class="btn btn-primary btn-lg">On</a>
                      <a href="index.php?name=biurkoled&value=on" class="btn btn-primary btn-lg">Off</a>
                  </div>
              </div>

          </div>


        </div>

    </body>
    <script src="js/range.js"></script>
    <!-- Bootstrap core JavaScript -->
    <script src="jquery/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
</html>
<?php
$serial->deviceClose();
?>
