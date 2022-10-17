
let calendar = null;
let date = new Date();
let year;
let month;
let day;
let reminderJsonData;
let userName;
let remindTexts;
let weatherApiKey = "WCERFPGMUWGAB5E2PCSQEMA4N";
let latitude = 31.2552;
let longitude =121.475;
let stringDate;
let maxTemp;
let minTemp;
const highestTemp = 54;
const lowestTemp = -89;
let isloaded = false;
window.addEventListener("load", function(){
 
 
});

function showPosition(position) {
    
  
  }

let dailyInfo = function(year,month,day,imgPath){
    this.year = year;
    this.month= month;
    this.day= day;
    this.imgPath=imgPath;
};
let dailyInfoList = [];
$(document).ready(async function() {
    
    setDate();
    getLocation();
    reminderJsonData = await initializeDailyList();
    loadData();
    
    getweatherData();
    //setWeather();
   
});

function setWeather(){
    console.log(maxTemp);
    $("#weatherText").text(`maxTemp: ${maxTemp} minTemp:${minTemp}`);
}

function setDate(){
   
    year = date.getFullYear();
    month =('0' + (date.getMonth() + 1)).slice(-2);
    day = ('0' + date.getDate()).slice(-2);
    $("#date").text(year + '-' + month + '-' + day);
    stringDate = $("#date").text();
}


async function initializeDailyList(){

    return fetch('https://yunshanjiang.github.io/Connection-Lab-project-one/data/reminder.json')
    .then(response => response.json())
    .then(data => data)
    .catch(function(e){
console.log(e);
    });
   
}

function loadData(){
    let tempCanvas;
    if ($("#sencondCanvas").length != 0){
        tempCanvas = $("#sencondCanvas");
        
    }
    $("#middle").empty();
    $("#middle").append("<div id='reminderBlock'></div>");
    $("#middle>div").append(
        "<p id='reminder'>Reminder</p><div id='reminderTextDiv'><p2 id='reminderText'></p2></div>"
        );
        if (tempCanvas)
        {
            $("#middle>div").append(tempCanvas);
            console.log(tempCanvas);
        }
           
        $("#middle").append("<img class='middleImg' src='https://source.unsplash.com/random/640×480/?wallpaper,landscape'>");
        $("#middle").append("<img class='middleImg' src='https://source.unsplash.com/random/640×480/?wallpaper,landscape2'>");
        $("#middle").append("<img class='middleImg' src='https://source.unsplash.com/random/640×480/?wallpaper,landscape3'>");
        userName = localStorage.getItem("Uname");
        
        for (let i = 0;i<reminderJsonData.userReminds.length;i++)
        {
            
            if (reminderJsonData.userReminds[i].username==userName)
                remindTexts = reminderJsonData.userReminds[i].remindText;
        }
        
        
    for (let i = 0;i<remindTexts.length;i++){
        if (remindTexts[i].year == year &&
            remindTexts[i].month == month &&
            remindTexts[i].day == day){
               
                $("#reminderText").text(remindTexts[i].text);
                
    }
}
       
}


function getweatherData(){
    fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${stringDate}?key=${weatherApiKey}`
       //`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/70,90/${stringDate}?key=${weatherApiKey}`
        )
    .then(response => response.json())
    .then(data => {
       
        maxTemp = fToC(data.days[0].tempmax);
        minTemp = fToC(data.days[0].tempmin);
        console.log(maxTemp);
        $("#weatherText").text(`maxTemp: ${maxTemp.toFixed(2)} minTemp:${minTemp.toFixed(2)}`);
    
        
        isloaded = true;})
    .catch(function(e){
console.log(e);
    });
}

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        this.window.alert("Geolocation is not supported by this browser.");
      }
}
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    //this.window.alert(position.coords.latitude + ", " + position.coords.longitude);
  
  }

function fToC(f){
return (f - 32) * (5/9);
}
