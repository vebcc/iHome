#!/usr/bin/php
<?php
//$n=1;
$db = 1; // zmiena pozwalajaca na rozruch pliku connection.php
$data = array();
$datadev = array();
$inoutdata = array();
require("include/config.php"); // dane logowania mysql
require("include/connection.php"); // polaczenie z baza danych
$db_query = mysqli_query($con,"SELECT devices.id, devices.ip, devices.name FROM devices;");
$i=0;
while($db_row = mysqli_fetch_assoc($db_query)){
	$dev_id = $db_row["id"];
	$dev_ip = $db_row["ip"];
	$dev_name = $db_row["name"];
	$data[$i] = array($dev_id, $dev_ip, $dev_name);
	$i++;
}

$i=0;
$db_query = mysqli_query($con,"SELECT deviceouts.id, deviceouts.nr, deviceouts.name, deviceouts.type FROM deviceouts;");
while($db_row = mysqli_fetch_assoc($db_query)){
	$dev_id = $db_row["id"];
	$dev_nr = $db_row["nr"];
	$dev_name = $db_row["name"];
	$dev_type = $db_row["type"];
	$inoutdata[$dev_id][$dev_nr] = array($dev_name, $dev_type);
	$i++;
}
getfullstatus();

//$getnew = file_get_contents('/sciezka/do/pliku/tekstowego.txt');/
$con->close(); // konczenie polaczenia z baza danych


function getfullstatus(){
	$dataout = "<html lang='pl'><head><meta charset='utf-8'><br>";
	$dataid = "";
	global $data, $datadev, $inoutdata;
	$howdevices = count($data);
	$counter = 0;
	for($i=0;$i<$howdevices;$i++){
		$newip = $data[$i][1];
		$newmessage =  "statusall";
		$fp = @fopen("http://$newip/$newmessage", "r"); //good
		if($fp){
			$newmessage = fread($fp,"30");
			fclose($fp);
			$temp_data = explode(",",$newmessage);
			$howtemp = count($temp_data);
			for($x=0;$x<$howtemp;$x++){
				$datadev[$counter] = array($data[$i][0], $temp_data[$x]);
				$nrtab = $x+1;
				$dataout .=$data[$i][0].":".$nrtab.":".$temp_data[$x].":".$inoutdata[$data[$i][0]][$nrtab][1].":".$inoutdata[$data[$i][0]][$nrtab][0]."<br>";
				//$dataid .=$data[$i][0].",";
			}


		}else{
			//$db_query = mysqli_query($con,"INSERT INTO `ihome`.`errorlog` (`id`, `from`, `error`, `date`, `value` , `dev_id` ) VALUES (NULL, 'handlers', 'data', CURRENT_TIMESTAMP, 'Rozruch iHome - kontroler offline' , $id)");
		}
	}
	//$dataout .="?\n?".$dataid;
	file_put_contents('data', $dataout);
}


while(1){
	$command = file_get_contents('command');
	if($command!="0"){
		file_put_contents('command', "0");
	
	
	
	}
	getfullstatus();
	sleep(2);
}
?>