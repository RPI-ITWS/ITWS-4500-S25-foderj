##### Served at: https://foderj.eastus.cloudapp.azure.com/node

## Summary
This Lab was not the worst lab I've had throughout WebSci and WebSysSci but it is defintley one of the most useful. Getting to know mongoDB really changes my perspective on Databases as a whole and I like Mongo worlds better the SQL. In terms of Roadblocks, the main ones I hit revolved around following the ID conventions from the instructions. I solved this by making an entirely new collection to hold what is similar to an auto incrementing varibale from SQL. I also ran into some troubles with the buttons in react as I couldn't figure out how to stop them from reloading the page, and only having one be orange for the longest time, but I eventually figured it out using CSS. All in all, I learned a lot and feel a lot more prepared and knowledgeable when it comes to Mongo. 

---
# Creativity 

 I decided to go with functional creativity vs design (css) creativity as I did this with other labs and functionality is defintley my strong suit. 


  ##### 1. Gave ability to view hypothetical fetch request.  
 - Displays details about what a hypothetical fetch request would look like 
 - based on the user input from the database to call the database
 - Implemented URL updating in real time using if/else block 


  ##### 2. also formatted API responses of the DB to match my website well. .  
 - When submit is hit and the mongo API is called, the run responses (when actual documents come through) are formatted to fit the conventions of the site
 - Dynamically handles different kinds of responses from the API to present it in the best way to the user 


 ##### 3. Method Selection Toggle
 - Implemented functionality to keep the selected method orange so that the use is always aware of what they chose
 - Also prevented automatic reloads as they were slowing down the flow of the page 



---
## Running Work Log 
```Things I've learned: 
 each 'document' in Mongo is a single stored (typically JSON)  element
 Technically stored in 'BSON', but can import JSON and Mongo will know what to do 
 Collection = table

Mongo DB Work: 
   basically an online DAtabase 


TO do: 
   Call external API from lab 3 100 times and loading it √
   into mongo using compass √
   add error checking for verb and endpoint combinations √

Future Notes: 
   update DOCS
   Shouldn't make dbConn every cal
   have method change in fetch call as well 


Server changes: 
   npm init -y  # Initialize a package.json if needed
   npm install mongodb
   npm install dotenv


Citations: 
   Connecting to mongoDB in JS: 
      https://www.mongodb.com/docs/drivers/node/current/quick-start/connect-to-mongodb/
   Projections: 
      https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.mongodb.com/docs/manual/reference/operator/projection/positional/&ved=2ahUKEwishKvqsaWMAxWWOFkFHc-iKvEQFnoECBgQAQ&usg=AOvVaw1Xk2h4u4NJn6IL-yMMhWUF

   hasOwnProperty:
      https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty&ved=2ahUKEwiSlrj4saWMAxXXD1kFHTdhJ18QFnoECBMQAQ&usg=AOvVaw1NvTCKJ2kCN5Uny6X83MkC

   DeleteMany:
      https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://ayushgupta2959.medium.com/effortless-mongodb-cleanup-3-effective-ways-to-delete-all-documents-from-a-collection-b8802472b95f%23:~:text%3DUsing%2520deleteMany(%257B%257D)%2520%253A%2520The%2520Go%252DTo%2520Method%26text%3DdeleteMany()%2520is%2520a%2520MongoDB,delete%2520everything%2520in%2520the%2520collection.&ved=2ahUKEwjLo7eCsqWMAxUGGFkFHVsXHPkQFnoECBsQAw&usg=AOvVaw0ixIUmFyl-l9kuN_yhh6Bb

   UpdateOne: 
      https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.geeksforgeeks.org/mongodb-updateone-method-db-collection-updateone/&ved=2ahUKEwi2teeVsqWMAxXnEFkFHdU7LCQQFnoECBwQAQ&usg=AOvVaw2VWH0-mzNU4dqjh2P5VEh3

Before submit: 
   Go through citations √
   make sure valid error messages for incorrect calls √
   test all endpoints √
   read over instructions √
   remove console logs √
   Organize Code √
   add Summary √
   write creative section √
   Test On Server √
   
   put .envs on server √
   refresh DB √

QUestions: 
   Should you client connect at the beggining of every funtion? 

Creativity: 
   Relative URL's representative of where site is being hosted also work with my text boxes 
   Gave ability to view fetch request, also updated it for DB requested 
   formatting of results, is easy to navigat, also formatted preloaded elements of the DB to match my website well. 
   Run Formatting 
   ```