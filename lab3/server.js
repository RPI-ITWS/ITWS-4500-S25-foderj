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
   return(key); 
}

/*
returns JSON obj of what strava gave me
all of my activities from January 
*/ 
async function getAllStravaActs(key){
   var url = "https://www.strava.com/api/v3/athlete/activities?access_token=" + key + "&per_page=150&before=1738420719&after=1735742319"
   var fetchRes = await fetch(url, {
      method: "GET",
   })
   var result = await fetchRes.json()
   return(result); 
}

/*Get activity from strava API given activity ID and key */
async function getStravaAct(id,key){
   var url = "https://www.strava.com/api/v3/activities/" + id + "?access_token=" + key;
   var fetchRes = await fetch(url, {
      method: "GET",
   })
   var result = await fetchRes.json()
   return(result); 
}

/*gets percipitation, weather, or temp for given range*/
async function getWeathInfo(lat,long,date,pre,weather,temp){
   var wantData = ""; 
   if(pre){
      wantData += "precipitation,"
   }
   if(weather){
      wantData += "weather_code,"
   }
   if(temp){
      wantData += "temperature_2m,"
   }
   if (wantData == ""){
      return({ message: `weather Data retrieval error in 'getWeathInfo'` })
   }
   

   //timezone set to auto, and units farenheight
   var url = "https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + long + "&start_date=" + date + "&end_date=" + date + "&hourly=" + wantData +"&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto";
   var fetchRes = await fetch(url, {
      method: "GET",
   })
   var result = await fetchRes.json()
   return(result); 
}

/*Gets conglomerate of database entry and API response */
async function getWHistCong(stravaAct, dbEnt, pre, weather,temp){
   var lat = ""
   var long = ""
   if(stravaAct.start_latlng.length == 0){
      return({ message: `No Location Data associated with run ${dbEnt.id}` })
   }else{
      lat = stravaAct.start_latlng[0]
      long = stravaAct.start_latlng[1]
   }

   var start_end = dbEnt.start_date.slice(0,10) // in correct format for call


   var weathInfo = await getWeathInfo(lat,long,start_end,pre,weather,temp); 
   dbEnt.hourly = weathInfo.hourly; //JSON is key-value pairs

   return(dbEnt); 
   
}

/*Updates names of all items in Database, given JSON of all activities from strava*/ 
function updateName(allAct){
   for(var i = 0; i < data.length; i++){
      for(var j = 0; j < allAct.length; j ++){
         if(allAct[j].id == data[i].id){
            data[i].name = allAct[j].name; 
         } 
      }
   }
   fs.writeFileSync('./db.json', JSON.stringify(data, null, 4));
}

/*APP FUNCTIONS*/

/*
GET /runs/###/precipitation = retrieve the specific run from the JSON object + the amount of rain throughout duration of run 
*/
app.get('/runs/:number/precipitation', async (req, res) => {

   //req.params contains all route variables from the URL
   var id = parseInt(req.params.number);

   //checking to macke sure said ID exists
   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i].id  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{
      //getting strava activity
      var key = await getStravaAuth(); 
      var act = await getStravaAct(id,key); 

      var finalRes = await getWHistCong(act, JSON.parse(JSON.stringify(data[index])), true, false,false); 

      res.json(finalRes); 
   }

}) 

/*
GET /runs/###/weather = retrieve the specific run from the JSON object + the weatherCode throughout duration of run 
*/
app.get('/runs/:number/weather', async (req, res) => {

   //req.params contains all route variables from the URL
   var id = parseInt(req.params.number);

   //checking to macke sure said ID exists
   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i].id  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{
      //getting strava activity
      var key = await getStravaAuth(); 
      var act = await getStravaAct(id,key); 

      var finalRes = await getWHistCong(act, JSON.parse(JSON.stringify(data[index])), false, true, false); 

      res.json(finalRes); 
   }

}) 

/*
GET /runs/###/temperature = retrieve the specific run from the JSON object + the temp throughout duration of run 
*/
app.get('/runs/:number/temperature', async (req, res) => {

   //req.params contains all route variables from the URL
   var id = parseInt(req.params.number);

   //checking to macke sure said ID exists
   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i].id  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{

      //getting strava activity
      var key = await getStravaAuth(); 
      var act = await getStravaAct(id,key); 

      var finalRes = await getWHistCong(act, JSON.parse(JSON.stringify(data[index])), false, false, true); 

      res.json(finalRes); 
   }

}) 

/*
GET /runs/###/kudos = retrieve the specific run from the JSON object + the # of kudos it has
*/
app.get('/runs/:number/kudos', async (req, res) => {

   //req.params contains all route variables from the URL
   var id = parseInt(req.params.number);

   //checking to macke sure said ID exists
   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i].id  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{
      //getting strava activity
      var key = await getStravaAuth(); 
      var act = await getStravaAct(id,key); 

      dbEntry = JSON.parse(JSON.stringify(data[index])); //makes copy not alias
      dbEntry.kudos = act.kudos_count;

      res.json(dbEntry); 
   }



}) 

/*
GET /runs/###/location = retrieve the specific run from the JSON object + the location of the run 
*/
app.get('/runs/:number/location', async (req, res) => {

   //req.params contains all route variables from the URL
   var id = parseInt(req.params.number);

   //checking to macke sure said ID exists
   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i].id  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{
      //getting strava activity
      var key = await getStravaAuth(); 
      var act = await getStravaAct(id,key); 

      if(act.start_latlng.length == 0){
         res.json({ message: `No Location Data associated with run ${id}` })
      }else{
         dbEntry = JSON.parse(JSON.stringify(data[index]));
         dbEntry.start_latlng = act.start_latlng
         res.json(dbEntry); 
      }
   }



}) 

/*
GET /runs/###/description = retrieve specific run with JSON conglomerate including description 
*/
app.get('/runs/:number/description', async (req, res) => {

   //req.params contains all route variables from the URL
   var id = parseInt(req.params.number);

   //checking to macke sure said ID exists
   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i].id  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{
      //getting strava activity
      var key = await getStravaAuth(); 
      var act = await getStravaAct(id,key); 

      dbEntry = JSON.parse(JSON.stringify(data[index]));
      dbEntry.description = act.description;

      res.json(dbEntry); 
   }




}) 

/*
POST /runs/###/description = adds description to local db item
*/
app.post('/runs/:number/description', async (req, res) => {

   //req.params contains all route variables from the URL
   var id = parseInt(req.params.number);

   //checking to macke sure said ID exists
   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i].id  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{
         //getting strava activity
      var key = await getStravaAuth(); 
      var act = await getStravaAct(id,key); 

   
      data[index].description = act.description;
      fs.writeFileSync('./db.json', JSON.stringify(data, null, 4));


      res.json({ message: `Description has been added to run '${id}'` });

   }

}) 


/*
PUT /runs/names = updates all names from strava servers as users typically change these from the default upload 
*/
app.put('/runs/names', async (req, res) => {


   //getting strava activity
   var key = await getStravaAuth(); 
   var allAct = await getAllStravaActs(key); 

   updateName(allAct);
   

   res.json({ message: `All run Names have been updated'` });

}) 

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
   var ids = getIds(page);

   res.json(ids);
})

/*
GET /runs/### = retrieve the specific run from the JSON object
*/
app.get('/runs/:number', async (req, res) => {

   //req.params contains all route variables from the URL
   var id = parseInt(req.params.number);

   //checking to macke sure said ID exists

   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i]["id"]  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{
      res.json(data[index])
   }
   

}) 

/*
POST /runs = append a run at the end of the "DB"
Not avaible for all params of a run yet 
*/
app.post('/runs', (req, res) => {

   //says there are no keys or vars in req.body (as req.body is a JSON)
   if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
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
      return res.status(400).json({ message: "Request body is empty" });
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
      return res.status(400).json({ message: "Request body is empty" });
   }

   var id = parseInt(req.params.number);
   
      
   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i]["id"]  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{
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
      res.json({ message: `Run '${id}' updated accordingly`});

   }
   
   

})

/*
7. DELETE /runs/### = delete the specific run
*/
app.delete('/runs/:number', (req, res) =>{
   var id = parseInt(req.params.number);

   var index = null; 
   //checking to macke sure said ID exists
   for(var i = 0; i < data.length; i++){
      if (data[i]["id"]  == id){
         index = i; 
      }
   }
   if(index == null){
      res.json({ message: `id '${parseInt(req.params.number)}' does not exist.` });
   }else{
      //remove and shift from original
   

   
      fs.writeFileSync('./db.json', JSON.stringify(data, null, 4));
      res.json({ message: `Run '${id}' deleted`});
   }


})