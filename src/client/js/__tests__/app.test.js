
/**
 * @jest-environment jsdom
 */
// create jsdom
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("src/client/views/index.html");
import  {msgElement } from '../app.js'
import fetchMock from "jest-fetch-mock";
global.fetch = fetchMock;
// Import the module that contains the code you want to test
import { _fetchCountries } from '../app.js'

describe("catches the _fetchCountries fetch", () => {
  beforeEach(() => {
    fetchMock.mockResponseOnce(
      JSON.stringify(
        {
          "name":
          {
            "common": "Nigeria",
            "official": "Federal Republic of Nigeria",
            "nativeName":
            {
              "eng":
              {
                "official": "Federal Republic of Nigeria",
                "common": "Nigeria"
              }
            }
          },
          "cca2": "NG"
        }
      )
    )
  })

  it("Tests the _fetchCountries() function", async () => {
    window.alert = () => { };
    const data = await _fetchCountries()    
    expect(fetchMock).toHaveBeenCalledTimes(1)
    console.log(document.getElementById('country'))

  })
})