

Served at: https://foderj.eastus.cloudapp.azure.com/node
*Note: must be configured for vm and local, as there are url differences*

# Joe's Runs API Documentation:

#### 1. GET https://foderj.eastus.cloudapp.azure.com/node/runs

- will return a list of all of the ID's from all of the runs in the form of JSON 
- No Body neccesary.
- can include {page} parameter in URL to paginate results (default is 3) 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	}
})
```
- *Example Response*:
```
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]
```

#### 2. GET https://foderj.eastus.cloudapp.azure.com/node/runs/###

- here '###' represents any valid id that correlates to a run
- Only valid ID's will be accepted
- No Body neccesary. 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs/32', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	}
})
```
- *Example Response*:
```
{
    "name": "Easy + Cornfields Plus Turf",
    "distance": 13627.9,
    "moving_time": 3817,
    "elapsed_time": 4761,
    "total_elevation_gain": 143,
    "type": "Run",
    "id": 13295726858,
    "start_date": "2025-01-07T21:02:51Z",
    "average_speed": 3.57,
    "max_speed": 5.7,
    "average_watts": 226.6,
    "max_watts": 497,
    "kilojoules": 864.8,
    "average_heartrate": 148.3,
    "max_heartrate": 167,
    "elev_high": 133.8,
    "elev_low": 74.4,
    "suffer_score": 79
}
```
#### 3. POST https://foderj.eastus.cloudapp.azure.com/node/runs

- Will append a new run to the end of the existing database of runs 
- Body of the request must be strinified JSON and include 'distance', 'moving_time', and 'average_speed' for the entry to be added. 
- Body Neccesary 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs', {
	method: 'POST',

	headers: {
           "Content-Type": "application/json",
	},

	body: '{"distance":9.1,"moving_time":6710,"average_speed":684}'
     })
```
- *Example Response*:
```
{
    "message": "Received data for run with distance 9.1"
}
```

#### 4. PUT https://foderj.eastus.cloudapp.azure.com/node/runs

- Will bulk update anywhere from 1-3 attributes from all of the runs at the same time  
- you will not be allowed to update the id of any run
- If an ID is included in the body, nothing will change regarding ID's in the database 
- Include the attributes you want to update in the body of your request 
- Body Neccesary 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs', {
	method: 'PUT',

	headers: {
           "Content-Type": "application/json",
	},

	body: '{"distance":2}'
     })
```
- *Example Response*:
```
{
    "message": "All runs updated accordingly"
}
```

#### 5. PUT https://foderj.eastus.cloudapp.azure.com/node/runs/###

- here '###' represents any valid id that correlates to a run
- Will update anywhere from 1-3 attributes of the run specified by the ID in the url
- you will not be allowed to update the id of any run
- If an ID is included in the body, nothing will change regarding ID's in the database 
- Include the attributes you want to update in the body of your request 
- Body Neccesary 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs/56', {
	method: 'PUT',

	headers: {
           "Content-Type": "application/json",
	},

	body: '{"distance":2,"average_speed":543}'
     })
```
- *Example Response*:
```
{
    "message": "Run '56' updated accordingly"
}
```

#### 6. DELETE https://foderj.eastus.cloudapp.azure.com/node/runs/###

- here '###' represents any valid id that correlates to a run
- Will delete any run specified by the ID in the url
- you will not be able to acsess this run after it is deleted
- Will update the ID's of the rest of the runs in the DB accordingly; the ones following the element deleted have their ID's decremented
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs/92', {
	method: 'DELETE',

	headers: {
           "Content-Type": "application/json",
	}
     })
```
- *Example Response*:
```
{
    "message": "Run '92' deleted"
}
```

#### 7. GET https://foderj.eastus.cloudapp.azure.com/node/runs/###/precipitation

- here '###' represents any valid id that correlates to a run
- Will return a conglomerate JSON response of data in local (to vm) db.json along with hourly precipitation totals from the day you ran. 
- This weather information is from: https://open-meteo.com/en/docs/historical-forecast-api#start_date=2025-01-18
- *Example Request*: 
```
fetch('http://localhost:3000/runs/13375540243/precipitation', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	},

	body: ''
     })
```
- *Example Response*:
```
{
  "name": "Mind work",
  "distance": 17524.9,
  "moving_time": 4893,
  "elapsed_time": 5096,
  "total_elevation_gain": 198,
  "type": "Run",
  "id": 13375540243,
  "start_date": "2025-01-16T23:30:32Z",
  "average_speed": 3.582,
  "max_speed": 6.52,
  "average_watts": 238.9,
  "max_watts": 434,
  "kilojoules": 1169.2,
  "average_heartrate": 150.2,
  "max_heartrate": 168,
  "elev_high": 113.2,
  "elev_low": 66.4,
  "suffer_score": 107,
  "hourly": {
    "time": [
      "2025-01-16T00:00",
      "2025-01-16T01:00",
      "2025-01-16T02:00",
      "2025-01-16T03:00",
      "2025-01-16T04:00",
      "2025-01-16T05:00",
      "2025-01-16T06:00",
      "2025-01-16T07:00",
      "2025-01-16T08:00",
      "2025-01-16T09:00",
      "2025-01-16T10:00",
      "2025-01-16T11:00",
      "2025-01-16T12:00",
      "2025-01-16T13:00",
      "2025-01-16T14:00",
      "2025-01-16T15:00",
      "2025-01-16T16:00",
      "2025-01-16T17:00",
      "2025-01-16T18:00",
      "2025-01-16T19:00",
      "2025-01-16T20:00",
      "2025-01-16T21:00",
      "2025-01-16T22:00",
      "2025-01-16T23:00"
    ],
    "precipitation": [0, 0, 0, 0, 0.004, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
}
```

#### 8. GET https://foderj.eastus.cloudapp.azure.com/node/runs/###/weather

- here '###' represents any valid id that correlates to a run
- Will return a conglomerate JSON response of data in local (to vm) db.json along with hourly weather codes from the day you ran. 
- This weather information is from: https://open-meteo.com/en/docs/historical-forecast-api#start_date=2025-01-18
- *Example Request*: 
```
fetch('http://localhost:3000/runs/13375540243/weather', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	},

	body: ''
     })
```
- *Example Response*:
```
{
  "name": "Mind work",
  "distance": 17524.9,
  "moving_time": 4893,
  "elapsed_time": 5096,
  "total_elevation_gain": 198,
  "type": "Run",
  "id": 13375540243,
  "start_date": "2025-01-16T23:30:32Z",
  "average_speed": 3.582,
  "max_speed": 6.52,
  "average_watts": 238.9,
  "max_watts": 434,
  "kilojoules": 1169.2,
  "average_heartrate": 150.2,
  "max_heartrate": 168,
  "elev_high": 113.2,
  "elev_low": 66.4,
  "suffer_score": 107,
  "hourly": {
    "time": [
      "2025-01-16T00:00",
      "2025-01-16T01:00",
      "2025-01-16T02:00",
      "2025-01-16T03:00",
      "2025-01-16T04:00",
      "2025-01-16T05:00",
      "2025-01-16T06:00",
      "2025-01-16T07:00",
      "2025-01-16T08:00",
      "2025-01-16T09:00",
      "2025-01-16T10:00",
      "2025-01-16T11:00",
      "2025-01-16T12:00",
      "2025-01-16T13:00",
      "2025-01-16T14:00",
      "2025-01-16T15:00",
      "2025-01-16T16:00",
      "2025-01-16T17:00",
      "2025-01-16T18:00",
      "2025-01-16T19:00",
      "2025-01-16T20:00",
      "2025-01-16T21:00",
      "2025-01-16T22:00",
      "2025-01-16T23:00"
    ],
    "weather_code": [1, 3, 0, 3, 71, 3, 3, 3, 3, 3, 3, 0, 1, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3]
  }
}
```

#### 9. GET https://foderj.eastus.cloudapp.azure.com/node/runs/###/temperature

- here '###' represents any valid id that correlates to a run
- Will return a conglomerate JSON response of data in local (to vm) db.json along with hourly temperatures (F) from the day you ran. 
- This weather information is from: https://open-meteo.com/en/docs/historical-forecast-api#start_date=2025-01-18
- *Example Request*: 
```
fetch('http://localhost:3000/runs/13375540243/temperature', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	},

	body: ''
     })
```
- *Example Response*:
```
{
  "name": "Mind work",
  "distance": 17524.9,
  "moving_time": 4893,
  "elapsed_time": 5096,
  "total_elevation_gain": 198,
  "type": "Run",
  "id": 13375540243,
  "start_date": "2025-01-16T23:30:32Z",
  "average_speed": 3.582,
  "max_speed": 6.52,
  "average_watts": 238.9,
  "max_watts": 434,
  "kilojoules": 1169.2,
  "average_heartrate": 150.2,
  "max_heartrate": 168,
  "elev_high": 113.2,
  "elev_low": 66.4,
  "suffer_score": 107,
  "hourly": {
    "time": [
      "2025-01-16T00:00",
      "2025-01-16T01:00",
      "2025-01-16T02:00",
      "2025-01-16T03:00",
      "2025-01-16T04:00",
      "2025-01-16T05:00",
      "2025-01-16T06:00",
      "2025-01-16T07:00",
      "2025-01-16T08:00",
      "2025-01-16T09:00",
      "2025-01-16T10:00",
      "2025-01-16T11:00",
      "2025-01-16T12:00",
      "2025-01-16T13:00",
      "2025-01-16T14:00",
      "2025-01-16T15:00",
      "2025-01-16T16:00",
      "2025-01-16T17:00",
      "2025-01-16T18:00",
      "2025-01-16T19:00",
      "2025-01-16T20:00",
      "2025-01-16T21:00",
      "2025-01-16T22:00",
      "2025-01-16T23:00"
    ],
    "temperature_2m": [18.7, 18.3, 19.6, 20.3, 21, 22.4, 21, 20.3, 21, 21.8, 23.7, 25.8, 27.1, 27.1, 27.4, 27.2, 27, 26.6, 25.2, 24.4, 24.9, 23.8, 23.6, 23.7]
  }
}
```

#### 10. GET https://foderj.eastus.cloudapp.azure.com/node/runs/###/kudos

- here '###' represents any valid id that correlates to a run
- Will return a conglomerate JSON response of data in local (to vm) db.json along with kudos totals from the corresponding strava post.
- This strava information is from: https://developers.strava.com/docs/reference/#api-Activities-getActivityById
- *Example Request*: 
```
fetch('http://localhost:3000/runs/13375540243/kudos', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	},

	body: ''
     })
```
- *Example Response*:
```
{
  "name": "Mind work",
  "distance": 17524.9,
  "moving_time": 4893,
  "elapsed_time": 5096,
  "total_elevation_gain": 198,
  "type": "Run",
  "id": 13375540243,
  "start_date": "2025-01-16T23:30:32Z",
  "average_speed": 3.582,
  "max_speed": 6.52,
  "average_watts": 238.9,
  "max_watts": 434,
  "kilojoules": 1169.2,
  "average_heartrate": 150.2,
  "max_heartrate": 168,
  "elev_high": 113.2,
  "elev_low": 66.4,
  "suffer_score": 107,
  "kudos": 14
}
```

#### 10. GET https://foderj.eastus.cloudapp.azure.com/node/runs/###/kudos

- here '###' represents any valid id that correlates to a run
- Will return a conglomerate JSON response of data in local (to vm) db.json along with kudos totals from the corresponding strava post.
- This strava information is from: https://developers.strava.com/docs/reference/#api-Activities-getActivityById
- *Example Request*: 
```
fetch('http://localhost:3000/runs/13375540243/kudos', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	},

	body: ''
     })
```
- *Example Response*:
```
{
  "name": "Mind work",
  "distance": 17524.9,
  "moving_time": 4893,
  "elapsed_time": 5096,
  "total_elevation_gain": 198,
  "type": "Run",
  "id": 13375540243,
  "start_date": "2025-01-16T23:30:32Z",
  "average_speed": 3.582,
  "max_speed": 6.52,
  "average_watts": 238.9,
  "max_watts": 434,
  "kilojoules": 1169.2,
  "average_heartrate": 150.2,
  "max_heartrate": 168,
  "elev_high": 113.2,
  "elev_low": 66.4,
  "suffer_score": 107,
  "kudos": 14
}
```

#### 11. GET https://foderj.eastus.cloudapp.azure.com/node/runs/###/location

- here '###' represents any valid id that correlates to a run
- Will return a conglomerate JSON response of data in local (to vm) db.json along with the longitude and latitude of where this run was started from.
- This longitude/latitude information is from: https://developers.strava.com/docs/reference/#api-Activities-getActivityById
- *Example Request*: 
```
fetch('http://localhost:3000/runs/13375540243/location', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	},

	body: ''
     })
```
- *Example Response*:
```
{
  "name": "Mind work",
  "distance": 17524.9,
  "moving_time": 4893,
  "elapsed_time": 5096,
  "total_elevation_gain": 198,
  "type": "Run",
  "id": 13375540243,
  "start_date": "2025-01-16T23:30:32Z",
  "average_speed": 3.582,
  "max_speed": 6.52,
  "average_watts": 238.9,
  "max_watts": 434,
  "kilojoules": 1169.2,
  "average_heartrate": 150.2,
  "max_heartrate": 168,
  "elev_high": 113.2,
  "elev_low": 66.4,
  "suffer_score": 107,
  "start_latlng": [42.733489, -73.668357]
}
```

#### 12. GET https://foderj.eastus.cloudapp.azure.com/node/runs/###/description

- here '###' represents any valid id that correlates to a run
- Will return a conglomerate JSON response of data in local (to vm) db.json along with the description of the run from my strava post
- This description information is from: https://developers.strava.com/docs/reference/#api-Activities-getActivityById
- *Example Request*: 
```
fetch('http://localhost:3000/runs/13375540243/description', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	},

	body: ''
     })
```
- *Example Response*:
```
{
  "name": "Mind work",
  "distance": 17524.9,
  "moving_time": 4893,
  "elapsed_time": 5096,
  "total_elevation_gain": 198,
  "type": "Run",
  "id": 13375540243,
  "start_date": "2025-01-16T23:30:32Z",
  "average_speed": 3.582,
  "max_speed": 6.52,
  "average_watts": 238.9,
  "max_watts": 434,
  "kilojoules": 1169.2,
  "average_heartrate": 150.2,
  "max_heartrate": 168,
  "elev_high": 113.2,
  "elev_low": 66.4,
  "suffer_score": 107,
  "description": "Nice run with Matt and abbey for a bit @ turf then around. Got my head right from yeaterday and feeling good. Also did 3x200 cutdowns on turf"
}
```

#### 13. POST https://foderj.eastus.cloudapp.azure.com/node/runs/###/description

- here '###' represents any valid id that correlates to a run
- Will append the local (vm) database with the corresponding description of the run from strava
- This description information is from: https://developers.strava.com/docs/reference/#api-Activities-getActivityById
- *Example Request*: 
```
fetch('http://localhost:3000/runs/13375540243/description', {
	method: 'POST',

	headers: {
           "Content-Type": "application/json",
	},

	body: ''
     })
```
- *Example Response*:
```
{
    "message": "Description has been added to run '13375540243'"
}
```

#### 14. PUT https://foderj.eastus.cloudapp.azure.com/node/runs/names

- here '###' represents any valid id that correlates to a run
- Will update every entry of the local (vm) database with the most recent name of each run as users do often change the names of their runs
- This name information is from: https://developers.strava.com/docs/reference/#api-Activities-getActivityById
- *Example Request*: 
```
fetch('http://localhost:3000/runs/13375540243/names', {
	method: 'POST',

	headers: {
           "Content-Type": "application/json",
	},

	body: ''
     })
```
- *Example Response*:
```
{
    "message": "All run Names have been updated'"
}
```

---
# Creativity 

 I decided to go with functional creativity vs design (css) creativity as functional is defintley my strong suit. Here is what I would like to be considered: 

 ##### 1. API Combination
 - Use of the historical weather API to see what the temperature was during that exact run in the exact location. 
 - Using the lat and long of my runs to track said weather 
 - getting a more in depth description of my runs 

 ##### 2. Data formatting in homepage
 - When presenting things like hourly precipitation/temperature, I curated a table in order for the user to better visualize the data. 

##### 3. Homepage Design 
 - I tried to make the design of my homepage fit a specific colorway and theme. 

##### 4. Real Data
 - I found a way encorporate the API of one of my favorite apps (Strava) into my project. This let to me restructuring my 'local' database which is now full of completley real data. 

 ##### 5. Updated Documentation
 - Even  though it wasn't explicitly on the sheet, I updated my documentation to keep up with the current state of my API

---

# Running Work Log: 

```
Plan: 

   my new database is just going to be my strava runs from january but a much simplier JSON with not as much garbage, √
   Going to pull more info about the run ID from strava and weather data from historical weather API. 
   Get start, lat/long from strava -> use that to search the weather



   6 new get endpoints √
      these endpoints must return JSON conglomerates from 2 API sources
      /runs/:number/precipitation
         returns db obj with, array of rainfall throughout the day of the run
      /runs/:number/weather
         returns db obj with, weather codes throughout the day of the run
      /runs/:number/temp
         returns db obj with, temp in farenheight throughout the day of the run
      /runs/:number/kudos
         returns db obj with kudo information
      /runs/:number/location
         returns db obj with location info
      /runs/:number/description
         returns db obj with description of the run 


   1 new post endpoint:  √
      must add data from one external API to our 'db'
      /runs/description
         (adds description to item specified in my database}) 

   1 new PUT endpoint: √
      update data in JSON (db) from one of external API's 
      /runs/names
         (updates all runs name from strava API in case the user changes them ) 

   

   frontend must parse data returned and display it nicely (have a raw/nice toggle): 
      emphizize overlap between when I am running and the conditions at that time -> for optimizing front-end next lab 
      by nicely -> literally justnot in JSON

   Update documentation accordingly 

   Creativity 

   Document API's I used 
      



   
Strava API NOtes: 
   what get mass activities, oldest is at bottom, and can paginate
   https://developers.strava.com/docs/reference/#api-Activities-getActivityById


Historical Weather API Notes: 
   https://open-meteo.com/en/docs/historical-forecast-api#start_date=2025-01-18

   goes up to 23rd hour 
   
   note: only has back to 2022 (works for my application)

Reqs: 
   Have to use our JSON objects for the post and put endpoints, but can just be a conglomerate of API's for the rest 

   you will need to have your endpoints make multiple
   API calls and combine the results into a singular JSON object before sending it back to your
   frontend.
   6 new get endpoints
      these endpoints must return JSON conglomerates from 2 API sources

   1 new post endpoint: 
      must add data from one external API to out 'db'

   1 new PUT endpoint: 
      update data in JSON (db) from one of external API's 

   Update documentation accordingly 

   frontend must parse data returned and display it nicely (have a raw/nice toggle) 

   Document API's I used 

Things I leaned: 
   pagenation is just responding with a capped limit, not actually multiple pages 
   don't send responses in loop 
   JSON MAKES ALIAS
   cannot send 2 res's (not like return statement, code after still executes)

Before Submit: 
   validation √
   Creativity √
   comment √
   Update docs of old and new endpoints √
   test on VM √
   Read over sheet once more √

getting Strava: 
   need read all in order to list our activities 

Future Notes: 
   Add a .env so API's are called safely 
   add a strava ID and a 'my ID' 
   upgrate original PUTS/POSTS
   delete description
   expand local DB to more than just January runs 
   post/put combo for kudos/descriptions
   clean css (remove unecc)
   Have a raw: formatted toggle 
   Show more option to show all of the information stored in the database 
   present time of run so you can see what the weather was during it 
   If make flexbox holding 2 info boxes dynamic 
   if someone puts a non-int in for ID
   add units to documentation 

Citations: 
   url params
   https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.geeksforgeeks.org/how-to-use-get-parameter-in-express-js/&ved=2ahUKEwiBt6ztuqaLAxXmkYkEHZN2GX8QFnoECAsQAQ&usg=AOvVaw0ICZQQzq3O5ixbknHADPzn

   Date: https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString&ved=2ahUKEwjNwoOM2qeLAxUrhIkEHamGAxAQFnoECAsQAQ&usg=AOvVaw1ulCBE--FosRxboAzo6Lk4

   For each:   
      https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=http://www.w3schools.com/jsref/jsref_forEach.asp&ved=2ahUKEwiitrLJ6KeLAxV8q4kEHa7LGbMQFnoECCMQAQ&usg=AOvVaw2UpjRmq3mAH6qEiZbR2HNQ

   HTML tables in JS: 
      https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.w3schools.com/jsref/dom_obj_table.asp&ved=2ahUKEwjKtoj-raiLAxUyFFkFHWfkGOcQFnoECAoQAQ&usg=AOvVaw2abI5b6Wgq7ibbtY42ZMU5

   Strava API NOtes: 
      what get mass activities, oldest is at bottom, and can paginate
      https://developers.strava.com/docs/reference/#api-Activities-getActivityById


   Historical Weather API Notes: 
      https://open-meteo.com/en/docs/historical-forecast-api#start_date=2025-01-18
```