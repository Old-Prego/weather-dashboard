var cityHeader = document.getElementById("city");
var dateHeader = document.getElementById("date");
var prevCityList = document.getElementById("previousSearch");
var curIcon = document.getElementById("dayIcon");
var curTemp = document.getElementById("temp");
var curHum = document.getElementById("humidity");
var curWind = document.getElementById("wind");
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

const html = (strings, ...values) => new DOMParser().parseFromString(strings.map((string, i) => strings[i] + values[i]).join(''), "text/html").body.firstChild;

dateHeader.textContent = moment().format("MMM DD, YYYY");


function buildList(cityList){

    let listItem = html`

        <ul class="list-group" id="searchList">
            ${cityList.map(city => /*html*/`<li class="list-group-item">${city}</li>`).join('')}
        </ul>
    `
    prevCityList.removeChild(prevCityList.lastElementChild);
    prevCityList.appendChild(listItem);
}

function KtoF(temp){
    var temp1 = temp - 273.15;
    temp1 = temp1 * 1.8;
    temp1 += 32;
    return temp1;
}

function popResults(data){
    curIcon.textContent = data.list[0].weather[0].main;
    curTemp.textContent = (Math.round(KtoF(data.list[0].main.temp) * 10) / 10) + "\u00B0F";
    curHum.textContent = data.list[0].main.humidity + "%";
    curWind.textContent = data.list[0].wind.speed + " MPH";

    c1Date.textContent = moment(data.list[1].dt_txt).format("MMM DD, YYYY");
    c1Icon.textContent = data.list[1].weather[0].main;
    c1Temp.textContent = (Math.round(KtoF(data.list[1].main.temp) * 10) / 10) + "\u00B0F";
    c1Hum.textContent = data.list[1].main.humidity + "%";

    c2Date.textContent = moment(data.list[2].dt_txt).format("MMM DD, YYYY");
    c2Icon.textContent = data.list[2].weather[0].main;
    c2Temp.textContent = (Math.round(KtoF(data.list[2].main.temp) * 10) / 10) + "\u00B0F";
    c2Hum.textContent = data.list[2].main.humidity + "%";

    c3Date.textContent = moment(data.list[3].dt_txt).format("MMM DD, YYYY");
    c3Icon.textContent = data.list[3].weather[0].main;
    c3Temp.textContent = (Math.round(KtoF(data.list[3].main.temp) * 10) / 10) + "\u00B0F";
    c3Hum.textContent = data.list[3].main.humidity + "%";

    c4Date.textContent = moment(data.list[4].dt_txt).format("MMM DD, YYYY");
    c4Icon.textContent = data.list[4].weather[0].main;
    c4Temp.textContent = (Math.round(KtoF(data.list[4].main.temp) * 10) / 10) + "\u00B0F";
    c4Hum.textContent = data.list[4].main.humidity + "%";

    c5Date.textContent = moment(data.list[5].dt_txt).format("MMM DD, YYYY");
    c5Icon.textContent = data.list[5].weather[0].main;
    c5Temp.textContent = (Math.round(KtoF(data.list[5].main.temp) * 10) / 10) + "\u00B0F";
    c5Hum.textContent = data.list[5].main.humidity + "%";
}


function forecastWeather(event){
    event.preventDefault();
    var cityName = document.getElementById("cityInput").value;
    var searchCriteria = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=5f8d737b34dbcf8d42c5993772582542";

    cityHeader.textContent = cityName;

    savedSearches = JSON.parse(localStorage.getItem("searches"));
    if(savedSearches !== null){
        searches = savedSearches;
    }
    searches.push(cityName);
    localStorage.setItem("searches",JSON.stringify(searches));
    buildList(searches);

    fetch(searchCriteria)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            popResults(data);
        })
}

savedSearches = JSON.parse(localStorage.getItem("searches"));
if(savedSearches !== null){
    searches = savedSearches;
    buildList(searches);
}

