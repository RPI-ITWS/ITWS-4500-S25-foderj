// Had to run 'node server' in directory


/* Vanilla Node
var http = require('http'); //need http library, put all of those libs in this variable, what we are using for this class


http.createServer(function(req, res) {  //anon function, has no name, first arg is http req header, second is respone 
  res.writeHead(200, {'Content-Type': 'text/plain'}); //writing the header for the result 
  res.end('Hello world\n'); // assembling a response that will be sent to the server when requested
}).listen(3000, '127.0.0.1'); //Port number is 3000, IP/FQDM

// 127.0.0.1 localhost for computers internal adress 

console.log('Server running at 127.0.0.1:3000');
*/

/*Using Express */ 

const express = require('express')
const app = express() // Storing all express things in thins variable
const port = 3000

//first arg of get is location 
//second is anonymous function

// http://localhost:3000/itws/4500
app.get('/itws/4500', (req, res) => {
   res.json(
      {
         "course": "Web Science",
         "number": "ITWS 4500",
         "Description": "A course about web science"
      });
})

app.get('/itws/2200', (req, res) => {
   res.json(
      {
         "course": "Web System",
         "number": "ITWS 2200",
         "Description": "A course about web SYSTEMS"
      });
})

//for adding a code
app.post('/itws', (req, res) => {
   console.log(req.body)
})

app.listen(port, () => {
   console.log('Listening on *:3000')
})
