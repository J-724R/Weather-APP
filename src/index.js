import layout from './layout.css';
import style from './style.css';


// - Your API key is 85051ca8511a9148395ef7966174f9c7


function printData(data){
    console.log(data);
    console.log(data.weather[0].description);
}

// function getWeather (){
//     const Key = "85051ca8511a9148395ef7966174f9c7";
//     let lat = 80.000; //Vertical
//     let lon = 26.700; //Horizontal
    
//     return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key}&units=metric`)
//         .then(response => { return response.json()})
//         .then(response => { 
//             printData(response);
//         });
// } 

// getWeather();

async function getWeatherAsync (){
    const Key = "85051ca8511a9148395ef7966174f9c7";
    let lat = 4.624; //Vertical
    let lon = -74.0636; //Horizontal

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key}&units=metric`);
        const weatherData = await response.json();
        
        if (response.status >= 400) {
            return weatherData;
        }

        return printData(weatherData);
    } catch (error) {
        return console.log(error.name + " message: " + error.message);
    }                     
}

// console.log(getWeatherAsync());

getWeatherAsync();




// const Key = "85051ca8511a9148395ef7966174f9c7";
// let lat = 80.000; //Vertical
// let lon = 26.700; //Horizontal



// const data = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key}&units=metric`)
//                 .then(response => { return response.json()})
//                 .then(response => { 
//                      return response;
//                 });

//  printData(data);               