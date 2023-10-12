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

