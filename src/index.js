import layout from './layout.css';
import style from './style.css';


// - Your API key is 85051ca8511a9148395ef7966174f9c7

// getWeatherAsync();
console.log(`\n\n\n`);

function printCoords(data){
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
    console.log(" ");
    console.log(data);
    console.log(`
        country: ${data[0].country} \n
        state: ${data[0].state} \n
        name: ${data[0].name} \n 
        latitude: ${data[0].lat} \n 
        longitude: ${data[0].lon}`);
    
}

async function getWeather (location, country){
    const Key = "85051ca8511a9148395ef7966174f9c7";
    let unit = "metric";
    //get metrics
    if (!country) {
        country = "";
    }

    try {
        const requestCoords =  await 
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location},${country}&limit=1&appid=${Key}`,
            { method: "GET" }
        );
        const coords = await requestCoords.json();
        printCoords(coords);


        const requestWeather = await
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0].lat}&lon=${coords[0].lon}&exclude=minutely&units=${unit}&appid=${Key}`,
            { method: "GET" }
        );
        const weather = await requestWeather.json();
        printData(weather);
                 


    }catch(error){
        return console.log(error);
    }
}

getWeather('cucuta', 'co');