<?php
if(isset($_SESSION['token']) && isset($_SESSION['login']) && isset($_SESSION['token2'])){ // sprawdza czy zmienne sesji sa ustawione
    if($_SESSION['token']==md5($_SERVER['HTTP_USER_AGENT']) && $_SESSION['token2']==md5($_SERVER['REMOTE_ADDR'])){ // sprawdza czy zmienne sesji sa zgodne z danymi klienta
        $login = $_SESSION['login'];
        echo "Zalogowano jako $login";

        require("include/functions.php"); // include functions.php
?>
<html>
    <head>
        <title>Panel Sterowania - iHome</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <div class="container-fluid center">
            <div class="jumbotron">
               <div class="row">
                   <div class="col-md-12 row">
                       <div id="sun" class="col-md-6">
                           <h3><span class="glyphicon glyphicon-certificate"></span>  <span class="glyphicon glyphicon-triangle-top"></span> <span id="sunrise"></span> <span class="glyphicon glyphicon-triangle-bottom"></span> <span id="sunset"></span></h3>
                       </div>
                       <div id="title" class="col-md-6">
                           <h2>Panel Sterowania <b>IHome</b></h2>
                       </div>
                   </div>
                   <hr>
                    <div class="col-md-12 row">
						<div id="cam_2_mini" class="col-md-4"><img class='cam_mini_img' src='images/offline.jpg'></div>
						<div id="cam_3_mini" class="col-md-4"><img class='cam_mini_img' src='images/offline.jpg'></div>
						<div id="cam_1_mini" class="col-md-4"><img class='cam_mini_img' src='images/offline.jpg'></div>
                   </div>
                   <hr>
                   <div class="col-md-12">
                       <h2><span class="glyphicon glyphicon-signal"></span> Status</h2>
                   </div>
                   <div class="col-md-12 row">
                       <div class="col-md-4" id="statusall">
                       </div>
                       <div class="col-md-4 row">
                           <div id="czuj" class="col-md-12">
                           </div>
						   <div id="sett" class="col-md-12">
						   </div>
                       </div>
                       <div class="col-md-4">
                           <table id="eventlog" class="table table-striped">
                            </table>
                       </div>
                   </div>
                   <hr>
                   <div class="col-md-12 row">
                       <div class="col-md-12">
                           <h2><span class="glyphicon glyphicon-off"></span> Sterowanie przełącznikami</h2>
                       </div>
                       <div class="col-md-12 row" id="handlertime">
                       </div>
                   </div>
                   <br>
                   <hr>
                   <div class="col-md-12 row">
                       <div class="col-md-12">
                           <h2><span class="glyphicon glyphicon-signal"></span> Wykresy</h2>
                       </div>
                       <div class="col-md-12 row">
                           <div id="chart_div" style="width: 100%; height: 500px;"></div>
                       </div>
                       <div class="col-md-12 row">
                           <div id="chart_div2" style="width: 100%; height: 500px;"></div>
                       </div>
					   <div class="col-md-12 row">
						   <div id="chart_div3" style="width: 100%; height: 500px;"></div>
					   </div>
                   </div>
               </div>

            </div>
        </div>
        <script src="library/LAB.js"></script>
        <script>
            $LAB
            .script("library/jquery.min.js").wait(function(){console.log("Załadowano - JQuery")})
            .script("js/devstatus.js").wait(function(){console.log("Załadowano - devstatus")})
            .script("js/whereissun.js").wait(function(){console.log("Załadowano - whereissun")})
            .script("js/camhandler.js").wait(function(){console.log("Załadowano - camhandler")})
            .script("js/zoneminder.js").wait(function(){console.log("Załadowano - zoneminder")})
            .script("js/handler.js").wait(function(){console.log("Załadowano - handler")})
            .script("bootstrap/js/bootstrap.min.js").wait(function(){
                console.log("Załadowano - Bootstrap")
                console.log("-----Załadowano skrypty-----")
            });
    </script>
    <div id="buttonscript">
    </div>
    </body>
    <!--<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script> -->
</html>


<?php

        if(isset($_GET['logout']) && $_GET['logout']==1){ // czy zmienna logout w get jest ustawiona
            logout();
        }

    }else{
        $error = "Zaloguj się ponownie!"; // przeslanie bledu logowania
        require("login.php"); // wyswietlenie formularza logowania
    }
}else{
    session_start(); // start sesji
    $error = "Próba ingerencji!"; // wyswielenie erroru proby ingerencji
    $_SESSION['error'] = $error; // wstawienie $errora do sesji error
    header('Location: ./'); // przekierowanie do index.php
}
    ?>


