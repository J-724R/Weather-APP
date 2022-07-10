import createHtmlElement from "./htmlCreateor.js";
import assignIcons from "./icons.js";
import { format } from "date-fns";

const getItems = (() => {
    const d = document;

    const mainContainer = (() => {
        const mainContainer = d.querySelector('.main_info_container'),
            $basicInfo = mainContainer.querySelector('.basic_info'),
             $location = mainContainer.querySelector('.location'),
             $date = mainContainer.querySelector('.date'),
              $weatherIcon = mainContainer.querySelector('.weather_icon'),
              $temperature = mainContainer.querySelector('.display_temp'),
             $description = mainContainer.querySelector('.description'),
             $feelsLike = mainContainer.querySelector('.feels_like'),
            $extraInfo = mainContainer.querySelector('.extra_info'),
             $rain = mainContainer.querySelector('#rain'),
             $rainData = mainContainer.querySelector('#rainData'),
             $rainIcon = mainContainer.querySelector('#rainIcon'),
             $humidity = mainContainer.querySelector('#humidity'),
             $humidityData = mainContainer.querySelector('#humidityData'),
             $humidityIcon = mainContainer.querySelector('#humidityIcon'),
             $windSpd = mainContainer.querySelector('#windSpeed'),
             $windSpdData = mainContainer.querySelector('#windSpeedData'),
             $windSpdIcon = mainContainer.querySelector('#windSpeedIcon'),
             $UVindex = mainContainer.querySelector('#UVindex'),
             $UVindexData = mainContainer.querySelector('#UVindexData'),
             $UVindexIcon = mainContainer.querySelector('#UVindexIcon');
        
        return {$basicInfo, $location, $date, $weatherIcon, $temperature, $description, $feelsLike, $extraInfo, $rain, $rainData, $rainIcon, $humidity, $humidityData, $humidityIcon, $windSpd, $windSpdData, $windSpdIcon, $UVindex, $UVindexData, $UVindexIcon};     
    })();

    const popInfoBtn = (() => {
        return d.querySelector('.extra_info_button');
    })();

    const forecastContainer = (() => {
        const mainContainer = d.querySelector('.weather_forecast'),
            $options = mainContainer.querySelector('.forecast_options'),
             $hourlyBtn = mainContainer.querySelector('[data-hoursBtn]'),
             $dailyBtn = mainContainer.querySelector('[data-dailyBtn]'),
            $header = mainContainer.querySelector('.header'),
             $headerDate = mainContainer.querySelector('.forecast_item_date'),
            $forecast = mainContainer.querySelector('.forecast_info_container'),
             $hourlyForecast = mainContainer.querySelector('.Hourly_Container'),
             $dailyForecast = mainContainer.querySelector('.Daily_Container');

        return {mainContainer, $options, $hourlyBtn, $dailyBtn, $header, $headerDate, $forecast, $hourlyForecast, $dailyForecast};
    })();

    return{mainContainer, popInfoBtn, forecastContainer}
})();

const loadData = (() => {
    function formatTime(data, units) {
        let time, hours, sunrise, sunset, days;

        if (units === 'imperial') {
          time = format(data, 'EEEE d MMMM yyyy | h:mm aa');
          hours = format(data, 'hh:00 aa'); 
          sunrise = format(data, 'hh:mm aa');
          sunset = format(data, 'hh:mm aa');
          days = format(data, 'EEEE');

        }else if (units === 'metric') {
          time = format(data, 'EEEE d MMMM yyyy | H:mm');
          hours = format(data, 'HH:00');
          sunrise = format(data, 'HH:mm');
          sunset = format(data, 'HH:mm');
          days = format(data, 'EEEE');

        }  

        return { time, hours, sunrise, sunset, days};
    }
    
    function setUnits(data){
        const units = (data.units === "metric")

            const temp = units ?  "°C" : "°F" ;
            const longitude = units ? "Km" : "Mi" ;
            const speed = units ? "Km/h" : "Mph" ;
        
        return {temp, longitude, speed}
    }

    function mainContainer(data){
        const state = (data.state) ? " "+data.state+"," : "";

        //$basic info                                   
        getItems.mainContainer.$location.innerText = `${data.city},${state} ${data.country}`;
        getItems.mainContainer.$date.innerText = formatTime(data.current.time, data.units).time;
        getItems.mainContainer.$weatherIcon.innerHTML = assignIcons(data.current.icon);
        getItems.mainContainer.$temperature.innerText = `${data.current.temp} ${setUnits(data).temp}`;
        getItems.mainContainer.$description.innerText = data.current.weatherDescription;
        getItems.mainContainer.$feelsLike.innerText = `Feels Like: ${data.current.feelsLike} ${setUnits(data).temp}`;
        //$extra info
        getItems.mainContainer.$rainData.innerText = data.current.chanceOfRain + " %";
        getItems.mainContainer.$humidityData.innerText = data.current.humidity + " %";
        getItems.mainContainer.$windSpdData.innerText = `${data.current.windSpeed} ${setUnits(data).speed}`;
        getItems.mainContainer.$UVindexData.innerText = data.current.uvi;

    }

    function HourlyForecast(data){
        if (document.querySelector('.Hourly_Container')){ 
            document.querySelector('.Hourly_Container').remove() 
        }

        const $hourlyForecast = createHtmlElement('div', null, ['Hourly_Container'], null, null);

        for (let i = 1; i < 24; i++) {
            // (type, id, classesArray, content, attributeObject{name,value})
            const $item = createHtmlElement('div', null, ['forecast_item'], null, [{ name: 'data-currentHour-plus'+i, value: "" }]);
                const date = createHtmlElement('div', null, ['forecast_item_date'], formatTime(data.hourly[i].date, data.units).hours , null);
                const icon = createHtmlElement('div', null, ['forecast_item_icon'], assignIcons(data.hourly[i].icon) , null);
                const temp = createHtmlElement('div', null, ['forecast_item_temp'], `${data.hourly[i].temp} ${setUnits(data).temp}`, null);
                const rain = createHtmlElement('div', null, ['forecast_item_rain'], `${data.hourly[i].chanceOfRain} %` , null);
                const humidity = createHtmlElement('div', null, ['forecast_item_humidity'], `${data.hourly[i].humidity} %`, null);
            
            getItems.forecastContainer.$forecast
                .appendChild($hourlyForecast)
                .appendChild($item)
                .append(date, icon, temp, rain, humidity);
        }
        
    }
    
    function DailyForecast(data){
        if (document.querySelector('.Daily_Container')){ 
            document.querySelector('.Daily_Container').remove() 
        }

        const $dailyForecast = createHtmlElement('div', null, ['Daily_Container'], null, null);

        for (let i = 0; i < 7; i++) {
            const $item = createHtmlElement('div', null, ['forecast_item'], null, [{ name: 'data-currentDay-plus'+i, value: "" }]);
                const date = createHtmlElement('div', null, ['forecast_item_date'], formatTime(data.daily[i].date, data.units).days, null);
                const icon = createHtmlElement('div', null, ['forecast_item_icon'], assignIcons(data.daily[i].icon), null);
                const temp = createHtmlElement('div', null, ['forecast_item_temp'], `${data.daily[i].dayTemp} ${setUnits(data).temp}`, null);
                const rain = createHtmlElement('div', null, ['forecast_item_rain'], `${data.daily[i].chanceOfRain} %`, null);
                const humidity = createHtmlElement('div', null, ['forecast_item_humidity'], `${data.daily[i].humidity} %`, null);
    
            getItems.forecastContainer.$forecast
                .appendChild($dailyForecast)
                .appendChild($item)
                .append(date, icon, temp, rain, humidity);
        }
    }

    return {mainContainer, HourlyForecast, DailyForecast}
})();


export {getItems, loadData};


