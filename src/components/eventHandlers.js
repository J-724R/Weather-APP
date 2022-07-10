import API from './weatherAPI.js';
import { getItems, loadData } from './DOMstuffs.js';

const weather = (() => {
    function processData(data){
        let _safedata = data
            .replace(/\/|<|>/g, '')
            .replace(/(,\s+)/g, ',') // remove any white space that follows a comma
            .replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
            .split(',');
    
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
    
    //StiLl needs some implementations
    async function load(city, country, units){
        
        //DOM waiting animation 
    
        const data = await API.getCoordinates(city, country, units)
        
        console.log(data);
        loadData.mainContainer(data);
        loadData.HourlyForecast(data);
        loadData.DailyForecast(data);

        //render data
        //Close waiting animation
        
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
            const unitsValue = checkUnits();
            const safeData = processData(searchBoxValue);

            // implement required and clean input 
            load(safeData.city, safeData.country, unitsValue);
        });
        
        units.addEventListener('click', () => {
            const unit = checkUnits();
    
            if (unit === 'metric'){
                units.setAttribute('data-unit', 'imperial');
                units.textContent = 'Display °F';
            } else if (unit === 'imperial'){
                units.setAttribute('data-unit', 'metric');
                units.textContent= 'Display °C';
            }
    
            searchButton.click();
        });
    }

    return {eventHandlers, load}
})();

const UI = (() => {
    function changeForecast() {
        const headerDate = getItems.forecastContainer.$headerDate;

        getItems.forecastContainer.$options.addEventListener('click', (e) => {
            const hourlyForecast = document.querySelector('.Hourly_Container');
            const dailyForecast = document.querySelector('.Daily_Container');
            
            if (e.target.innerText === 'Hourly') {
                headerDate.textContent = 'Time';
                    
                dailyForecast.style.display = 'none';
                hourlyForecast.style.display = 'flex';

            } else if (e.target.innerText === 'Daily') {
                headerDate.textContent = 'Day';
                hourlyForecast.style.display = 'none';
                dailyForecast.style.display = 'flex';
            }
        });
    }

    function toggleForecast(){
        getItems.popInfoBtn.addEventListener('click', () => {
            const btn = getItems.forecastContainer.mainContainer;
                
            (btn.style.visibility == 'hidden') 
                ? btn.style.visibility = 'visible' 
                : btn.style.visibility = 'hidden';

        });
    }

    return {changeForecast, toggleForecast}
})();

export {weather, UI};