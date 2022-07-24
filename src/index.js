import './main.scss';
import API from './components/weatherAPI';
import { weather, UI } from './components/eventHandlers.js';
// require('../src/main.scss');

UI.toggleForecast();
UI.changeForecast();
weather.eventHandlers();

function nameShortener (name){
    const shortName = name.split(' ');
    let NewName;

    if(shortName.length >= 3) {
        let temp = shortName[2]
        shortName[2] = temp.replace(/(\W)/g, '');
    }

    NewName = `${shortName[0]} ${shortName[1]} ${shortName[2]}`;

    return NewName;
}

function loadDefaultCoords(){
    weather.load('Miami', 'US', "metric");
}

async function loadCustomCoords(position){
    const coords = position.coords;
    const data = await API.reverseGeocode(coords);
    const city = nameShortener(data[0].name);

    weather.load(city, data[0].country, "metric");

    console.log(position.coords);
    console.log("inside loadCustomCoords");
    console.log(data);
    console.log(city);
    console.log(data[0].country);
}


try{
    navigator.geolocation.getCurrentPosition(loadCustomCoords, loadDefaultCoords);
}catch{
    prompt("Please enable location services");
}

console.log(`\n\n\n`);

 