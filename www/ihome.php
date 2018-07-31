<?php
if(isset($_SESSION['token']) && isset($_SESSION['login']) && isset($_SESSION['token2'])){ // sprawdza czy zmienne sesji sa ustawione
    if($_SESSION['token']==md5($_SERVER['HTTP_USER_AGENT']) && $_SESSION['token2']==md5($_SERVER['REMOTE_ADDR'])){ // sprawdza czy zmienne sesji sa zgodne z danymi klienta
        $login = $_SESSION['login'];
        echo "Siemka zalogowany $login!";

        require("include/functions.php"); // include functions.php
?>
<html>
    <head>
        <title>Panel - iHome</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet" href="css/main.css">
        <!--<script src='https://www.gstatic.com/charts/loader.js'></script>-->
    </head>
    <body>
        <div class="container-fluid center">
            <div class="jumbotron">
                <h1>Panel iHome</h1>
            </div>
            <a href="index.php?logout=1">Wyloguj się</a>

            <div class="row">


                <div class="col-md-3">
                    <h3>Temperatura Out</h3>
                    <h4>Temperatura: <span id="tempout1"></span> *C</h4><br>
                    <div id='chart_tempout' style='width: 400px; height: 120px;'></div>



                </div>

                <div class="col-md-3">
                    <h3>Temperatura In</h3>
                    <h4>Temperatura: <span id="tempin1"></span> *C</h4><br>
                    <div id='chart_tempin' style='width: 400px; height: 120px;'></div>



                </div>

                <div class="col-md-3">
                    <h3>Wilgotność In</h3>
                    <h4>Wilgotność: <span id="wilgin1"></span> %</h4><br>
                    <div id='chart_wilgin' style='width: 400px; height: 120px;'></div>



                </div>

                <div class="col-md-3">
                    <h3>Biurko Led</h3>
                    <div class="btn-group center">
                        <div id="biurkoledchange" class="btn btn-primary btn-lg">Change</div>
                        <div id="biurkoledon" class="btn btn-primary btn-lg">On</div>
                        <div id="biurkoledoff" class="btn btn-primary btn-lg active">Off</div>
                    </div>
                    <div id="biurkoledstatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Biurko Right</h3>
                    <div class="btn-group center">
                        <div id="biurkorightchange" class="btn btn-primary btn-lg">Change</div>
                        <div id="biurkorighton" class="btn btn-primary btn-lg">On</div>
                        <div id="biurkorightoff" class="btn btn-primary btn-lg active">Off</div>
                    </div>
                    <div id="biurkorightstatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Głosniki LED</h3>
                    <div class="btn-group center">
                        <div id="glosnikiledchange" class="btn btn-primary btn-lg">Change</div>
                        <div id="glosnikiledon" class="btn btn-primary btn-lg">On</div>
                        <div id="glosnikiledoff" class="btn btn-primary btn-lg active">Off</div>
                    </div>
                    <div id="glosnikiledstatus" class="status"></div>

                    <div class="center slidecontainer">
                        <span></span><input class="range slider" value="" id="glosnikiledvalue" type="range" name="glosnikiled" min="1" max="100" step="1" value="100"><span></span>
                        <p>Jasność: <span id="glosnikiledperc"></span>%</p>
                    </div>
                </div>

                <div class="col-md-3">
                    <h3>Lampa Zimny</h3>
                    <div class="btn-group center">
                        <div id="lampazimnychange" class="btn btn-primary btn-lg">Change</div>
                        <div id="lampazimnyon" class="btn btn-primary btn-lg">On</div>
                        <div id="lampazimnyoff" class="btn btn-primary btn-lg active">Off</div>
                    </div>
                    <div id="lampazimnystatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Lampa Cieply</h3>
                    <div class="btn-group center">
                        <div id="lampacieplychange" class="btn btn-primary btn-lg">Change</div>
                        <div id="lampacieplyon" class="btn btn-primary btn-lg">On</div>
                        <div id="lampacieplyoff" class="btn btn-primary btn-lg active">Off</div>
                    </div>
                    <div id="lampacieplystatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Lampa Lekka</h3>
                    <div class="btn-group center">
                        <div id="lampalekkachange" class="btn btn-primary btn-lg">Change</div>
                        <div id="lampalekkaon" class="btn btn-primary btn-lg">On</div>
                        <div id="lampalekkaoff" class="btn btn-primary btn-lg active">Off</div>
                    </div>
                    <div id="lampalekkastatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Laser Disco</h3>
                    <div class="btn-group center">
                        <div id="laserdiscochange" class="btn btn-primary btn-lg">Change</div>
                        <div id="laserdiscoon" class="btn btn-primary btn-lg">On</div>
                        <div id="laserdiscooff" class="btn btn-primary btn-lg active">Off</div>
                    </div>
                </div>
                <div id="laserdiscostatus" class="status"></div>

            </div>


        </div>

    </body>
    <script src="jquery/jquery.min.js"></script>
    <script src="js/handler.js"></script>

    <!--
    <script src="js/tempstat.js"></script>
    <script src='http://bernii.github.io/gauge.js/dist/gauge.min.js'></script>
    <script src='http://bernii.github.io/gauge.js/dist/gauge.coffee'></script>
    -->


    <!-- Bootstrap core JavaScript -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
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


