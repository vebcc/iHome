<?php
////////////////////////////////////////////////////
// Odbieranie komend i komunikacja z kontrolerami //
////////////////////////////////////////////////////

if(isset($_GET["id"]) && isset($_GET["name"]) && isset($_GET["value"])){ // formget
    $id = $_GET["id"];
    $name = $_GET["name"];
    $value = $_GET["value"];
    $dev=0;
    if(isset($_GET["dev"])){
        $dev=1;
    }
    switch($id){
        case 1:
            $reqip ="10.0.2.6";
            break;
        case 2:
            $reqip ="10.0.2.3";
            break;
        case 3:
            $reqip ="10.0.2.4";
            break;
        case 4:
            $reqip ="10.0.2.5";
            break;
        case 5:
            $reqip ="10.0.2.7";
            break;
    }
    $newmessage =  $name.$value;
    $fp = fopen("http://$reqip/$newmessage", "r"); //good
    $newmessage = fread($fp,"10");
    fclose($fp);
    //getset($id ,$name."status");
    if($dev==0){
        echo $newmessage;
    }else{
        return $newmessage;
    }
}
?>
