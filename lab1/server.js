/*
This is where the 'API' lives, handles requests are returns correct from JSON file with data
// http://localhost:3000/itws/4500 = https://foderj.eastus.cloudapp.azure.com/node/itws/4500
*/

/*Using Express */ 

const data = require('./Project.json')
const express = require('express')
const app = express() // Storing all express things in thins variable
const port = 3000


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



//retrieves listing of ID's 
app.get('/runs', (req, res) => {
   var ids = getIds()
   

   // data.push(
   //    {
   //       "distance": 3, 
   //       "time": 2,
   //       "pace": 1
   //    }
   // );
   fs.writeFileSync('./Project.json', data);
   console.log(data[110])
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
   const {distance, time, pace} = req.body
   //like using format in python

   data.push(
      {
         "distance": distance, 
         "time": time,
         "pace": pace
      }
   );
   fs.writeFileSync('./Project.json', data);

   res.json({ message: `Received data for run with distance ${distance}` });
})