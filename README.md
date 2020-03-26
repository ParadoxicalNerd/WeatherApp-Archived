## Simple weather app

Simple React app to show the weather to the user. The app fetches the user location from gps coordinates and fetches weather from the DarkSky API. User can also search for a place by clicking on the current location and typing the new place there.

To make this work, get your API key from the DarkSky API page and put it in the secrets folder. Following this, simply run either 
```
yarn start
```
or 
```
yarn build
```

TODO:

[DONE] 1) Implement refreshing of page when new location is typed out

2) Use external API to determine location if geocoding fails

3) Add graph for daily weather

4) Create a potrait mode friendly UI.
