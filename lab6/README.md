# Lab 6
   - hosted at: https://foderj.eastus.cloudapp.azure.com/node

### Note to grader: 
   - I took quiz 2 at 2pm, not noon with the permisssoin of Dr. Callahan

# My Big Things Description + Creativity 
   

   - Automated ETL endpoint that pulls from external API, Transforms Data, and Loads it into Mongo DB all at once
      - server.js: with function definiiton: app.put('/db/jan/etl', async (req, res) => {}
      - A Put endpoint that calls both my strava and weather API's, it gets all of my activities from January, loops through them and calls the weather API for each item, conglomerating the data returned. It then puts the resultant JSON array into my database with a corresponding mongo ID number 'mongoNum' to allow for proper storage. 
      - Extremley helpful when wanting to wipe db with delete enpoint and load it with brand new data 
      - important to note that if ran often, may go over rate limit as creating the conglomerates are not cheap in terms of valueable data . 
   


   - Endpoint that connects to mongo DB and returns my top X longest runs in the database -> Just Distance, time and pace in good format
      - server.js: with function definition: app.get('/db/longest/:number', async (req,res) =>{
      - a get endpoint that returns an array of JSON objects of the format: 
         ```
         {
            "time_in_sec": 5332,
            "distance": 12.177004350528279,
            "avg_mph": 8.51
         }
         ```
      - :number specifies the length of the sorted list returned. This function searches through the entire mongoDB and returns an array of the :number longest runs in the DB in descending order. The data related to the selected documents is heavily modified and shortened, presenting it in a more comprehensive format than returning the raw JSON objects. 

   - Endpoint that gets data from mongo in specific way I want it, so I can easily load it into Rstudio and make a visualization
      - server.js with a function definition: app.get('/db/kudocsv', async (req,res) => {
      - a get endpoint that prompts the download of a csv file with date and kudo information of each run. Simply entering: https://foderj.eastus.cloudapp.azure.com/node/db/kudocsv will prompt the download of the csv. 
      - This is extremley helpful as it reaches directly into the database, goes through every single entry, and formats it perfectly to work in tandem with my Rstudio script that I have also included in this folder at 'kudoGraph.R'


   - Smaller (still important) things I added
      - Front-end Displaying new mongo db calls: 
         - with the addition of the ATL endpoint, new documents are correctly rendered on my site for the postman function, displaying the conglomerates in a easy to understand format.
         - test by entering '16' to Insert Document ID here (or "0" for /db): and selecting get method
      - make seperate page for visualizations
         - instead of having the visualizations at the top of my index.html, made a second page, and included a link to it next to my documentation. This allows for better user experience
      - added kudo graph at https://foderj.eastus.cloudapp.azure.com/node/visualizations.html
         - I utilized my new kudocsv endpoint to create a cool visualization of the kudos I got on my run throughout the entire month of January 
         



# Learning
   - Use RStudio visualization tool easy 
   - ETL -> Extract, Transform, and load
      - ETL pipeline: 
         - Extract data from external API's Transform that data in the way you want, load that DAta into mongoDB 
   - discoverability in terms of database outputs, make endpoints understandable and allow user to navigate entire API/Database intuitivley or with very helpful instructions 
   - Get data from a MongoDB via a Node API
      - literally our get endpoints that use mongo
   - Get data from external APIs via a Node API
      - literally our get endpoints that use external API's 
   - Know How to do a visualization. 

# To do
   - make react skeleton for quiz 

# Future Notes
   - check if old mongo Server.js functions 

# Citations
   - insert an entire array into mongoDB
      - https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.baeldung.com/java-mongodb-document-insert-array&ved=2ahUKEwiEyeC7h9CMAxXSEGIAHY_PDN8QFnoECBQQAQ&usg=AOvVaw3vSueJtvPvbIy_MfNX0Y2d
   - return csv from node API 
      - https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://dev.to/writech/returning-csv-content-from-an-api-in-nodejs-33f3&ved=2ahUKEwjtqK_5vtCMAxU5pIkEHZnUHCEQFnoECBwQAQ&usg=AOvVaw077s4EvnjIZFYFXyGjPeKM


