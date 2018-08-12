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
        echo "maincode error: ". $maincode . "db: " . $dbmaincode;
    }
    $db_query->free();
}

if(isset($_GET["id"]) && isset($_GET["privcode"])  && isset($_GET["commandid"])){ // formget
    $id = $_GET["id"];
    $privcode = $_GET["privcode"];
    $commandid = $_GET["commandid"];

    $db_query = mysqli_query($con,"SELECT devicedata.value FROM devicedata WHERE devicedata.device_id='$id' AND devicedata.name='privcode';");
    $db_row = mysqli_fetch_assoc($db_query);
    $dbprivcode = $db_row["value"];
    $db_query->free();

    if($privcode==$dbprivcode){
        switch($commandid){
            case 1:

                break;

        }
    }else{
        echo "privcode error";
    }

}


function getset($id, $lenk, $dev=0){ // pobieranie danych z lamp po comie
    $tosend = "";
    switch($id){
        case 2:
            $fp = fopen("http://10.0.2.3/$lenk", "r");
            $tosend = fread($fp,"1");
            fclose($fp);
            break;

        case 3:
            $fp = fopen("http://10.0.2.4/$lenk", "r");
            $tosend = fread($fp,"10");
            fclose($fp);
            break;
    }
    if($dev==0){
        echo $tosend;
    }else{
        return $tosend;
    }
}

////////////////////////////////////////////////////
// Odbieranie komend i komunikacja z kontrolerami //
////////////////////////////////////////////////////




if(isset($_GET["id"]) && isset($_GET["name"]) && isset($_GET["value"])){ // formget
    $id = $_GET["id"];
    $name = $_GET["name"];
    $value = $_GET["value"];
    if(isset($_GET["onlycheck"]) && $_GET["onlycheck"]==1){
        switch($id){
            case 1:
                getset($id ,"$value=$name", 0);
                break;

            case 2:
                getset($id ,$name."status", 0);
                break;

            case 3:
                getset($id ,$name.$value, 0);
                break;
        }
    }else{
        switch($id){
            case 2:
                $newmessage =  $name.$value;
                $fp = fopen("http://10.0.2.3/$newmessage", "r");
                $newmessage = fread($fp,"2");
                fclose($fp);
                getset($id ,$name."status");

                break;

            case 3:
                $newmessage =  $name.$value;
                if($fp = fopen("http://10.0.2.4/$newmessage", "r")){
                    $newmessage = fread($fp,"10");
                    fclose($fp);
                    getset($id ,$name."status");
                }else{
                    echo "error";
                }
                break;
        }
    }
}

$con->close(); // konczenie polaczenia z baza danych
?>
