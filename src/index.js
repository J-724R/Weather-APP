import './main.css';
import API from './components/weatherAPI.js';
import _ from 'lodash';

console.log(`\n\n\n`);

function processData(data){
    const _safedata = data
        .replace(',', '')
        .replace(/\/|<|>/g, '')
        .split(' ');

    if((_safedata.length > 2)
        || ((_safedata[1])&&(_safedata[1].length > 2))){
        return console.log("Please match the pattern")
    } else if (!_safedata[1]){
        _safedata[1]="";
    }

    const dataObj = {
        city: _safedata[0],
        country: _safedata[1]
    }
  
    return dataObj;
}

function checkUnits(){
    const unit = document
        .querySelector('div.units')
        .getAttribute('data-unit');

    if(unit === 'metric'){
        return 'metric';
    }else{
        return 'imperial';
    }
}

function eventHandlers() {
    const searchBox = document.querySelector('#searchbox');
    const searchButton = document.querySelector('.searchbutton');
    const units =  document.querySelector('div.units');
    
    searchBox.addEventListener('keydown', (e) => {
        if (e.key === 'enter') searchButton.click();
    });
    
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchBoxValue = searchBox.value;
        const safedata = processData(searchBoxValue); 
        console.log(safedata);
    
        API.getWeatherData(safedata.city, safedata.country);
    });
    
    units.addEventListener('click', () => {
        const unit = checkUnits();
        console.log(unit);
    
        if (unit === 'metric'){
            units.setAttribute('data-unit', 'imperial');
            units.textContent = 'Display °F';
            // render Metric data
        } else if (unit === 'imperial'){
            units.setAttribute('data-unit', 'metric');
            units.textContent= 'Display °C';
            // render Imperial data
        }
    });
}

eventHandlers();

//fucntion processData