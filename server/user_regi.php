<?php
header('Content-type: text/content; charset=utf-8');
// echo "hello";
// echo $_SERVER['DOCUMENT_ROOT'];
// $it = new RecursiveDirectoryIterator($_SERVER['DOCUMENT_ROOT'] . "/bbs/");

// foreach(new RecursiveIteratorIterator($it) as $file) {
// 	if (preg_match('/\.php$/', $file)) {
//         include($file);
//         echo $file . "\n";
//     }

// }
require_once $_SERVER['DOCUMENT_ROOT'] . '/bbs/config/config_ucenter.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/bbs/uc_client/client.php';
//echo $_POST['username']
if ( !uc_get_user( $_POST['username'] ) ) {
//if ( !uc_get_user( "windcandle" ) ) {
	$uid = uc_user_register($_POST['username'], $_POST['password'], $_POST['email']);
	//$uid = uc_user_register("windcandle", "zongc@0725", "zongc1989@163.com");
	if($uid <= 0) {
		if($uid == -1) {
			echo 'Illegal username.';
		} elseif($uid == -2) {
			echo 'Username contains forbidden words.';
		} elseif($uid == -3) {
			echo 'Username is already existing.';
		} elseif($uid == -4) {
			echo 'Email format illegal.';
		} elseif($uid == -5) {
			echo 'Email registration not allowed.';
		} elseif($uid == -6) {
			echo 'Email is already existing.';
		} else {
			echo 'Undefined';
		}
	} else {
		echo 'Sign up completed!';
	}
}
else {
	echo 'User already exists. Please login.';
}
?>