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

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to a button or any other element
    const button = document.getElementById('myButton');
    if ( button == typeof(Object) ) { button.addEventListener('click', handleSubmit);}
  });
