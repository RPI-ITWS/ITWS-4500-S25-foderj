         
# Creativity: 



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

- They\'re is invalid 




# Creativity: 
   
   - Postman Interface 
      - Instead of just presenting my data, and allowing the user to flip between what is shown (thus switching what endpoints are bieng used to present), I implemented a postman-esk interface 
      - this allows the user to make their own custom calls and also handles the response of each supported endpoint. 
   
   - Special Response handling: 
      - if the API response comes in the format of a message: res.json({ message: `Entire DB Populated.` });, the response is handled differently and presented to the user an styled test. Where if the response is a JSON object, it is presented to the user as a a non-editable text area for easy copy and pasting 

   - Fetch Mirror: 
      - this mirror takes the input from the user which they inputted in an understandable fashion and mirrors it to the user in the format of a fetch call 
      - this is creative as it shows the user what their call would look like if they wrote it out raw instead of using my postman-esk interface
      
   - General Stylling of the Website Using React. 
      - created informative form, titles, and text inputs/boxes 


# After quiz
   - make sure database is in good shape
   

- some API responses are this: {
    "quoteText":"Trust your hunches. They\'re usually based on facts filed away just below the conscious level.",
    "quoteAuthor": "Joyce Brothers",
    "senderName": "",
    "senderLink": "",
    "quoteLink": "http://forismatic.com/en/ff2a37e9f9/"
}

# IF have time: 
   - account for dups from forismatic
   