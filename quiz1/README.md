How to host: 
   Navigate to quiz1 directory locally 
   run 'npm install' 
   run node server 
   go to http://localhost:3000/index.html
   

Important Assumptions: 
   assumed wanted this added to our already existing web-app 
   developed as only working locally 

Plan: 
   Display cost of $100 running shoes in 3 countries
   if have time add the ability to change the value we want converted 


Creativity: 
   allowing caller to specifiy value, conversion, ect 
   seeing cost of shoes in different countries 

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