import './main.css';
import { weather, UI } from './components/eventHandlers.js';
import _ from 'lodash';

weather.eventHandlers();
UI.changeForecast();
UI.toggleForecast();

console.log(`\n\n\n`);

