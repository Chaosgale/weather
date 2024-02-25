const APIkey = "e0b3d25983b510fe96dc5aa48fe2fda7";

let city;

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
    fetch("https://api.openweathermap.org/data/2.5/weather?q=minsk&appid=e0b3d25983b510fe96dc5aa48fe2fda7", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=minsk&appid=e0b3d25983b510fe96dc5aa48fe2fda7")
    .then(response => response.json())
    .then(result => {

        const forecastList = result.list;

        console.log(forecastList);

        forecastList.forEach(forecast => {
            const dateTime = forecast.dt_txt;
            const temperature = forecast.main.temp;

            console.log(`Forecast at ${dateTime}: Temperature ${temperature}K`);
        });
    });





   


