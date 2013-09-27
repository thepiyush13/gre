<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$output = $per =$speed = $remark = array();
$mysqli = new mysqli('localhost','root','','gre') ;
//$mysqli->select_db('incapme') or die('cant not select the database');

if(!$mysqli){	
    echo "{'status':'".$mysqli->connect_errorno()."' }"; ;
	exit();
}

$sql = "SELECT * FROM quiz_score ";
$db = $mysqli->query($sql);
if($db){
   
$i = 1;
while( $result = $db->fetch_array(MYSQLI_ASSOC)    ){
	 $per[0][] = array(0=>$i,1=>$result['percentage']);
     $speed[0][] = array(0=>$i,1=>$result['speed']);
     $remark[] = $result['remark'];
$i++;
}
}

//sorting remarks
sort($remark);
$sql = "SELECT AVG(percentage) as avg from quiz_score";
$db = $mysqli->query($sql);
$result = $db->fetch_array(MYSQLI_ASSOC) ;
$per_avg =  $result['avg'];

$sql = "SELECT AVG(speed) as avg from quiz_score";
$db = $mysqli->query($sql);
$result = $db->fetch_array(MYSQLI_ASSOC) ;
$speed_avg =  $result['avg'];
$mysqli->close();

    $output = array('per'=>$per,
        'speed'=>$speed,
        'speed_avg'=>$speed_avg,
        'per_avg'=>$per_avg,
        'remark'=>$remark
        );
   echo json_encode($output);   
?>
