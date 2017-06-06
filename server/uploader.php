<?php
print_r($_FILES);
$num = rand(100,10000);
echo $num;
mkdir('images/'.$num,777);
$upath="images/".$num."/";

  $target = $upath.$file;
  echo $target;
  if(move_uploaded_file($_FILES['images']['tmp_name'][$key], $target)) 
  {

   $filename=$target;
   echo "<script> alert('Success'); </script>";
 } 
 else 
 { 
  echo "Unable to move temp file to target.";
  echo "<script> alert('Failed'); </script>";

}
}



?>
