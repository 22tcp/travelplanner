const _logMessage = (msg) => {
  const msgElement = document.getElementById('messages')
  msgElement.classList.remove('nodisplay')
  msgElement.innerHTML=` ${msg} `
  setTimeout(() => {
    msgElement.classList.add('nodisplay')
  }, 4000)
}

export const storageEvaluate = async ()  => {
  _fetchCountries()
  if ( localStorage.getItem("travelapp.dest") &&
    localStorage.getItem("travelapp.date") ) {
    document.getElementById('incomplete').classList.add('nodisplay')
    document.getElementById('destination').value = localStorage.getItem("travelapp.dest")
    document.getElementById('datepickerinput').value = localStorage.getItem("travelapp.date")
    timespan()
  }
  if( localStorage.getItem("travelapp.image") ) {
    document.getElementById('Pic').src=localStorage.getItem("travelapp.image")
  }
}

export const checkComplete = () => {
  const destdata = document.getElementById('destination')
  const datedata = document.getElementById('datepickerinput')
  const countrydata = document.getElementById('country')
  const lengthdestdata = destdata.value.length
  const lengthdatedata = datedata.value.length
  const incompobj = document.getElementById('incomplete')
  const duration = document.getElementById('duration')
  if (lengthdestdata < 1 || lengthdatedata < 1) {
    //console.log(lengthdestdata + " lenght dest")
    //console.log(lengthdatedata + " length date")
    incompobj.classList.remove('nodisplay')
    destdata.focus()
    incompobj.classList.add('important')
    duration.classList.add('nodisplay')

    return (setTimeout(() => {
      incompobj.classList.add('nodisplay')
    }, 4000))
  } else {
    incompobj.classList.add('nodisplay')
    _logMessage("data complete - storing")
    localStorage.setItem("travelapp.dest", destdata.value)
    localStorage.setItem("travelapp.date", datedata.value)
    if (countrydata.value) {
      localStorage.setItem("travelapp.country", countrydata.value)
    }
  }
}

export const deleteTraveldata = () => {
  ["dest", "date", "country", "image"].forEach(key =>
    localStorage.removeItem(`travelapp.${key}`
    ))
  document.getElementById('destination').value = ''
  document.getElementById('datepickerinput').value = ''
  document.getElementById('country').value = 'US'
  timespan()
}

export const timespan = () => {
  const datedata = document.getElementById('datepickerinput')
  const displaydays = document.getElementById('numberofdays')
  const incompobj = document.getElementById('incomplete')
  const duration = document.getElementById('duration')
  if (!datedata) { return }
  if (!datedata.value.length) {
  duration.classList.add("nodisplay")
    return
  }
  var days = (Math.floor(new Date(datedata.value).getTime()) - Math.floor(Date.now())) / 86400000
  displaydays.innerHTML = "&nbsp;" + Math.ceil(days) + "&nbsp;&nbsp;"
  duration.classList.remove('nodisplay')
  incompobj.classList.add('nodisplay')
}

export function addDateInput() {
  let dobject = new Date(new Date().getTime())
  const tzo = dobject.getTimezoneOffset()
  dobject.setDate(dobject.getDate() + 1)
  let dlimit = dobject.toISOString().slice(0, 10)
  const element = document.createElement('input')
  element.setAttribute("type", "date")
  element.setAttribute("min", dlimit)
  element.setAttribute("max", "2099-12-31")
  element.setAttribute("id", "datepickerinput")
  element.classList.add("date-picker")
  return element
}


export function addPicture(image) {
  const myImage = new Image()
  myImage.classList.add("ha-image")
  myImage.src = image
  myImage.id = 'Pic'
  return myImage
}

/* Populate Country-drop-down because city names are not unique */
export async function _fetchCountries() {
  
  const countries = document.getElementById('country')
  let Countries = {}
  let htmlAppend = ""
  _logMessage("populating country dropdown - please wait")
  fetch('https://restcountries.com/v3.1/all?fields=name,cca2').then(res => {
    return res.json()
    
  }).then(data => {
    data.forEach(country => {
      _logMessage("country list complete")
      //console.log(country.name.common, country.cca2)
      country.name.common = country.name.common.substring(0, 25)
      Countries[country.name.common] = country.cca2

    })
    let sortedCountries = Object.keys(Countries).sort().reduce(
      (obj, key) => {
        obj[key] = Countries[key]
        return obj
      }, {}
    )
    for (const key in sortedCountries) {
      if (key == "United States") {
        htmlAppend += `<option value="US" selected="selected">United States</option>`
      } else {
        htmlAppend += `<option value=${sortedCountries[key]}>${key}</option>`
      }
    }
    countries.innerHTML = htmlAppend
    if (localStorage.getItem("travelapp.country") ) {
      document.getElementById('country').value = localStorage.getItem("travelapp.country")
    }
  }).catch(err => {
    _logMessage(err)
  })
}

const queryWeb = async (url = '') => {
  return await fetch(url, {
    method: 'GET',
  })
    .catch(error => _logMessage("queryWeb " + error));
}

const uploadTo = async (url = '', data = {} ) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  try {
    const status = await response.json()
    return status;
  } catch {
    _logMessage("uploadTo: " + error)    
  }
}

export const initialSearch = async () => {

  //gather facts
  const meantemp = document.getElementById('meantemp')
  const precipitation = document.getElementById('precipitation')
  const weather = document.getElementById('weather')
  const destdata = document.getElementById('destination').value 
  const datedata = document.getElementById('datepickerinput').value 
  const countrydata = document.getElementById('country').value
  const fullcountrydata = document.getElementById('country').selectedOptions[0]["innerText"]
  if ( destdata == "" || datedata == "" ) {
    _logMessage("please enter more data")
    return
  }
  let data = {
    dest: destdata,
    date: datedata,
    country: countrydata,
    fullcountry: fullcountrydata
  }
  //console.log("data " + JSON.stringify( data ))
  /* Internal API call 
     City, Date, country
  */
  await uploadTo('/yAPI/querydata', data ).then(
     _logMessage("upload complete"))
     .then(
         await queryWeb( '/yAPI/getEverything' )
       .then( async (sessiondata) => {
          let sdata = await sessiondata.json()
          //console.log(sdata)
          if (sdata == "404") {
             _logMessage("no such city found")
             return
          }
          meantemp.innerHTML = sdata["omdata"]["daily"]["temperature_2m_mean"] + "&#8451;"
          precipitation.innerHTML = sdata["omdata"]["daily"]["precipitation_sum"] + "&#13212;"
          weather.innerHTML = sdata["wmdactual"]
          //console.log("mean temp: " + sdata["omdata"]["daily"]["temperature_2m_mean"])
          //console.log("precipitation: " + sdata["omdata"]["daily"]["precipitation_sum"])
          //console.log("weather description: " + sdata["wmdactual"])
          //console.log("link to image " + sdata["pblink"])
          if ( sdata["pblink"] == "Not Found" ) {
            _logMessage("no image found: using boss selfie")
            document.getElementById('Pic').src="/travelcat.jpg"
          } else {
            document.getElementById('Pic').src=sdata["pblink"]
            localStorage.setItem("travelapp.image", sdata["pblink"])

          }
         })
        )
}