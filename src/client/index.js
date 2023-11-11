import './styles/main.scss'
import { storageEvaluate } from './js/app.js'
import { checkComplete } from './js/app.js'
import { deleteTraveldata } from './js/app.js'
import { addDateInput } from './js/app.js'
import { timespan } from './js/app.js'
import { addPicture } from './js/app.js'
import { initialSearch } from './js/app.js'
import Pic from '../static/travelcat.jpg'

document.addEventListener('DOMContentLoaded', () => {
//does not look pretty when hitting enter in the box
  document.getElementById('destination').addEventListener(
    "keyup", (ev) => {
      if (ev.key === 'Enter' || ev.code === 13) {
        ev.preventDefault;
      }
    }
  )

  setTimeout( () =>{
    document.getElementById('incomplete').classList.add('nodisplay')
  },3000)
 
  
  document.getElementById('vPicture').appendChild(addPicture(Pic) );
  document.getElementById('datepicker').appendChild(addDateInput() );

  storageEvaluate()

  document.getElementById('datepickerinput').addEventListener('change', timespan );
  document.getElementById('voyageAdd').addEventListener('click', checkComplete );
  document.getElementById('voyageRemove').addEventListener('click', deleteTraveldata );
  document.getElementById('apiquery').addEventListener('click', initialSearch );
});

