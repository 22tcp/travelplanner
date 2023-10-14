import './styles/main.scss'

import Pic from '../static/travel-agent2.png'
//import * as bootstrap from 'bootstrap'

import { handleSubmit  } from './js/app.js'

export { handleSubmit }

function addPicture() {
  const element = document.createElement('div');
  const myImage = new Image();
  myImage.src = Pic;
  myImage.id  = 'Pic';
  element.appendChild(myImage);
  return element;
}

document.getElementById('vPicture').appendChild(addPicture());

//calculate offset for min input and create the date picker with it


function addDateInput() {
  let dobject = new Date( new Date().getTime());
  const tzo = dobject.getTimezoneOffset();
  dobject.setDate(dobject.getDate() + 1)
  let dlimit = dobject.toISOString().slice(0,10);
  const element = document.createElement('input');
  element.setAttribute("type", "date")
  element.setAttribute("min", dlimit );
  element.setAttribute("max","2099-12-31");
  return element;
}
document.getElementById('datepicker').appendChild(addDateInput());

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to a button or any other element
    const button = document.getElementById('myButton');
    if ( button == typeof(Object) ) { button.addEventListener('click', handleSubmit);}
  });
