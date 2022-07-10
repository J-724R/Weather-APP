import { addSeconds, fromUnixTime } from 'date-fns';

const API = (() => {
  const Key = "85051ca8511a9148395ef7966174f9c7";  
    function printCoordinates(data){
        console.log(" ");
        console.log(data);
        console.log(`
            country: ${data[0].country} \n
            state: ${data[0].state} \n
            name: ${data[0].name} \n 
            latitude: ${data[0].lat} \n 
            longitude: ${data[0].lon}`);  
    }

    function printData(data){
        console.log(data);
    }

    async function getCoordinates(location, country, units){
        try {
            const requestCoordinates =  await 
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location},${country}&limit=1&appid=${Key}`,
            { method: "GET" }
            );
            const coordinates = await requestCoordinates.json();
            printCoordinates(coordinates);

            return getWeatherData(coordinates, units);
        }catch(error){
            return console.log(error);
        }
    }

    async function getWeatherData(coordinates, units){
        try {
            const requestWeather = await
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&exclude=minutely&units=${units}&appid=${Key}`,
                { method: "GET" }
            );
            const weather = await requestWeather.json();
            printData(weather);
            return processData(coordinates, weather, units);
        }catch(error){
            return console.log(error);
        }
    }

    async function processData (coordinates, weather, units){
        if(!coordinates[0].state) coordinates[0].state = "";
      
        const fullCountryNames = new Intl.DisplayNames(['en'], {
            type: 'region',
        });

        // Merge and shortcut data to a single obiect and round values
        const data = {
            city: coordinates[0].name,
            state: coordinates[0].state,
            country: fullCountryNames.of(coordinates[0].country),
            units,
            current: {
              temp: Math.round(weather.current.temp),
              feelsLike: Math.round(weather.current.feels_like),
              humidity: weather.current.humidity,
              clouds: weather.current.clouds,
              uvi: Math.round(weather.current.uvi),
              visibility: weather.current.visibility / 1000,
              windSpeed: weather.current.wind_speed,
              windDegree: weather.current.wind_deg,
              weatherDescription: weather.current.weather[0].description,
              icon: weather.current.weather[0].icon,
              chanceOfRain: Math.round(weather.hourly[0].pop * 100),
              sunriseTime: addSeconds(
                fromUnixTime(weather.current.sunrise),
                weather.timezone_offset + (new Date().getTimezoneOffset() * 60),
              ),
              sunsetTime: addSeconds(
                fromUnixTime(weather.current.sunset),
                weather.timezone_offset + (new Date().getTimezoneOffset() * 60),
              ),
              moonPhase: weather.daily[0].moon_phase,
              time: addSeconds(
                new Date(),
                weather.timezone_offset + (new Date().getTimezoneOffset() * 60),
              ),
            },
            daily: [],
            hourly: [],
        };


        for (let i = 0; i < 7; i++) {
            data.daily[i] = {
              date: addSeconds(
                fromUnixTime(weather.daily[i].dt),
                weather.timezone_offset,
              ),
              icon: weather.daily[i].weather[0].icon,
              tempDescription: weather.daily[i].weather[0].description,
              dayTemp: Math.round(weather.daily[i].temp.day),
              nightTemp: Math.round(weather.daily[i].temp.night),
              chanceOfRain: Math.round(weather.daily[i].pop * 100),
              windDegree: weather.daily[i].wind_deg,
              windSpeed: weather.daily[i].wind_speed,
              humidity: weather.daily[i].humidity,
            };
        }
      
        for (let i = 1; i < 24; i++) {
          data.hourly[i] = {
            date: addSeconds(
              new Date(),
              weather.timezone_offset + (new Date().getTimezoneOffset() * 60) + (i * 3600),
            ),
            icon: weather.hourly[i].weather[0].icon,
            tempDescription: weather.hourly[i].weather[0].description,
            temp: Math.round(weather.hourly[i].temp),
            chanceOfRain: Math.round(weather.hourly[i].pop * 100),
            windDegree: weather.hourly[i].wind_deg,
            windSpeed: weather.hourly[i].wind_speed,
            windGust: weather.hourly[i].wind_gust,
            humidity: weather.hourly[i].humidity,
          };
        }

        return data;
    }

    async function reverseGeocode(coordinates){
        try {
          const reverseLocation = await 
            fetch (`http://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${Key}`
          );
          const location = await reverseLocation.json();

          return location;
        }catch(error){
            return console.log(error);
        }
    }

    return {getCoordinates, getWeatherData, reverseGeocode};
})();

export default API;
