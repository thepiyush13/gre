<?php
error_reporting(0);
if(!$_POST){
return false;
}

save_score();

function save_score(){
$type  =  $_POST['type'];
$percentage  =  $_POST['per'];
$total_q  =  $_POST['total'];
$correct_q  =  $_POST['correct'];
$incorrect_q  =  $_POST['incorrect'];
$na_q  =  $_POST['na'];
$time  =  $_POST['time'];
$speed  =  $_POST['speed'];
$remark = $_POST['remark'];
 
$output = array();



$mysqli = new mysqli('localhost','root','','gre') ;

try {
		if (mysqli_connect_errno()){
		throw new exception ("Error: Could not connnect to mysql db");

		}
		$sql = "INSERT INTO quiz_score
			(id, `type`, percentage, total_q, correct_q, incorrect_q, na_q, time, speed, updated,remark)
			VALUES (NULL, '$type', '$percentage', '$total_q', '$correct_q', '$incorrect_q', '$na_q', '$time', '$speed', NOW(),'$remark')";
		$db = $mysqli->query($sql);
		if($db){
			throw new exception ( "Data Saved Successfully");
		}else{
			throw new exception ( "Could not save data,check your query") ;
		}


}
catch (exception $e) {
echo json_encode($e->getmessage());
$mysqli->close();
return false;
}


}
