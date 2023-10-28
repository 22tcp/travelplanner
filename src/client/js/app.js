export function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('name').value
  checkForName(formText)

  console.log("::: Form Submitted :::")
  fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function (res) {
      document.getElementById('results').innerHTML = res.message
    })
}

export const queryWEB = async (url = '') => {
  return await fetch(url, {
    method: 'GET',
  })
    .catch(error => console.error(error));
}

export const uploadTo = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  try {
    const status = await response.json();
    return status;
  } catch {
    console.log("error;", error);
  }

}

//calculate offset for min input and create the date picker with it
export const checkCompleteness = () => {
  const destdata = document.getElementById('destination');
  const datedata = document.getElementById('datepickerinput')
  const lengthdestdata = destdata.value.length;
  const lengthdatedata = datedata.value.length;
  const incompobj = document.getElementById('incomplete');
  const duration  = document.getElementById('duration');
  if ( lengthdestdata < 1 || lengthdatedata <  1 ){
    console.log(lengthdestdata + " lenght dest")
    console.log(lengthdatedata + " length date")
    incompobj.classList.remove('nodisplay');
    destdata.focus();
    incompobj.classList.add('important');
    duration.classList.add('nodisplay');

    return(setTimeout( () => {
      incompobj.classList.add('nodisplay');
      //duration.classList.remove('nodisplay');
    }, 4000));
    
  } else {
    incompobj.classList.add('nodisplay')
    console.log("data complete, storing ")
    localStorage.setItem("travelapp_destination", destdata.value )
    localStorage.setItem("travelapp.date", datedata.value )
  }
}

export const timespan = () => {
  const datedata = document.getElementById('datepickerinput')
  const displaydays = document.getElementById('numberofdays')
  const incompobj = document.getElementById('incomplete');
  const duration = document.getElementById('duration')
  if ( ! datedata ) { return }
  if ( ! datedata.value.length ) { 
    displaydays.innerHTML = "-"
    return }
  var days = ( Math.floor(new Date(datedata.value).getTime()) - Math.floor(Date.now()) ) / 86400000
  displaydays.innerHTML = "&nbsp;" + Math.ceil(days) + "&nbsp;&nbsp;"
  duration.classList.remove('nodisplay')
  incompobj.classList.add('nodisplay')
}

export function addDateInput() {
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

import Pic from '../../static/travelcat.jpg'
export function addPicture() {
  
  const myImage = new Image();
  myImage.classList.add("ha-image");
  myImage.src = Pic;
  myImage.id = 'Pic';
  return myImage;
}

export function fetchCountries() {

  const countries = document.getElementById('country')
  let Countries = {}
  let htmlAppend = ""
  fetch('https://restcountries.com/v3.1/all?fields=name,cca2').then( res => {
    return res.json()
  }).then(data => {
    data.forEach(country => {
      //console.log(country.name.common, country.cca2)
      country.name.common = country.name.common.substring(0,25)
      Countries[country.name.common] = country.cca2;
      
    })
    let sortedCountries = Object.keys(Countries).sort().reduce(
      (obj, key) => {
        obj[key] = Countries[key]
        return obj;
      }, {}
    )
    for ( const key in sortedCountries ) {
      htmlAppend += `<option value=${sortedCountries[key]}>${key}</option>`
    }
    countries.innerHTML = htmlAppend
  }).catch(err => {
    console.log(err)
  })
}