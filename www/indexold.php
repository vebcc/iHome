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

if(isset($_GET["lname"]) && isset($_GET["lvalue"])){ // formget
    $name = $_GET["lname"];
    $value = $_GET["lvalue"];
    $newmessage =  $name.$value;

    $fp = fopen("http://10.0.2.3/$newmessage", "r");
    $newmessage = fread($fp,"2");
    fclose($fp);
}

if(isset($_GET["bname"]) && isset($_GET["bvalue"])){ // formget
    $name = $_GET["bname"];
    $value = $_GET["bvalue"];
    $newmessage =  $name."=".$value;

    $fp = fopen("http://10.0.2.4/?$newmessage", "r");
    $newmessage = fread($fp,"2");
    fclose($fp);
}

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

function getsetlamp($lenk, $dev=0){ // pobioeranie danych
    $tosend = "";

    $fp = fopen("http://10.0.2.3/$lenk", "r");
    $tosend = fread($fp,"1");
    fclose($fp);

    if($dev==0){
        echo $tosend;
    }else{
        return $tosend;
    }
}

function getsetbed($lenk, $dev=0){ // pobioeranie danych
    $tosend = "";

    $fp = fopen("http://10.0.2.4/?$lenk", "r");
    $tosend = fread($fp,"1");
    fclose($fp);

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
                  <h3>Lampa Zimny</h3>
                  <div class="btn-group center">
                      <a href="index.php?lname=lamp1&lvalue=change" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?lname=lamp1&lvalue=off" class="btn btn-primary btn-lg <?php if(getsetlamp("lamp1status", 1)==1){echo 'active';} ?>">On</a>
                      <a href="index.php?lname=lamp1&lvalue=on" class="btn btn-primary btn-lg  <?php if(getsetlamp("lamp1status", 1)==0){echo 'active';} ?>">Off</a>
                  </div>
              </div>

              <div class="col-md-3">
                  <h3>Lampa Cieply</h3>
                  <div class="btn-group center">
                      <a href="index.php?lname=lamp2&lvalue=change" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?lname=lamp2&lvalue=off" class="btn btn-primary btn-lg <?php if(getsetlamp("lamp2status", 1)==1){echo 'active';} ?>">On</a>
                      <a href="index.php?lname=lamp2&lvalue=on" class="btn btn-primary btn-lg  <?php if(getsetlamp("lamp2status", 1)==0){echo 'active';} ?>">Off</a>
                  </div>
              </div>

              <div class="col-md-3">
                  <h3>Lampa Lekka</h3>
                  <div class="btn-group center">
                      <a href="index.php?lname=lamp3&lvalue=change" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?lname=lamp3&lvalue=off" class="btn btn-primary btn-lg <?php if(getsetlamp("lamp3status", 1)==1){echo 'active';} ?>">On</a>
                      <a href="index.php?lname=lamp3&lvalue=on" class="btn btn-primary btn-lg  <?php if(getsetlamp("lamp3status", 1)==0){echo 'active';} ?>">Off</a>
                  </div>
              </div>

              <div class="col-md-3">
                  <h3>Biurko Right</h3>
                  <div class="btn-group center">
                      <a href="index.php?name=biurkoright&value=change" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?name=biurkoright&value=off" class="btn btn-primary btn-lg <?php if(getset("status=biurkoright", 1)==0){echo 'active';} ?>">On</a>
                      <a href="index.php?name=biurkoright&value=on" class="btn btn-primary btn-lg <?php if(getset("status=biurkoright", 1)==1){echo 'active';} ?>">Off</a>
                  </div>
              </div>

              <div class="col-md-3">
                  <h3>Laser Disco</h3>
                  <div class="btn-group center">
                      <a href="index.php?bname=discot&bvalue=2" class="btn btn-primary btn-lg">Change</a>
                      <a href="index.php?bname=discot&bvalue=0" class="btn btn-primary btn-lg <?php if(getsetbed("discot=3", 1)==1){echo 'active';} ?>">On</a>
                      <a href="index.php?bname=discot&bvalue=1" class="btn btn-primary btn-lg <?php if(getsetbed("discot=3", 1)==0){echo 'active';} ?>">Off</a>
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
