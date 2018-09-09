<?php
$db = 1; // zmiena pozwalajaca na rozruch pliku connection.php
require("config.php"); // dane logowania mysql
require("connection.php"); // polaczenie z baza danych


if(isset($_GET["id"]) && isset($_GET["getdata"]) && isset($_GET["maincode"])){ // formget
    $id = $_GET["id"];
    $getdata = $_GET["getdata"];
    $maincode = $_GET["maincode"];
    // zapytanie sprawdzajace czy maincode sie zgadza
    $db_query = mysqli_query($con,"SELECT devicedata.value FROM devicedata WHERE devicedata.device_id='$id' AND devicedata.name='maincode';");
    $db_row = mysqli_fetch_assoc($db_query);
    $dbmaincode = $db_row["value"];
    $db_query->free();

    if($maincode==$dbmaincode){
        if($getdata="ok"){
            $db_query =mysqli_query($con,"SELECT devicedata.name, devicedata.value FROM devicedata WHERE devicedata.device_id='$id' AND devicedata.name!='maincode';");

            while($db_row = mysqli_fetch_assoc($db_query)){
                echo $db_row["name"]."=".$db_row["value"].",";
            }
        }else{
            echo "brak ok";
        }
    }else{
        $db_query = mysqli_query($con,"INSERT INTO `ihome`.`errorlog` (`id`, `from`, `error`, `date`, `value`) VALUES (NULL, 'devicehandlers', 'getdata', CURRENT_TIMESTAMP, 'Błąd pobierania danych do kontrolera - Błędny MainCode - $id')");
    }
    $db_query->free();
}

if(isset($_GET["id"]) && isset($_GET["privcode"])  && isset($_GET["commandid"]) && isset($_GET["commandvalue"]) ){ // formget
    $id = $_GET["id"];
    $privcode = $_GET["privcode"];
    $commandid = $_GET["commandid"];
    $value = $_GET["commandvalue"];

    //echo "id: $id, privcode: $privcode, commandid: $commandid, value: $value";

    $db_query = mysqli_query($con,"SELECT devicedata.value FROM devicedata WHERE devicedata.device_id='$id' AND devicedata.name='privcode';");
    $db_row = mysqli_fetch_assoc($db_query);
    $dbprivcode = $db_row["value"];
    $db_query->free();

    //echo ", dbprivcode: $dbprivcode , ";

    if($privcode==$dbprivcode){
        switch($commandid){
            case 1:
                if($value<100){
                    $db_query = mysqli_query($con,"INSERT INTO `ihome`.`temperature` (`id`, `temp`, `date`, `temp_id`) VALUES (NULL, '$value', CURRENT_TIMESTAMP, '$id');");
                }else{
                    $db_query = mysqli_query($con,"INSERT INTO `ihome`.`errorlog` (`id`, `from`, `error`, `date`, `value`) VALUES (NULL, 'devicehandlers', 'temperature', CURRENT_TIMESTAMP, 'Błąd odczytu z czujnika - $id')");
                }
                break;
            case 2:
                if($value<100){
                    $db_query = mysqli_query($con,"INSERT INTO `ihome`.`humidity` (`id`, `humi`, `date`, `humi_id`) VALUES (NULL, '$value', CURRENT_TIMESTAMP, '$id');");
                }else{
                    $db_query = mysqli_query($con,"INSERT INTO `ihome`.`errorlog` (`id`, `from`, `error`, `date`, `value`) VALUES (NULL, 'devicehandlers', 'humidity', CURRENT_TIMESTAMP, 'Błąd odczytu z czujnika - $id')");
                }
                break;
            case 3:
                $db_query = mysqli_query($con,"SELECT MINUTE(NOW()) AS czas;");
                $db_row = mysqli_fetch_assoc($db_query);
                echo $db_row["czas"];
                break;
            case 4:

                break;

        }
        //echo "dodaje";
    }else{
        $db_query = mysqli_query($con,"INSERT INTO `ihome`.`errorlog` (`id`, `from`, `error`, `date`, `value`) VALUES (NULL, 'devicehandlers', 'getdata', CURRENT_TIMESTAMP, 'Błąd komunikacji serwer-kontroler - Błędny PrivCode - $id')");
    }

}

$con->close(); // konczenie polaczenia z baza danych
?>
