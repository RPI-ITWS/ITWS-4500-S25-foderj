## How to host: 
- Navigate to quiz1 directory locally 
-  run 'npm install' 
-  run node server 
-  go to http://localhost:3000/index.html

---
# Creativity 

 I decided to go with functional creativity vs design (css) creativity as functional is defintley my strong suit. Here is what I would like to be considered: 

##### 1. Allowing API Caller to specify value, conversion, ect
 - In my backend, when making my get endpoint that converts currency, I made it for the user to specify query parameters that directly impact the API response, rather then just having certain conversions and amount hardcoded

##### 2. Connecting the new info to my project
 - A typical expense for runners is running shoes, so I figured the most helpful way for my site to use this conversion tool is to show the user a base rate of running shoes across different contries as I figured it would actually be helpful

##### 3. Including Multiple Countries 
 - I included multiple countries as I thought it would be more interesting to the user and allow for just a more descriptive use of the API functionality 

---

Creativity: 
   allowing caller to specifiy value, conversion, ect 
   seeing cost of shoes in different countries 

Important Assumptions: 
   assumed wanted this added to our already existing web-app 
   developed as only working locally 

Plan: 
   Display cost of $100 running shoes in 3 countries
   if have time add the ability to change the value we want converted 




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

Future: 
   add error handling to API call 


Citations: 
   Convert function heavily inspired by function found within API documentation at: https://frankfurter.dev