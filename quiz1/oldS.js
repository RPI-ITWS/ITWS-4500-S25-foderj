
// const data = require('./Project.json')
const express = require('express')
const app = express() // Storing all express things in this variable
const port = 3000
const fs = require('fs'); //importing file system module 
app.use(express.json()); //allows for parsing incoming req bodies: 
app.use(express.static('public')) 


async function getRates(){
   var fetchRes = await fetch("https://api.frankfurter.app/latest?base=USD");
   var jsonRes = await fetchRes.json();
   return(jsonRes); 
}

/* 
Citation: Convert function heavily inspired by function found within API documentation at: https://frankfurter.dev
*/
async function convert(from, to, amount) {
     var fetchRes = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
     var jsonRes = await fetchRes.json();
     const convAmt = await (amount * jsonRes.rates[to]).toFixed(2)
     return({"from":from, "to":to, "origAmt": amount, "convAmt": convAmt});
}

//APP.-FUNCTIONS

//notification message in terminal to tell me it's running  
app.listen(port, () => {
   console.log('Listening on *:3000')
})

/*
API gives rates based on base country so convert as found



GET /cov = retrieve a listing of run ID numbers
*/
app.get('/conv', async  (req, res) => {
   var result = await convert("EUR", "USD", 16.2)
   res.json(result);
})
