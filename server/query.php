<?php
header('Content-type: text/content; charset=utf-8');
$servername = "localhost";
$username = "root";
$password = "zongc0725";
$DBname = "bbs";

$conn = mysql_connect($servername, $username, $password);
if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
}
if (!mysql_select_db($DBname, $conn)) {
    echo 'Could not select database';
    exit;
}
mysql_set_charset('utf8', $conn);
$sql = sprintf("SELECT tid, author, subject, message FROM `pre_forum_post` order by tid desc limit 10");
$result = mysql_query($sql, $conn);
//echo $result->num_rows;
$tid = array();
$author = array();
$subject = array();
$message = array();
while($row = mysql_fetch_assoc($result)) {
	foreach($row as $key => $value) {
		if (empty($row[$key])){
			$row[$key] = 'no message';
		}
	}
	array_push($tid, $row['tid']);
	array_push($author, $row['author']);
	array_push($subject, $row['subject']);
	array_push($message, $row['message']);
}

$response = array(
	"tid" => $tid,
	"author" => $author,
	"subject" => $subject,
	"message" => $message,
	);
//print_r($response['subject']);

echo json_encode($response, JSON_UNESCAPED_UNICODE);
/*
else{
    $response["success"] = 0;
    $response["message"] = "No message found";
}*/

//echo json_encode($response, JSON_FORCE_OBJECT);
mysql_close($conn);
?>