// I know, quite the collection of variables right?
// I think there is a much better way of organizing and getting these variables/looping through the forms, but I didn't spend much time on trying to find it.
var cityHeader = document.getElementById("city");
var dateHeader = document.getElementById("date");
var prevCityList = document.getElementById("previousSearch");
var curIcon = document.getElementById("dayIcon");
var curTemp = document.getElementById("temp");
var curHum = document.getElementById("humidity");
var curWind = document.getElementById("wind");
var curUVI = document.getElementById("uvi");
var c1Date = document.getElementById("card1Hdr");
var c1Icon = document.getElementById("card1Icon");
var c1Temp = document.getElementById("card1Temp");
var c1Hum = document.getElementById("card1Humidity");
var c2Date = document.getElementById("card2Hdr");
var c2Icon = document.getElementById("card2Icon");
var c2Temp = document.getElementById("card2Temp");
var c2Hum = document.getElementById("card2Humidity");
var c3Date = document.getElementById("card3Hdr");
var c3Icon = document.getElementById("card3Icon");
var c3Temp = document.getElementById("card3Temp");
var c3Hum = document.getElementById("card3Humidity");
var c4Date = document.getElementById("card4Hdr");
var c4Icon = document.getElementById("card4Icon");
var c4Temp = document.getElementById("card4Temp");
var c4Hum = document.getElementById("card4Humidity");
var c5Date = document.getElementById("card5Hdr");
var c5Icon = document.getElementById("card5Icon");
var c5Temp = document.getElementById("card5Temp");
var c5Hum = document.getElementById("card5Humidity");
var savedSearches;
var searchToSave;
var searches = [];
var lat;
var lon;

// Sets the initial date on the header.
dateHeader.textContent = moment().format("MMM DD, YYYY");

// This is a HTML template parsing function written by Nate.
// It takes a string of HTML and variables, concatenating it together into usable HTML code taht can be appended to the document
const html = (strings, ...values) => new DOMParser().parseFromString(strings.map((string, i) => strings[i] + values[i]).join(''), "text/html").body.firstChild;

// This function builds the list of previous search results using the code on line 42 and displays them on the page when called. 
// If I were to spend some more time on this, I would like to limit the amount of searches displayed/saved.
function buildList(cityList){

    let listItem = html`

        <ul class="list-group" id="searchList">
            ${cityList.map(city => /*html*/`<button onclick="prevSearch(this.textContent)" class="list-group-item list-group-item-action">${city}</button>`).join('')}
        </ul>
    `
    prevCityList.removeChild(prevCityList.lastElementChild);
    prevCityList.appendChild(listItem);
}

// This function triggers when a previously searched city is clicked on, grabbing the city name and retriggering all the queries.
function prevSearch(city){
    cityHeader.textContent = city;
    document.getElementById("cityInput").value = city;
    forecastWeather();
}

// This code is used to convert temperatures from Kelvin to Fahrenheit
// It is necessary since everything returned from the weather API is in Kelvin
function KtoF(temp){
    var temp1 = temp - 273.15;
    temp1 = temp1 * 1.8;
    temp1 += 32;
    return temp1;
}

// This function loops through the returned data and populates the main dashboard and all the cards.
function popResults(data){
    curIcon.textContent = data.daily[0].weather[0].main;
    curTemp.textContent = (Math.round(KtoF(data.daily[0].temp.day) * 10) / 10) + "\u00B0F";
    curHum.textContent = data.daily[0].humidity + "%";
    curWind.textContent = data.daily[0].wind_speed + " MPH";
    curUVI.textContent = data.daily[0].uvi;

    c1Date.textContent = moment.unix(data.daily[1].dt).format("MMM DD, YYYY");
    c1Icon.textContent = data.daily[1].weather[0].main;
    c1Temp.textContent = (Math.round(KtoF(data.daily[1].temp.day) * 10) / 10) + "\u00B0F";
    c1Hum.textContent = data.daily[1].humidity + "%";

    c2Date.textContent = moment.unix(data.daily[2].dt).format("MMM DD, YYYY");
    c2Icon.textContent = data.daily[2].weather[0].main;
    c2Temp.textContent = (Math.round(KtoF(data.daily[2].temp.day) * 10) / 10) + "\u00B0F";
    c2Hum.textContent = data.daily[2].humidity + "%";

    c3Date.textContent = moment.unix(data.daily[3].dt).format("MMM DD, YYYY");
    c3Icon.textContent = data.daily[3].weather[0].main;
    c3Temp.textContent = (Math.round(KtoF(data.daily[3].temp.day) * 10) / 10) + "\u00B0F";
    c3Hum.textContent = data.daily[3].humidity + "%";

    c4Date.textContent = moment.unix(data.daily[4].dt).format("MMM DD, YYYY");
    c4Icon.textContent = data.daily[4].weather[0].main;
    c4Temp.textContent = (Math.round(KtoF(data.daily[4].temp.day) * 10) / 10) + "\u00B0F";
    c4Hum.textContent = data.daily[4].humidity + "%";

    c5Date.textContent = moment.unix(data.daily[5].dt).format("MMM DD, YYYY");
    c5Icon.textContent = data.daily[5].weather[0].main;
    c5Temp.textContent = (Math.round(KtoF(data.daily[5].temp.day) * 10) / 10) + "\u00B0F";
    c5Hum.textContent = data.daily[5].humidity + "%";

    document.getElementById("cityInput").value = "";
}

// This function takes the latitude and longitude provided by the geocoding API and fetches data from the openweather API
function geoToWeather(lat,lon){

    var searchCriteria = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=24ef92959cfdb5f639da2349846061e3"

    fetch(searchCriteria)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            popResults(data);
            console.log(data);
        })

}

// This event triggers when the main form is submitted
// It takes the searched city, populates it onto the main dashboard, and fetches the latitude and longitude from the geocoding API
// It also saves that city into local storage on the saved searches list and populates the list on the screen
function forecastWeather(event){
    if(typeof(event) == "undefined"){

    } else {
        event.preventDefault();
    };

    var cityName = document.getElementById("cityInput").value;
    cityHeader.textContent = cityName;

    savedSearches = JSON.parse(localStorage.getItem("searches"));
    if(savedSearches !== null){
        searches = savedSearches;
    }
    searches.push(cityName);
    localStorage.setItem("searches",JSON.stringify(searches));
    buildList(searches.reverse());

    var geoSearch ="https://api.positionstack.com/v1/forward?access_key=4d0112f4606df65955616785ca11b046&query=" + cityName;

    fetch(geoSearch)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            lat = data.data[0].latitude;
            lon = data.data[0].longitude;

            geoToWeather(lat,lon);
        })
    
}

// This function loads the initial screen, populating the last search result, previous search results, and loading the dashboard with the last searched result.
function init(){

    savedSearches = JSON.parse(localStorage.getItem("searches"));

    if(savedSearches !== null){
        searches = savedSearches.reverse();
        buildList(searches);
        document.getElementById("cityInput").value = searches[0];

        var cityName = document.getElementById("cityInput").value;
        cityHeader.textContent = cityName;

        var geoSearch ="https://api.positionstack.com/v1/forward?access_key=4d0112f4606df65955616785ca11b046&query=" + cityName;

        fetch(geoSearch)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                lat = data.data[0].latitude;
                lon = data.data[0].longitude;

                geoToWeather(lat,lon);
            })
    }
}

init();