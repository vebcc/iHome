<?php
    $db = 1; // zmiena pozwalajaca na rozruch pliku connection.php
    require("config.php"); // dane logowania mysql
    require("connection.php"); // polaczenie z baza danych
    
    $db_query = mysqli_query($con,"SELECT rooms.id, rooms.name FROM rooms ORDER BY ord");
    $bbouter = "<html lang='pl'><head><meta charset='utf-8'><br>";
    while($db_row = mysqli_fetch_assoc($db_query)){
        $rr_id = $db_row["id"];
        $rr_name = $db_row["name"];

        $bbouter .=  $rr_id.":".$rr_name."<br>";
    }
    echo $bbouter;
?>