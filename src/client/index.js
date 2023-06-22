import './styles/bootstraploader.scss'


import * as bootstrap from 'bootstrap'

import { handleSubmit  } from './js/app'

export { handleSubmit }

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to a button or any other element
    const button = document.getElementById('myButton');
    if ( button == typeof(Object) ) { button.addEventListener('click', handleSubmit);}
  });
