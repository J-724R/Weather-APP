import './main.css';
// import API from './components/weatherAPI.js';

console.log(`\n\n\n`);


function procesData(data){
    const _safedata = data
        .replace(',', '')
        .replace(/\/|<|>/g, '')
        .split(' ');
    
    if((_safedata.length > 2)
        || (_safedata[1].length > 2)){
        return console.log("Please match the pattern")
    }

    const dataobj = {
        city: _safedata[0],
        country: _safedata[1]
    }
  
    return dataobj;
}

const searchBox = document.querySelector('#searchbox');
const searchButton = document.querySelector('.searchbutton');

searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'enter') searchButton.click();
});

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchBoxValue = searchBox.value;
    const safedata = procesData(searchBoxValue); 
    console.log(safedata);
    // API.getWeatherData(searchBoxValue);
});

//fucntion processData