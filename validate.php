<?php
if(isset($_POST["formtype"])){
require("database.php");
if($_POST["formtype"] == "enroll"){
$email = strtolower($_POST["email"]);
$uname = strtolower($_POST["name"]);
$mobile = $_POST["tel"];

//CHECK FOR EMPTY FIELDS
if($email == "" || $uname == "" || $mobile == ""){
echo'All fields are mandatory';
return 1;
}

//VALIDATE EMAIL, MOBILE, USERNAME
$domains = array('gmail.com', 'outlook.com', 'yahoo.in', 'yahoo.com', 'hotmail.com');
$pattern = "/^[a-z0-9._%+-]+@[a-z0-9.-]*(" . implode('|', $domains) . ")$/i";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
echo 'Invalid email format';
return 1;
}else if (!preg_match($pattern, $email)) {
echo'Temporary emails not allowed';   
return 1;
}else if(!preg_match('/^[0-9]{10}+$/', $mobile)){
echo 'Invalid mobile format';
return 1;
}else if(preg_match('/[^a-z\s]/i',$uname)){
echo 'Invalid name';
return 1;
}else{
//CHECK FOR DATA IN DATABASE
$sql = "SELECT * FROM table_name WHERE email = '$email'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
echo"Your have already enrolled";
mysqli_close($conn);
return 1;
}
$sql = "INSERT INTO table_name (fullname, email, mobile)
VALUES ('$uname', '$email', '$mobile')";
if (mysqli_query($conn, $sql)) {
echo "New record created successfully";
return 1;
} else {
echo "Error: " . $sql . "<br>" . mysqli_error($conn);
return 1;
}
mysqli_close($conn);
}
}else{
header("location:/COGENT/");
return 1;
}
}
else{
header("location:/COGENT/");
return 1;
}
?>
