<?php
$fileLat = '/var/www/html/lat.txt';
$fileLng = '/var/www/html/lng.txt';
// Open the file to get existing content
//$current = file_get_contents($file);
// Append a new person to the file
//$current .= "John Smith\n";

//echo "Lat is ";
//echo $_GET['lat'];
//echo ".\nLng is ";
//echo $_GET['lng'];
//echo ".\n";

file_put_contents($fileLat, $_GET['lat']);
file_put_contents($fileLng, $_GET['lng']);
?>
