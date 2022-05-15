//DETECT SCREEN WITH
function scwidth(x) {
if (x.matches) {
document.getElementById("section4").innerHTML='<img src="images/05.png" alt="" loading="lazy">';
} else {
document.getElementById("section4").innerHTML='<img src="images/02.png" alt="" loading="lazy">';
}
}
var x = window.matchMedia("(max-width: 840px)");
scwidth(x);
x.addListener(scwidth);




//DETECT ESC KEY PRESSED
document.onkeydown = function(evt) {
evt = evt || window.event;
var isEscape = false;
if ("key" in evt) {
isEscape = (evt.key === "Escape" || evt.key === "Esc");
} else {
isEscape = (evt.keyCode === 27);
}
if (isEscape) {
window.location.href="#";
$("#enroll_form input").each(function() {
this.value = "";
});
document.getElementById("modal-content").innerHTML='<h1>data unfound</h1>';
return 1;
}
};



//MODAL
function modal(){
document.getElementById("modal-content").innerHTML='<h1>Enroll Now</h1><small>Flutter Training 25 days Crash Course</small><form id="enroll_form"><input type="text" name="name" placeholder="Full name*" maxlength="100" required=""><input type="email" name="email" placeholder="Email address*" maxlength="100" required=""><input type="tel" name="tel" placeholder="Contact number*" maxlength="15" required=""><button class="btn2" id="enroll_btn" onclick="event.preventDefault();postdata(0)">Enroll</button></form>';
}


//MODAL CLOSE
function close(){
$("#enroll_form input").each(function() {
this.value = "";
});
document.getElementById("modal-content").innerHTML='<h1>data unfound</h1>';
return 1;
}



//SET TIMER
(function () {
const second = 1000,
minute = second * 60,
hour = minute * 60,
day = hour * 24;
let today = new Date(),
dd = String(today.getDate()).padStart(2, "0"),
mm = String(today.getMonth() + 1).padStart(2, "0"),
yyyy = today.getFullYear(),
nextYear = yyyy,
dayMonth = "05/25/",
birthday = dayMonth + yyyy;
today = mm + "/" + dd + "/" + yyyy;
if (today > birthday) {
birthday = dayMonth + nextYear;
}
const countDown = new Date(birthday).getTime(),
x = setInterval(function() {    
const now = new Date().getTime(),
distance = countDown - now;
document.getElementById("days").innerText = Math.floor(distance / (day)),
document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
if (distance < 0) {
document.getElementById("headline").innerText = "0";
document.getElementById("countdown").style.display = "0";
clearInterval(x);
}
}, 0)
}());




//AJAX POST USER INPUT DATA
function postdata(type){
var datatype = "&formtype="+type;
if(type == "0"){
type = "enroll";
datatype = $("#"+type+"_form").serialize() + "&formtype="+type;
}
if(type == "viewsyllabus"){
document.getElementById("modal-content").innerHTML='<iframe src="https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf"></iframe>';
return 1;
}
document.getElementById(type+"_btn").innerHTML = "Processing...";
var url = "validate.php"; 
$.ajax({
type: "POST",
url: url,
data: datatype,
success: function(data)
{   
const para = document.createElement("div");
para.setAttribute("id", "snackbar");
if(data.match(/success/gi)){
document.getElementById(type+"_btn").innerHTML = "Enroll";
para.setAttribute("style", "border-left:3px solid green"); 
para.innerHTML = "<i class='fa fa-check-circle-o'></i> Your have successfully enrolled";
document.body.appendChild(para);
popup();
return 1;
}
else{
document.getElementById(type+"_btn").innerHTML = "Enroll";
para.setAttribute("style", "border-left:3px solid red"); 
para.innerHTML = "<i class='fa fa-times-circle-o'></i>"+data;
document.body.appendChild(para);
popup();
return 1;
}
}
});
}



//POPUP
function popup() {
var x = document.getElementById("snackbar");
x.className = "show";
setTimeout(function(){
x.className = x.className.replace("show", ""); 
document.getElementById("snackbar").remove();
}, 3000);
}