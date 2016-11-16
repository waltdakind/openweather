
// get lat and lon 
var url,
    apiurl,
    lat,
    lon,
    desc,
    temp,
    tempC,
    hum,
    city,
    code;


var apiGeolocationSuccess = function(position) {
lat = position.coords.latitude;
lon = position.coords.longitude; 
makeUrl(lat, lon);
};

var tryAPIGeolocation = function() {
	jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
		apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
  });
};

var browserGeolocationSuccess = function(position) {
lat = position.coords.latitude;
lon = position.coords.longitude; 
makeUrl(lat, lon);
};

var browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
      alert("Browser geolocation error !\n\nTimeout.");
      break;
    case error.PERMISSION_DENIED:
      if(error.message.indexOf("Only secure origins are allowed") == 0) {
        tryAPIGeolocation();
      }
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Browser geolocation error !\n\nPosition unavailable.");
      break;
  }
};

var tryGeolocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    	browserGeolocationSuccess,
      browserGeolocationFail,
      {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
  }
};



// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(logPosition);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }
// function logPosition(position) {
// lat = position.coords.latitude;
// lon = position.coords.longitude; 
// console.log(lat + ", "+ lon);
// makeUrl(lat, lon);
// }

// create the url for the api by lat and lon
// api.openweathermap.org/data/2.5/weather?lat=35&lon=139
function makeUrl(lat, lon){
apiurl= 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=fe96a3e1611ec2b7c051b6b642af8eb9';
console.log(apiurl);
callApi(apiurl);
}



// api call by lat and lon


function callApi(apiurl){
    $.ajax({url: apiurl, success: function(result){
       // $(".container").html(result);
        console.log(result);
        //url for png
        url = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png"
        city = result.name;
        desc = result.weather[0].description;
        temp = parseInt(result.main.temp * 9/5 - 459.67);
 
        tempC = parseInt(result.main.temp  - 273.15);

        hum = result.main.humidity;
        console.log(url);
        $("#url").attr("src", url);
        console.log(city);
        $("#city").text(city);
        console.log(desc);
        $("#desc").text(desc);
        console.log(temp + " F");
        $("#temp").text(temp);
        $("#tempC").text(tempC);
        $("#tempC").hide();
        $("#C").hide();
        console.log(tempC + " C"); 
        $("#humidity").text(hum + "% humidity");      
        console.log(hum + "%");
    }});
}

$(function(){
tryGeolocation();
$("button").click(function(){
	console.log('click');
$("#temp").toggle();
$("#C").toggle();
$("#tempC").toggle();
$("#F").toggle();
});
});
