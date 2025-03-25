Things I've learned: 
 each 'document' in Mongo is a single stored (typically JSON)  element
 Technically stored in 'BSON', but can import JSON and Mongo will know what to do 
 Collection = table

Mongo DB Work: 
   basically an online DAtabase 


TO do: 
   Call external API from lab 3 100 times and loading it into mongo using compass 
   add error checking for verb and endpoint combinations 

Future Notes: 
   update DOCS
   Shouldn't make dbConn every cal


Server changes: 
   npm init -y  # Initialize a package.json if needed
   npm install mongodb
   npm install dotenv


Citations: 
   Connecting to mongoDB in JS: 
      https://www.mongodb.com/docs/drivers/node/current/quick-start/connect-to-mongodb/
   Projections
   hasOwnProperty

Before submit: 
   Go through citations
   make sure valid error messages for incorrect calls
   remove console logs 
   refresh DB 
   test all endpoints 
   put .envs on server 

QUestions: 
   Should you client connect at the beggining of every funtion? 

Creativity: 
   Relative URL's representative of where site is being hosted also work with my text boxes 
   Updated Documentation
   Gave ability to view fetch request, also updated it for DB requested 
   formatting of results, is easy to navigat, also formatted preloaded elements of the DB to match my website well. 
   Did a drop down as was more intuitive than the buttons 