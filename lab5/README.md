# Creativity
   - For my Temperature Bar Chart, Each bar represents the average temperature throughout that day, which I calculated using the hourly temperature data I had associated with each of my datapoints. This gave a lot more insight as to what was going on that day and just a better feel of the data rather than using an arbitrary data point from said day. 
   - for my Kudo graph, I added red dots to each verticie in order to make it very visible as to where the point on thatchar actually time lies. 
   - I decided to use both Rstudio and D3 (one for each visuallization). 
   - I wrote endpoint at /mongoPop to parse through all of my data and put it in a readable form for my visualization. I commented this out though as it shouldn't be acsessible to everyone



# Plan 
   - Use D3
   - make one visualization of average temperature on run throughout time
      - will be a BAR CHART (try to add some color based on the temp range) 
      - each bin will be a day 

   - another visualzation of Kudo Count throughout time 
      - will be a line chart, in Rstudio 
      

   - Data Stored in Mongo will be conglomerate of weather and kudo information of every entry in 'db.json' 

---
# To do 
   - write a script to load the data I want into my Mongo √
      - populating data 
      ```
         //popFIle For Part 1 
         //assumes data does not have kudos or weather data associated with it yet 
         app.get('/mongoPop', async (req, res) => {


            for(var i = 0; i < data.length; i++){
               var itemID = data[i]["id"]; 
               data[i]["mongoNum"] = i; //gives mongo ID 
               console.log(itemID); 

               //getting strava activity
               var key = await getStravaAuth(); 
               var act = await getStravaAct(itemID,key); 
                  
               data[i]["kudos"] = act.kudos_count;

               getWHistCong(act, data[i], false, false, true); 
            }

            fs.writeFileSync('./congDocs.json', JSON.stringify(data, null, 4));
            res.json({ message: `Doc Populated.` });
         }) 
      ```

   - learn D3 and make visualizations correctly, 
      - account for lack of location data -> no weather 
      - there will always be kudos 
   - add 2 endpoints to the API to return the visualization react endpoints 
      - get visualizations for all of the runs in the database  

---
# Description 
   - use either Rstudio or d3.js for data visualization 
      - prolly d3 cause new learning, but Rstudio would be quicker 
   - make a bar plot and a histogram if we use R 
      - can literally copy and paste into CSV
   - import runs to mongo and make visualization off of this. 


---
# R studio Notes 
   - kina like C
   - have to output csv format, generate image, make a compenet
---
# D3 Resources 
   - https://d3-graph-gallery.com/intro_d3js.html
   - live and pull from the data base
   - D3 Histogram: 
      - https://d3-graph-gallery.com/graph/histogram_basic.html

---
# Citations/What I learned
   - D3 overall documentation: 
      - SVG is an image, graph is built up of multiple images, it's the element that actually renders our visualizaton 
         - https://d3-graph-gallery.com/intro_d3js.html
      - Bar Chart: https://observablehq.com/@d3/bar-chart-transitions/2

   - when importing things from the HTML, must use this: 
      - const { useEffect, useRef } = React;


# Do to vm 
   - lab5 % sudo npm install d3@latest  