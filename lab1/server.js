/*
This is where the 'API' lives, handles requests are returns correct from JSON file with data
// http://localhost:3000/itws/4500 = https://foderj.eastus.cloudapp.azure.com/node/itws/4500
*/

/*Using Express */ 

const data = require('./Project.json')
const express = require('express')
const app = express() // Storing all express things in thins variable
const port = 3000
//import file system module 
const fs = require('fs');
//allows for parsing incoming req bodies: 
app.use(express.json());


//notification message in terminal to tell me it's running  
app.listen(port, () => {
   console.log('Listening on *:3000')
})

// app.get('/', (req, res) => {
//    //returns homepage 
// })

// used to get list of ID's 
function getIds(){
   let ids = new Array(); 
   for(var i = 0; i < data.length; i++){
      ids.push(data[i]['id']);
   }
   return(ids)
}

//replaces attribute for entire json 
function repAttr(attr, val){ 
   for(var i = 0; i < data.length; i++){
      data[i][attr] = val
   }
   fs.writeFileSync('./Project.json', JSON.stringify(data, null, 4));
}

//retrieves listing of ID's 
app.get('/runs', (req, res) => {
   var ids = getIds()
   res.json(ids);
})

//retrieves specified run id's 
app.get('/runs/:number', (req, res) => {
   //req.params contains all route variables from the URL
   var num = parseInt(req.params.number);
   res.json(data[num-1]) //-1 is because id's of my data starts at 1
   
})

/*what req.body must look like: (we add out own id)

{
   "distance": 6.7,
   "time": 2760,
   "pace": 412
}

*/

//app.post to add a run to the end of the list 
app.post('/runs', (req, res) => {
   const { distance, time, pace } = req.body
   

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
   console.log(data[len-1]) //what was just send in 
   //like using format in python
   res.json({ message: `Received data for run with distance ${distance}` });
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
   //if not all are present, the ones that are not are undefined
   const { distance, time, pace } = req.body

   //executes if distance is defined 
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