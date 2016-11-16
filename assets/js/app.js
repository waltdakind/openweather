
// get lat and lon 

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
lat = position.coords.latitude;
lon = position.coords.longitude; 
console.log(lat", "+ lon);
}


// api call by lat and lon



//url for png

var url = "http://openweathermap.org/img/w/" + code + ".png"


