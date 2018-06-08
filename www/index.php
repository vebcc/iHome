<?php

include 'include/PhpSerial.php'; //biblioteka do seriala
$serial = new PhpSerial; // deklaracja nowego seriala
$serial->deviceSet("/dev/ttyUSB0"); // sciezka do serialmonitora
$serial->confBaudRate(9600); // baudrate
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);
$serial->confFlowControl("none");
$serial->deviceOpen(); // open port

if(isset($_GET["name"]) && isset($_GET["value"])){ // formget
    $name = $_GET["name"];
    $value = $_GET["value"];
    $newmessage =  "$$name=$value#";

    $serial->sendMessage($newmessage); // send messange
}

//$commandref = array ('$values=glosnikiled#', '$status=biurkoled#'); // lista komend

function getset($lenk, $dev=0){ // pobioeranie danych
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
                      <a href="index.php?name=biurkoled&value=off" class="btn btn-primary btn-lg <?php if(getset("status=biurkoled", 1)==0){echo 'active';} ?>">On</a>
                      <a href="index.php?name=biurkoled&value=on" class="btn btn-primary btn-lg  <?php if(getset("status=biurkoled", 1)==1){echo 'active';} ?>">Off</a>
                  </div>
              </div>

              <div class="col-md-3">
                  <h3>Głosniki LED</h3>
                  <div class="btn-group center">
                      <a href="index.php?name=glosnikiled&value=change" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?name=glosnikiled&value=on" class="btn btn-primary btn-lg <?php if(getset("status=glosnikiled", 1)==1){echo 'active';} ?>">On</a>
                      <a href="index.php?name=glosnikiled&value=off" class="btn btn-primary btn-lg <?php if(getset("status=glosnikiled", 1)==0){echo 'active';} ?>">Off</a>
                  </div>
                  <div class="center slidecontainer">
                      <span></span><input class="range slider" value="<?php getset("values=glosnikiled"); ?>" id="myRange" type="range" name="glosnikiled" min="1" max="100" step="1" onchange="range(this.value)"><span></span>
                      <p>Jasność: <span id="demo"></span>%</p>
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
