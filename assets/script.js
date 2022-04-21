var apiKey = 'ea52895286adcad8d4523f39e7547325'
var storedCity = JSON.parse(localStorage.getItem('city')) || [];


$(document).ready(function() {
    $('#searchBtn').on('click', function(){
        var searchValue = $('#searchBar').val();


        console.log(searchValue)
        //search weather
        getCord(searchValue);
        saveSearch(searchValue)
    });

    $('#pastSearch').on('click', 'li', function() {
        searchWeather($(this).text());
    });

//save search to local storage
function saveSearch (searchValue) {

    storedCity.push(searchValue);
    localStorage.setItem('city', JSON.stringify(storedCity));
}    

document.getElementById('past').addEventListener('click', function (event) {
    var city = event.target.innerText;
    document.getElementById('currentInfo').innerHTML = '';
    searchValue(city);
});

//create past location list
    function makeRow(text) {
        var li = $('<button>').addClass('list-group-item list-group-item-action').text(text);           
        $('#past').append(li);

    }


//ajax to auto reload page with coordinates
function getCord(searchValue) {
    $.ajax({
        type: "GET",
        url: 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&appid=' + apiKey
    }) .then (data => {console.log(data[0]) 
    
    makeRow(searchValue)

    searchWeather (data [0].lat, data[0].lon)

    futWeather (data [0].lat, data[0].lon)
    })
}


//ajax to get current weather
function searchWeather (lat, lon) {

    $.ajax({
        type: "GET",
        url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=daily, hourly, minutely' + '&appid=' + 
        apiKey + '&units=imperial'
    }) .then(data => {console.log(data) 
    

        var currentCon = document.getElementById('currentInfo');
        currentCon.innerHTML = '';
        document.getElementById('city').textContent = city + ' ' + date;
        var date = moment().format('MMMM Do YYYY');
        var temp = data.current.temp;
        var humidity = data.current.humidity;
        var wind = data.current.wind_speed;
        var uvi = data.current.uvi;
        var icon = data.current.weather[0];


        var tempList = document.createElement('li');
        tempList.textContent = "Temperature: " + temp + "°F";
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
    
    
    });


};

//future weather
function futWeather (lat, lon) {
    
        $.ajax({
            type: "GET",
            url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=current, hourly, minutely' + '&appid=' + apiKey
        }) .then(data => {console.log(data)  
        
            var forecast = data.daily;


    var futureCon = document.getElementById('5days');
    futureCon.innerHTML = "";
    for (var i = 1; i < 6; i++) {
        var card = document.createElement('div');
        card.setAttribute('class', 'card text-white bg-primary row');
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
        
        })
    
    }

    for (var i = 0 ; i < storedCity.length; i++) {
        makeRow(storedCity[i])
    }
});
