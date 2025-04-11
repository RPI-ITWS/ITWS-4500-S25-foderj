# Note to grader: 
   - I took quiz at 2pm, not noon with the permisssoin of Dr. Callahan

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

# My Big Things
   - make seperate page for visualizations

   - Automated ETL endpoint that pulls from external API, Transforms Data, and Loads it into Mongo DB all at once
      - Load January 
      - app.put('/db/jan/etl', async (req, res) => {
   
   - Front-end Displaying new mongo db calls: 
      - The ETL function curates the DB with weather data as well. I made the front end able to present that weather data now included in the mongo DB 

   - Endpoint that connects to mongo DB and returns my top X longest runs in the database -> Just Distance, time and pace in good format
      - done 

   - Endpoint that gets data from mongo in specific way I want it, so I can easily load it into Rstudio and make a visualization


# Future Notes
   - check if old mongo Server.js functions 

# learning
   - insert an entire array into mongoDB
      - https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.baeldung.com/java-mongodb-document-insert-array&ved=2ahUKEwiEyeC7h9CMAxXSEGIAHY_PDN8QFnoECBQQAQ&usg=AOvVaw3vSueJtvPvbIy_MfNX0Y2d




# Plot the line chart
ggplot(data, aes(x = date, y = kudos)) +
  geom_line(color = "steelblue", size = 1.5) +  # Line with blue color
  geom_point(color = "red", size = 3) +         # Red dots for each data point
  labs(title = "Kudos Line Chart",
       x = "Date",
       y = "Kudos") +
  theme_minimal() +                             # Clean theme
  scale_x_date(date_labels = "%b %d, %Y",       # Format x-axis to show full date
               date_breaks = "1 day") +         # Set the breaks to 1 day
  theme(axis.text.x = element_text(angle = 45, hjust = 1))  # Rotate x-axis labels for better readability


ggsave("kudos_line_chart.png", plot = plot, width = 10, height = 6, dpi = 300)
