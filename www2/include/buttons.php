<?php
    $db = 1; // zmiena pozwalajaca na rozruch pliku connection.php
    require("config.php"); // dane logowania mysql
    require("connection.php"); // polaczenie z baza danych

    if(isset($_GET["printclicker"])){
        $clicker = $_GET["printclicker"];
        if($clicker==1){
            $db_query = mysqli_query($con,"SELECT buttons.id, buttons.name, buttons.negative, buttons.nr, rooms.name AS room, type FROM buttons, rooms WHERE buttons.room_id=rooms.id");
            $bbouter="";
            //$bbouter="<script>";
            while($db_row = mysqli_fetch_assoc($db_query)){
                $bb_id = $db_row["id"];
                $bb_name = $db_row["name"];
                $bb_nr = $db_row["nr"];
                $bbouter.=" $('#$bb_id-out$bb_nr-button-change').click(function() {
                                console.log('----------------click');
                                $.get('include/handler.php?id=$bb_id&name=out$bb_nr&value=change', function(result) {
                                    console.log('$bb_name: '+result);
                                });
                            });
                            ";
            }
            //$bbouter.="</script>";
            $bbouter.="console.log('Loader -buttonclicker');";

            echo $bbouter;
        }
    }else{
        if(isset($_GET["roomid"])){
            $room_id = $_GET["roomid"];
            $db_query = mysqli_query($con,"SELECT buttons.id, rooms.id AS roomid, buttons.name, buttons.negative, buttons.nr, rooms.name AS room, type FROM buttons, rooms WHERE buttons.room_id=rooms.id AND rooms.id=$room_id");
        }else{
            $db_query = mysqli_query($con,"SELECT buttons.id, buttons.name, buttons.negative, buttons.nr, rooms.name AS room, type FROM buttons, rooms WHERE buttons.room_id=rooms.id");
        }
        $bbouter = "<html lang='pl'><head><meta charset='utf-8'><br>";
        while($db_row = mysqli_fetch_assoc($db_query)){
            $bb_id = $db_row["id"];
            $bb_name = $db_row["name"];
            $bb_negative = $db_row["negative"];
            $bb_nr = $db_row["nr"];
            $bb_room = $db_row["room"];
            $bb_roomid = $db_row["roomid"];

            $bbouter .=  $bb_roomid.":".$bb_id.":".$bb_nr.":".$bb_negative.":".$bb_name.":".$bb_room."<br>";
        }
        echo $bbouter;
    }
    
?>