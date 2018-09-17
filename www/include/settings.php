<?php
$db = 1; // zmiena pozwalajaca na rozruch pliku connection.php
require("config.php"); // dane logowania mysql
require("connection.php"); // polaczenie z baza danych

//TODO: Zabezpieczyc ten oraz inne db handlery!

if(isset($_GET["name"])){ // formget
    $name = $_GET["name"];
    $db_query = mysqli_query($con,"SELECT settings.value FROM settings WHERE settings.name='$name';");
	$db_row = mysqli_fetch_assoc($db_query);
    $value = $db_row["value"];
	echo "$value";
    $db_query->free();
}
?>
