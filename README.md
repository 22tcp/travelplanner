## Webpack bootstrap travelapp showcase
What it does.
You set country, type the name of the city 
and choose a date.
If the API search finds coordinates for the city
it will display a matching image and a countdown for the journey,
plus typical weather data for that area and time.


## Get Up and Running

Fork this repo, then clone your forked repo down to your computer:

```
git clone -- git@github.com:22tcp/travelapp.git --
```

`cd` into your new folder and run:
- ```npm install```
- ```npm start``` to start the app
- this app runs on localhost:8081, 
but you can of course edit that in index.js  
  
  To run there must be a .env file with the variables filled with your
  own credentials
geonames_user=
sessionkey=    
// this is for a rudimentary session which also serves as per-user variable space server-side, set it 32 characters wide

pixabay_key

the app uses another API but that one does not use credentials,
it's open-meteo.com - it had to replace weatherbit because they erected a paywall.



