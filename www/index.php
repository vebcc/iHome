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
                        <div id="biurkoledchange" class="btn btn-primary btn-lg">Change</div>
                        <div id="biurkoledon" class="btn btn-primary btn-lg">On</div>
                        <div id="biurkoledoff" class="btn btn-primary btn-lg">Off</div>
                    </div>
                    <div id="biurkoledstatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Biurko Right</h3>
                    <div class="btn-group center">
                        <div id="biurkorightchange" class="btn btn-primary btn-lg">Change</div>
                        <div id="biurkorighton" class="btn btn-primary btn-lg">On</div>
                        <div id="biurkorightoff" class="btn btn-primary btn-lg">Off</div>
                    </div>
                    <div id="biurkorightstatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Głosniki LED</h3>
                    <div class="btn-group center">
                        <div id="glosnikiledchange" class="btn btn-primary btn-lg">Change</div>
                        <div id="glosnikiledon" class="btn btn-primary btn-lg">On</div>
                        <div id="glosnikiledoff" class="btn btn-primary btn-lg">Off</div>
                    </div>
                    <div id="glosnikiledstatus" class="status"></div>

                    <div class="center slidecontainer">
                        <span></span><input class="range slider" value="" id="glosnikiledvalue" type="range" name="glosnikiled" min="1" max="100" step="1"><span></span>
                        <p>Jasność: <span id="glosnikiledperc"></span>%</p>
                    </div>
                </div>

                <div class="col-md-3">
                    <h3>Lampa Zimny</h3>
                    <div class="btn-group center">
                        <div id="lampazimnychange" class="btn btn-primary btn-lg">Change</div>
                        <div id="lampazimnyon" class="btn btn-primary btn-lg">On</div>
                        <div id="lampazimnyoff" class="btn btn-primary btn-lg">Off</div>
                    </div>
                    <div id="lampazimnystatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Lampa Cieply</h3>
                    <div class="btn-group center">
                        <div id="lampacieplychange" class="btn btn-primary btn-lg">Change</div>
                        <div id="lampacieplyon" class="btn btn-primary btn-lg">On</div>
                        <div id="lampacieplyoff" class="btn btn-primary btn-lg">Off</div>
                    </div>
                    <div id="lampacieplystatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Lampa Lekka</h3>
                    <div class="btn-group center">
                        <div id="lampalekkachange" class="btn btn-primary btn-lg">Change</div>
                        <div id="lampalekkaon" class="btn btn-primary btn-lg">On</div>
                        <div id="lampalekkaoff" class="btn btn-primary btn-lg">Off</div>
                    </div>
                    <div id="lampalekkastatus" class="status"></div>
                </div>

                <div class="col-md-3">
                    <h3>Laser Disco</h3>
                    <div class="btn-group center">
                        <div id="laserdiscochange" class="btn btn-primary btn-lg">Change</div>
                        <div id="laserdiscoon" class="btn btn-primary btn-lg">On</div>
                        <div id="laserdiscooff" class="btn btn-primary btn-lg">Off</div>

                        <a href="index.php?bname=discot&bvalue=2" class="btn btn-primary btn-lg">Change</a>
                        <a href="index.php?bname=discot&bvalue=0" class="btn btn-primary btn-lg">On</a>
                        <a href="index.php?bname=discot&bvalue=1" class="btn btn-primary btn-lg">Off</a>
                    </div>
                </div>
                <div id="laserdisco" class="status"></div>

            </div>


        </div>

    </body>
    <script src="jquery/jquery.min.js"></script>
    <script src="js/handler.js"></script>
    <!-- Bootstrap core JavaScript -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
</html>
