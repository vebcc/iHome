<?php
if(isset($_GET["value"])){ // formget
    $value = $_GET["value"];
?>

   <html>
    <head>

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
