import './styles/main.scss'


//import * as bootstrap from 'bootstrap'

import { handleSubmit } from './js/app.js'
import { checkCompleteness } from './js/app.js'
import { addDateInput } from './js/app.js'
import { timespan } from './js/app.js'
import { addPicture } from './js/app.js'
import { fetchCountries } from './js/app.js'
export { handleSubmit }






document.addEventListener('DOMContentLoaded', () => {
  // Add event listener to a button or any other element
  const button = document.getElementById('myButton');
  if (button == typeof (Object)) { button.addEventListener('click', handleSubmit); }

  document.getElementById('destination').addEventListener(
    "keyup", (ev) => {
      if (ev.key === 'Enter' || ev.code === 13) {
        ev.preventDefault;
      }
    }
  );

  setTimeout( () =>{
    document.getElementById('incomplete').classList.add('nodisplay')
  },3000)

  fetchCountries();

  document.getElementById('vPicture').appendChild(addPicture());
  document.getElementById('datepicker').appendChild(addDateInput());
  document.getElementById('datepickerinput').addEventListener('blur', timespan );
  document.getElementById('voyageAdd').addEventListener('click', checkCompleteness );
});

