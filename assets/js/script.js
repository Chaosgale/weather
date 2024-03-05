


  function getApiFive(cityName) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=e0b3d25983b510fe96dc5aa48fe2fda7`

    fetch(requestUrl)
    .then(response => response.json())
    .then(result => {

        const forecastList = result.list;

        console.log(forecastList);

        let selectedDates = [];
        let selectedIcon = [];
        let selectedTemp = [];
        let selectedWind = [];
        let selectedHum = [];

        forecastList.forEach((forecast, index) => {

            let iconcode = forecast.weather[0].icon
            let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

            let tempFahrenheit = (forecast.main.temp - 273.15) * 9/5 + 32;
            let windMPH = forecast.wind.speed * 2.237;
            let hum = forecast.main.humidity;

            let dateMath = forecast.dt * 1000;
            let thatDate = new Date(dateMath)

            let year = thatDate.getFullYear();
            let month = ('0' + (thatDate.getMonth() + 1)).slice(-2);
            let day = ('0' + thatDate.getDate()).slice(-2);

            let formattedDate = month + '/' + day + '/' + year;
            
            if (index === 5 || index === 13 || index === 21 || index === 29 || index === 37) {
                selectedDates.push(formattedDate);
                selectedIcon.push(iconurl);
                selectedTemp.push(tempFahrenheit);
                selectedWind.push(windMPH);
                selectedHum.push(hum);
            }
        })

        console.log(selectedDates);
        document.getElementById('dateOne').textContent = selectedDates[0];
        document.getElementById('dateTwo').textContent = selectedDates[1];
        document.getElementById('dateThree').textContent = selectedDates[2];
        document.getElementById('dateFour').textContent = selectedDates[3];
        document.getElementById('dateFive').textContent = selectedDates[4];

        console.log(selectedIcon);
        document.getElementById('iconOne').setAttribute("src", selectedIcon[0]);
        document.getElementById('iconTwo').setAttribute("src", selectedIcon[1]);
        document.getElementById('iconThree').setAttribute("src", selectedIcon[2]);
        document.getElementById('iconFour').setAttribute("src", selectedIcon[3]);
        document.getElementById('iconFive').setAttribute("src", selectedIcon[4]);

        console.log(selectedTemp);
        document.getElementById('tempOne').textContent = selectedTemp[0].toFixed(2);
        document.getElementById('tempTwo').textContent = selectedTemp[1].toFixed(2);
        document.getElementById('tempThree').textContent = selectedTemp[2].toFixed(2);
        document.getElementById('tempFour').textContent = selectedTemp[3].toFixed(2);
        document.getElementById('tempFive').textContent = selectedTemp[4].toFixed(2);

        console.log(selectedWind);
        document.getElementById('windOne').textContent = selectedWind[0].toFixed(2);
        document.getElementById('windTwo').textContent = selectedWind[1].toFixed(2);
        document.getElementById('windThree').textContent = selectedWind[2].toFixed(2);
        document.getElementById('windFour').textContent = selectedWind[3].toFixed(2);
        document.getElementById('windFive').textContent = selectedWind[4].toFixed(2);

        console.log(selectedHum);
        document.getElementById('humOne').textContent = selectedHum[0];
        document.getElementById('humTwo').textContent = selectedHum[1];
        document.getElementById('humThree').textContent = selectedHum[2];
        document.getElementById('humFour').textContent = selectedHum[3];
        document.getElementById('humFive').textContent = selectedHum[4];

    })
    .catch(function(error) {
        console.log('Error fetching weather data:', error);
      });
  }

  function getApi(cityName) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e0b3d25983b510fe96dc5aa48fe2fda7`;
  
    fetch(requestUrl)
      .then(function (response) {
        if (!response.ok) {
            throw new Error('City not found');
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        
        let todayIcon = document.getElementById('todayIcon');
        let iconcode = data.weather[0].icon;
        let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        todayIcon.setAttribute("src", iconurl);

        let tempFahrenheit = (data.main.temp - 273.15) * 9/5 + 32;
  
        let windMPH = data.wind.speed * 2.237;

        let timestamp = data.dt * 1000;
        let currentDate = new Date(timestamp);

        let year = currentDate.getFullYear();
        let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        let day = ('0' + currentDate.getDate()).slice(-2);
  
        let formattedDate = month + '/' + day + '/' + year;

        document.getElementById('cityToday').textContent = data.name + ' (' + formattedDate + ')';
        document.getElementById('tempValue').textContent = tempFahrenheit.toFixed(2);
        document.getElementById('windValue').textContent = windMPH.toFixed(2);
        document.getElementById('humidityValue').textContent = data.main.humidity;

        // Only save and load search if the city exists
        saveAndLoadSearch(cityName);
      })
      .catch(function(error) {
        console.log('Error fetching weather data:', error);
        alert('City not found. Please enter a valid city name.');
      });
  }

  function saveAndLoadSearch(cityName) {
    saveSearchQuery(cityName);
    loadPreviousSearches();
  }

  function saveSearchQuery(cityName) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    let lowerCaseCityName = cityName.toLowerCase();
    if (!searches.includes(lowerCaseCityName)) {
        searches.unshift(lowerCaseCityName);
        if (searches.length > 6) {
            searches.pop();
        }
        localStorage.setItem('searches', JSON.stringify(searches));
    }
  }

  function loadPreviousSearches() {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    let prevSearchDiv = document.getElementById('prevSearch');
    prevSearchDiv.innerHTML = '';
    searches.forEach(cityName => {
        let button = document.createElement('h4');
        let capitalizedCityName = cityName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        button.textContent = capitalizedCityName;
        button.addEventListener('click', function() {
            getApi(cityName);
            getApiFive(cityName);
        });
        prevSearchDiv.appendChild(button);
    })
  }

  window.addEventListener('load', loadPreviousSearches);

  const searchButton = document.getElementById('searchBtn');

  searchButton.addEventListener('click', () => {
    let cityName = document.getElementById('input').value.trim();
    if(cityName !== '') {
        getApi(cityName);
        getApiFive(cityName);
    } else {
        alert('Please enter a city name')
    }
  });




