import './styles/main.scss'

import Pic from '../static/travelcat.jpg'
//import * as bootstrap from 'bootstrap'

import { handleSubmit } from './js/app.js'
import { checkCompleteness } from './js/app.js'
import { addDateInput } from './js/app.js'

export { handleSubmit }

function addPicture() {
  const myImage = new Image();
  myImage.classList.add("ha-image");
  myImage.src = Pic;
  myImage.id = 'Pic';
  return myImage;
}





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
  document.getElementById('vPicture').appendChild(addPicture());
  document.getElementById('datepicker').appendChild(addDateInput());
  document.getElementById('voyageAdd').addEventListener('click', checkCompleteness);
});

