/*
Joe's Runs API 

This is where the 'API' lives, handles requests specified in Documentation and returns correct response

local vs on vm: 
   http://localhost:3000/itws/4500 = https://foderj.eastus.cloudapp.azure.com/node/itws/4500
*/


// CONST-IMPORTS

const data = require('./Project.json')
const express = require('express')
const app = express() // Storing all express things in this variable
const port = 3000
const fs = require('fs'); //importing file system module 
app.use(express.json()); //allows for parsing incoming req bodies: 
app.use(express.static('public')) 


//HELPER FUNCTIONS

/* used to get list of ID's  from the data*/
function getIds(){
   let ids = new Array(); 
   for(var i = 0; i < data.length; i++){
      ids.push(data[i]['id']);
   }
   return(ids)
}

/*Loops through entire 'db' updating the same field for each value*/ 
function repAttr(attr, val){ 
   for(var i = 0; i < data.length; i++){
      data[i][attr] = val
   }
   fs.writeFileSync('./Project.json', JSON.stringify(data, null, 4));
}

//APP.-FUNCTIONS

//notification message in terminal to tell me it's running  
app.listen(port, () => {
   console.log('Listening on *:3000')
})

/*
GET /runs = retrieve a listing of run ID numbers
*/
app.get('/runs', (req, res) => {
   var ids = getIds()
   res.json(ids);
})

/*
GET /runs/### = retrieve the specific run from the JSON object
*/
app.get('/runs/:number', (req, res) => {

   //req.params contains all route variables from the URL
   var num = parseInt(req.params.number);

   //checking to macke sure said ID exists
   if(num-1 > data.length-1){
      res.json({ message: `id '${num}' does not exist.` });
   }
   res.json(data[num-1]) //-1 is because id's of my data starts at 1
}) 

/*
POST /runs = append a run at the end of the "DB"
*/
app.post('/runs', (req, res) => {

   //says there are no keys or vars in req.body (as req.body is a JSON)
   if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
   }

   //if not all are present, the ones that are not are undefined
   const { distance, time, pace } = req.body

   //error handling
   if(!distance){ 
      res.json({ message: `valid distance not given.` });
   }else if(!time){ 
      res.json({ message: `valid time not given.` }); 
   }else if(!pace){ 
      res.json({ message: `valid pace not given.` });
   }else{
      data.push(
         {
            "id": data.length + 1, //next element
            "distance": distance, 
            "time": time,
            "pace": pace
         }
      );
      fs.writeFileSync('./Project.json', JSON.stringify(data, null, 4));
      var len = data.length 
      res.json({ message: `Received data for run with distance ${distance}` });
   }

   
})

/* PUT /runs = bulk update all your run

expects anything like this, can only be 1 but will rewrite everything to having that attribute
{
   "distance": 6.7,
   "time": 2760,
   "pace": 412
}
Can only edit distance, time, and pace, as ID is uneditable as it is a unique identifier
*/
app.put('/runs', (req, res) =>{

   //checks if empty
   if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
   }

   const { distance, time, pace } = req.body

   if(distance){ 
      repAttr("distance", distance); 
   }
   if(time){ 
      repAttr("time", time); 
   }
   if(pace){ 
      repAttr("pace", pace); 
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

   const { distance, time, pace } = req.body

   if(distance){ 
      data[index]['distance'] = distance; 
   }
   if(time){ 
      data[index]['time'] = time; 
   }
   if(pace){ 
      data[index]['pace'] = pace; 
   }
   fs.writeFileSync('./Project.json', JSON.stringify(data, null, 4));
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
   fs.writeFileSync('./Project.json', JSON.stringify(data, null, 4));
   res.json({ message: `Run '${index+1}' deleted`});
})