import './main.scss';
import { weather, UI } from './components/eventHandlers.js';
import _ from 'lodash';
// require('../src/main.scss');


UI.toggleForecast();
UI.changeForecast();

weather.eventHandlers();

console.log(`\n\n\n`);

