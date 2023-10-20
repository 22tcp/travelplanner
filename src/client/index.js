import './styles/main.scss'

import Pic from '../static/travelcat.jpg'
//import * as bootstrap from 'bootstrap'

import { handleSubmit  } from './js/app.js'

export { handleSubmit }

function addPicture() {
  const myImage = new Image();
  myImage.classList.add("ha-image");
  myImage.src = Pic;
  myImage.id  = 'Pic';
  return myImage;
}

document.getElementById('vPicture').appendChild(addPicture());

//calculate offset for min input and create the date picker with it


function addDateInput() {
  let dobject = new Date( new Date().getTime());
  const tzo = dobject.getTimezoneOffset();
  dobject.setDate(dobject.getDate() + 1);
  let dlimit = dobject.toISOString().slice(0,10);
  const element = document.createElement('input');
  element.setAttribute("type", "date");
  element.setAttribute("min", dlimit );
  element.setAttribute("max","2099-12-31");
  element.setAttribute("id", "datepickerinput")
  element.classList.add("date-picker");
  return element;
}
document.getElementById('datepicker').appendChild(addDateInput());

const checkCompleteness = () => {
  const destdata = document.getElementById('destination');
  const lengthdestdata = destdata.value.length;
  const lengthdatedata = document.getElementById('datepickerinput').value.length;
  const incompobj = document.getElementById('incomplete');
  const duration  = document.getElementById('duration');
  if ( lengthdestdata < 1 || lengthdatedata << 1 ){
    incompobj.classList.remove('nodisplay');
    destdata.focus();
    incompobj.classList.add('important');
    duration.classList.add('nodisplay');

    setTimeout( () => {
      incompobj.classList.add('nodisplay');
      duration.classList.remove('nodisplay');
    }, 4000);
    return;
  }
}

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to a button or any other element
    const button = document.getElementById('myButton');
    if ( button == typeof(Object) ) { button.addEventListener('click', handleSubmit);}

    document.getElementById('destination').addEventListener(
      "keyup", (ev) => { 
        if ( ev.key === 'Enter' || ev.code === 13 ) {
          ev.preventDefault;
        }
      }
    );

    document.getElementById('voyageAdd').addEventListener('click', checkCompleteness )
});

