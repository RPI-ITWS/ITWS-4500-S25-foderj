/*
Joe's Runs API 

This is where the 'API' lives, handles requests specified in Documentation and returns correct response

local vs on vm: 
   http://localhost:3000/itws/4500 = https://foderj.eastus.cloudapp.azure.com/node/itws/4500
*/


// CONST-IMPORTS

const data = require('./db.json')
const express = require('express')
const app = express() // Storing all express things in this variable
const port = 3000
const fs = require('fs'); //importing file system module 
app.use(express.json()); //allows for parsing incoming req bodies: 
app.use(express.static('public')) 



//HELPER FUNCTIONS

/* used to get list of ID's  from the data*/
function getIds(page){
   let ids = new Array(); 

   for(var i = 0; i < 15*page; i++){
      ids.push(data[i]["id"]);
   }
   return(ids)
}

/*Loops through entire 'db' updating the same field for each value*/ 
function repAttr(attr, val){ 
   for(var i = 0; i < data.length; i++){
      data[i][attr] = val
   }
   fs.writeFileSync('./db.json', JSON.stringify(data, null, 4));
}

/*Fetches the weather data from the openWeatherAPI given your lat and long and returns a promise of it converted into JSON */ 
async function getWeath(lat,lon){
   var fetchRes = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=76b8f36558ce3b5fbce8ba9d025e5fe9");
   var jsonRes = await fetchRes.json();
   console.log(jsonRes); 
   return(jsonRes); 
}

/*Fetches auth from strava using refresh token*/ 
async function getStravaAuth(){
   
   const url = "https://www.strava.com/oauth/token?client_id=145983&client_secret=262ab851354d4695c018ca1cb8862dd15f24602d&refresh_token=335a6282b6b80eeff4a2468be444f82ded0a523f&grant_type=refresh_token";

   //Note this is post
   var fetchRes = await fetch(url, {
      method: "POST",
   })

   // Because .json also returns a promise
   var parsed = await fetchRes.json()
   var key = parsed.access_token; 
   // console.log(key); 
   return(key); 
}

/*returns JSON obj of what strava gave me*/ 
async function getAllStravaActs(key){
   var url = "https://www.strava.com/api/v3/athlete/activities?access_token=" + key + "&per_page=150&before=1738420719&after=1735742319"
   var fetchRes = await fetch(url, {
      method: "GET",
   })
   var result = await fetchRes.json()
   return(result); 
}

//APP.-FUNCTIONS

//notification message in terminal to tell me it's running  
app.listen(port, () => {
   console.log('Listening on *:3000')
})

/*
GET /runs = retrieve a listing of run ID numbers
Paginated by default -> default is 3
pagenation must be > 0 
*/
app.get('/runs', (req, res) => {
   //parsing return data to curate database
   var page = req.query.page;
   
   if(page === undefined || parseInt(page) < 0){
      page = 3;
   }else{
      page = parseInt(page);
   }
   console.log(page); 
   var ids = getIds(page);

   res.json(ids);
})

/*
GET /runs/### = retrieve the specific run from the JSON object
*/
app.get('/runs/:number', (req, res) => {

   //req.params contains all route variables from the URL
   var num = parseInt(req.params.number);

   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i]["id"]  == num){
         res.json(data[i])
      }
   }

   res.json({ message: `id '${num}' does not exist.` });//didn't work 

}) 



/*
POST /runs = append a run at the end of the "DB"
Not avaible for all params of a run yet 
*/
app.post('/runs', (req, res) => {

   //says there are no keys or vars in req.body (as req.body is a JSON)
   if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
   }

   //if not all are present, the ones that are not are undefined
   const { distance, moving_time, average_speed } = req.body

   //error handling
   if(!distance){ 
      res.json({ message: `valid distance not given.` });
   }else if(!moving_time){ 
      res.json({ message: `valid moving_time not given.` }); 
   }else if(!average_speed){ 
      res.json({ message: `valid average_speed not given.` });
   }else{
      var curDate = new Date().toISOString();
      data.push(
         {
            "name": "Run",
            "distance": distance, 
            "moving_time": moving_time,
            "elapsed_time": moving_time,
            "total_elevation_gain": 0,
            "type": "Run",
            "id": data.length + 13504259923, //next element (works for jan DB)
            "start_date": curDate,
            "average_speed": average_speed,
            "max_speed": average_speed,
            "average_cadence": null,
            "average_watts": null,
            "max_watts": null,
            "kilojoules": null,
            "average_heartrate": null,
            "max_heartrate": null,
            "elev_high": 0,
            "elev_low": 0,
            "suffer_score": null
         }
      );
      fs.writeFileSync('./db.json', JSON.stringify(data, null, 4));
      res.json({ message: `Received data for run with distance ${distance}` });
   }  
})

/* PUT /runs = bulk update all your run

expects anything like this, can only be 1 but will rewrite everything to having that attribute
{
   "distance": 6.7,
   "moving_time": 2760,
   "average_speed": 412
}
Can only edit distance, moving_time, and average_speed, as ID is uneditable as it is a unique identifier
*/
app.put('/runs', (req, res) =>{

   //checks if empty
   if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
   }

   const { distance, moving_time, average_speed } = req.body

   if(distance){ 
      repAttr("distance", distance); 
   }
   if(moving_time){ 
      repAttr("moving_time", moving_time); 
   }
   if(average_speed){ 
      repAttr("average_speed", average_speed); 
   }

   res.json({ message: 'All runs updated accordingly' });
})

/*
6. PUT /runs/### = update the specific run
Update specific ID 
expects id in URL and vars in JSON 
*/
app.put('/runs/:number', (req, res) =>{
   
   if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
   }

   var index = parseInt(req.params.number) -1;
   if(index > data.length-1){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }

   const { distance, moving_time, average_speed } = req.body

   if(distance){ 
      data[index]['distance'] = distance; 
   }
   if(moving_time){ 
      data[index]['moving_time'] = moving_time; 
   }
   if(average_speed){ 
      data[index]['average_speed'] = average_speed; 
   }
   fs.writeFileSync('./db.json', JSON.stringify(data, null, 4));
   res.json({ message: `Run '${index+1}' updated accordingly`});
})

/*
7. DELETE /runs/### = delete the specific run
*/
app.delete('/runs/:number', (req, res) =>{
   var index = parseInt(req.params.number) -1;

   if(index > data.length-1){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }

   //remove and shift from original
   data.splice(index,1);

   //fix all ids, +1 because starts at 1
   for(var i = index; i < data.length; i++){
      data[i]['id'] = i+1;
   }
   fs.writeFileSync('./db.json', JSON.stringify(data, null, 4));
   res.json({ message: `Run '${index+1}' deleted`});
})