const APIkey = "e0b3d25983b510fe96dc5aa48fe2fda7";

// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };
  
//     fetch("https://api.openweathermap.org/data/2.5/weather?q=minsk&appid=e0b3d25983b510fe96dc5aa48fe2fda7", requestOptions)
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

//     fetch("https://api.openweathermap.org/data/2.5/forecast?q=minsk&appid=e0b3d25983b510fe96dc5aa48fe2fda7")
//     .then(response => response.json())
//     .then(result => {

//         const forecastList = result.list;

//         console.log(forecastList);

//         forecastList.forEach(forecast => {
//             const dateTime = forecast.dt_txt;
//             const temperature = forecast.main.temp;

//             console.log(`Forecast at ${dateTime}: Temperature ${temperature}K`);
//         });
//     });



const searchButton = document.getElementById('searchBtn');

function getApi() {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=minsk&appid=e0b3d25983b510fe96dc5aa48fe2fda7';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let cityToday = document.getElementById('cityToday')
        let tempToday = document.getElementById('tempValue');
        let windToday = document.getElementById('windValue');
        let humToday = document.getElementById('humidityValue');
  
        let tempFahrenheit = (data.main.temp - 273.15) * 9/5 + 32;
  
        let windMPH = data.wind.speed * 2.237;

        let timestamp = data.dt * 1000;
        let currentDate = new Date(timestamp);

        let year = currentDate.getFullYear();
        let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        let day = ('0' + currentDate.getDate()).slice(-2);
  
        // Formatted date string (YYYY-MM-DD)
        let formattedDate = month + '/' + day + '/' + year;

        cityToday.textContent = data.name + ' (' + formattedDate + ')';
        tempToday.textContent = tempFahrenheit.toFixed(2);
        windToday.textContent = windMPH.toFixed(2);
        humToday.textContent = data.main.humidity;
      });
  }
  
  searchButton.addEventListener('click', getApi);




   


