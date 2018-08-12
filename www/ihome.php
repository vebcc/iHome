<?php
if(isset($_SESSION['token']) && isset($_SESSION['login']) && isset($_SESSION['token2'])){ // sprawdza czy zmienne sesji sa ustawione
    if($_SESSION['token']==md5($_SERVER['HTTP_USER_AGENT']) && $_SESSION['token2']==md5($_SERVER['REMOTE_ADDR'])){ // sprawdza czy zmienne sesji sa zgodne z danymi klienta
        $login = $_SESSION['login'];
        echo "Siemka zalogowany $login!";

        require("include/functions.php"); // include functions.php
?>
<html>
    <head>
        <title>Panel Sterowania - iHome</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet" href="css/new.css">
    </head>
    <body>
        <div class="container-fluid center">
            <div class="jumbotron">
               <div class="row">
                   <div class="col-md-12 row">
                       <div id="sun" class="col-md-6">
                           <h3><span class="glyphicon glyphicon-certificate"></span>  <span class="glyphicon glyphicon-triangle-top"></span>04:18 <span class="glyphicon glyphicon-triangle-bottom"></span> 20:42</h3>
                       </div>
                       <div id="title" class="col-md-6">
                           <h2>Panel Sterowania <b>IHome</b></h2>
                       </div>
                   </div>
                   <hr>
                   <div class="col-md-12">
                       <h2><span class="glyphicon glyphicon-signal"></span> Status</h2>
                   </div>
                   <div class="col-md-12 row">
                       <div class="col-md-4">
                           <table class="table table-striped">
                               <tr><th>Włączniki</th><th> </th><th></th></tr>
                               <tr><td>Masło</td><td>Biurko przód</td><td>ON</td></tr>
                               <tr><td>Masło</td><td>Biurko Bok</td><td>ON</td></tr>
                               <tr><td>Masło</td><td>Podświetlenie głośników</td><td>ON</td></tr>
                               <tr><td>Masło</td><td>Zimna lampa</td><td>ON</td></tr>
                               <tr><td>Masło</td><td>Ciepła lampa</td><td>ON</td></tr>
                               <tr><td>Masło</td><td>Laser dyskotekowy</td><td>ON</td></tr>
                               <tr><td>Masło</td><td>Ciepła słaba lampa</td><td>ON</td></tr>
                               <tr><td>Szymon</td><td>Lampa główna</td><td>ON</td></tr>
                           </table>
                       </div>
                       <div class="col-md-4">
                           <table class="table table-striped">
                               <tr><th>Czujniki</th><th> </th><th> </th></tr>
                               <tr><td>Masło</td><td>Temperatura</td><td>22*C</td></tr>
                               <tr><td>Masło</td><td>Wilgotność</td><td>70%</td></tr>
                               <tr><td>Zewnątrz</td><td>Temperatura</td><td>32*C</td></tr>
                               <tr><td>Zewnątrz</td><td>Wilgotność</td><td>50%</td></tr>
                           </table>
                       </div>
                       <div class="col-md-4">
                           <table class="table table-striped">
                               <tr><th>ID</th><th>Błąd</th><th>Data</th></tr>
                               <tr><td>32</td><td>Błąd odczytu z czujnika</td><td>22-15-2018</td></tr>
                               <tr><td>353</td><td>Błąd odczytu z czujnika</td><td>22-15-2018</td></tr>
                               <tr><td>432</td><td>Bład pobierania danych</td><td>22-15-2018</td></tr>
                               <tr><td>4233</td><td>Proba wlamania</td><td>22-15-2018</td></tr>
                               <tr><td>4232</td><td>Przepelniona baza</td><td>22-15-2018</td></tr>
                            </table>
                       </div>
                   </div>
                   <hr>
                   <div class="col-md-12 row">
                       <div class="col-md-12">
                           <h2><span class="glyphicon glyphicon-off"></span> Sterowanie przełącznikami</h2>
                       </div>
                       <div class="col-md-12 row">
                           <div class="col-md-3">
                               <h2>Masło</h2>
                               <table class="table table-striped">
                                   <tr><td>Biurko przód</td><td><button>Zmień</button></td></tr>
                                   <tr><td>Biurko Bok</td><td><button>Zmień</button></td></tr>
                                   <tr><td>Podświetlenie głośników</td><td><button>Zmień</button></td></tr>
                                   <tr><td>Zimna lampa</td><td><button>Zmień</button></td></tr>
                                   <tr><td>Ciepła lampa</td><td><button>Zmień</button></td></tr>
                                   <tr><td>Laser dyskotekowy</td><td><button>Zmień</button></td></tr>
                                   <tr><td>Ciepła słaba lampa</td><td><button>Zmień</button></td></tr>
                               </table>
                           </div>
                           <div class="col-md-3">
                               <h2>Szymon</h2>
                               <table class="table table-striped">
                                   <tr><td>Lampa główna</td><td><button>Zmień</button></td></tr>
                               </table>
                           </div>
                       </div>
                   </div>
               </div>

            </div>
        </div>

    </body>
    <script src="jquery/jquery.min.js"></script>

    <script src="js/newhandler.js"></script>
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


