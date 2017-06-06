<?php
$ara = scandir('images');
$data = array();
for ($i=2; $i < count($ara) ; $i++) {
	
	$data[] = array('path' => "http://132.140.160.119/yash_shukla/project_2/server/images/".(str_replace(' ', '',$ara[$i])),
		'caption' => str_replace("_", " ", substr($ara[$i], 0, -4)));
}	
echo json_encode($data);
