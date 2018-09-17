<?php
if(isset($_GET["value"])){ // formget
    $value = $_GET["value"];
    //TODO: linki na then do that nie dzialaja z jq wiec only php
?>

   <html>
    <head>
        1
    </head>
    <body>
        <script src="../jquery/jquery.min.js"></script>
        <script> var value = "<?php echo $value; ?>"; </script>
        <script src="../js/googlehandler.js"></script>
    </body>
</html>



<?php
}
?>
