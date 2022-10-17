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
let currentTemp;
let maxTemp;
let minTemp;
const highestTemp = 54;
const lowestTemp = -89;
let isloaded = false;
function getDate(){
   
    year = date.getFullYear();
    month =('0' + (date.getMonth() + 1)).slice(-2);
    day = ('0' + date.getDate()).slice(-2);
    stringDate = year + '-' + month + '-' + day;
    
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
        console.log(data);
       
        
        isloaded = true;})
    .catch(function(e){
console.log(e);
    });
}

window.addEventListener("load", function(){
    getLocation();
    getDate();
    getweatherData();

    
});

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
