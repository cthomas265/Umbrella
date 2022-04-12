var apiKey = 'ea52895286adcad8d4523f39e7547325'
var storeCity = localStorage.getItem('city');
var searchedCity = document.getElementById('pastSearch');

document.getElementById('searchBtn').addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById
    var city = document.getElementById('city').value;
    var storedCity = localStorage.getItem('city');
    var li = document.createElement('li');
    //clear
    document.getElementById('searchBar').reset();

    //create list
    li.innerText = city;
    searchCities.appendChild(li);

    getLocation(city);

    //localstorage
    if (!storedCity) {
        localStorage.setItem('city', json.stringify([{ city: city }]));
        return;
    }
    storedCity = JSON.parse(storedCity);
    storedCity.push({ city: city });
    localStorage.setItem('city', JSON.stringify(storedCity));
});

document.getElementById('pastSearch').addEventListener('click', function (event) {
    var city = event.target.innerText;
    document.getElementById('currentInfo').innerHTML = '';
    getLocation(city);
});

//previous search
function prevSearch() {
    var storedCity = localStorage.getItem('city');
    if (!storedCity) {
        for (var i = 0; i < searchCities.length; i++) {
            var li = document.createElement('li');
            li.innerText = storedCity[i].city;
            searchCities.appendChild(li);
        }
    }
};

// get coordinates
function getCoordinates(city) {
    var localUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
    fetch(localUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            if (data.length !== 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
                getWeather(weatherUrl, city);
            } else {
            console.log('City not found');
        }
    })
};

function getWeather(weatherUrl, city) {
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var date = moment().format('MMMM Do YYYY');
            var temp = data.current.temp;
            var humidity = data.current.humidity;
            var wind = data.current.wind_speed;
            var uvi = data.current.uvi;
            var icon = data.current.weather[0];
            var currentCon = document.getElementById('currentInfo');
            document.getElementById('city').textContent = city + ' ' + date;

            var tempList = document.createElement('li');
            temp.textContent = "Temperature: " + temp + "°F";
            currentCon.appendChild(tempList);

            var windMPH = document.createElement('li');
            windMPH.textContent = "Wind Speed: " + wind + "MPH";
            currentCon.appendChild(windMPH);

            var hum = document.createElement('li');
            hum.textContent = "Humidity: " + humidity + "%";
            currentCon.appendChild(hum);
            
            var uvIndex = document.createElement('li');
            uvIndex.textContent = "UV Index: " + uvi;
            if (uvi < 3) { 
                uvIndex.style.backgroundColor = 'green';
            } else if (uvi < 6) {
                uvIndex.style.backgroundColor = 'yellow';
            } else if (uvi < 8) {
                uvIndex.style.backgroundColor = 'orange';
            } else if (uvi < 11) {
                uvIndex.style.backgroundColor = 'red';
                test.style.color = 'white'
            }
            currentCon.appendChild(uvIndex);
            
            futureWeather(data);
        })
};

//5 DAY FORECAST
function futureWeather(data) {
    var forecast = data.daily;
    var futureCon = document.getElementById('5day');
    futureCon.innerHTML = "";
    for (var i = 1; i < forecast.length; i++) {
        var card = document.createElement('div');
        card.setAttribute('class', 'card');
        var futDate = document.createElement('h4');
        var futIcon = document.createElement('img');
        var futTemp = document.createElement('p');
        var futHum = document.createElement('p');
        var futWind = document.createElement('p');
        var futUvi = document.createElement('p');
        var dailyIcon = forecast[i].weather[0].icon;
        futDate.innerText = moment().add(i, 'd').format('MMMM Do YYYY');
        futTemp.innerText = "Temperature: " + forecast[i].temp.day + "°F";
        futHum.innerText = "Humidity: " + forecast[i].humidity + "%";
        futWind.innerText = "Wind Speed: " + forecast[i].wind_speed + "MPH";

        futIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + dailyIcon + '@2x.png');
        futIcon.setAttribute('alt', 'weather icon');
        futIcon.setAttribute("width", "25px");
        futIcon.setAttribute("height", "25px");
        card.appendChild(futDate);
        card.appendChild(futIcon);
        card.appendChild(futTemp);
        card.appendChild(futHum);
        card.appendChild(futWind);

        futureCon.appendChild(card);
    }
};

// displaySearch();
