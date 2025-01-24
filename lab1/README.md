
Served at: https://foderj.eastus.cloudapp.azure.com/node
*Note: must be configured for vm and local, as there are url differences*

# Joe's Runs API Documentation:

#### 1. GET https://foderj.eastus.cloudapp.azure.com/node/runs

- will return a list of all of the ID's from all of the runs in the form of JSON 
- No Body neccesary. 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	}
})
```
- *Example Response*:
```
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]
```

#### 2. GET https://foderj.eastus.cloudapp.azure.com/node/runs/###

- here '###' represents any valid id that correlates to a run
- Only valid ID's will be accepted
- No Body neccesary. 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs/32', {
	method: 'GET',

	headers: {
           "Content-Type": "application/json",
	}
})
```
- *Example Response*:
```
{
    "id": 32,
    "distance": 8.9,
    "time": 5479,
    "pace": 412
}
```
#### 3. POST https://foderj.eastus.cloudapp.azure.com/node/runs

- Will append a new run to the end of the existing database of runs 
- Body of the request must be strinified JSON and include 'distance', 'time', and 'pace' for the entry to be added. 
- Body Neccesary 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs', {
	method: 'POST',

	headers: {
           "Content-Type": "application/json",
	},

	body: '{"distance":9.1,"time":6710,"pace":684}'
     })
```
- *Example Response*:
```
{
    "message": "Received data for run with distance 9.1"
}
```

#### 4. PUT https://foderj.eastus.cloudapp.azure.com/node/runs

- Will bulk update anywhere from 1-3 attributes from all of the runs at the same time  
- you will not be allowed to update the id of any run
- If an ID is included in the body, nothing will change regarding ID's in the database 
- Include the attributes you want to update in the body of your request 
- Body Neccesary 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs', {
	method: 'PUT',

	headers: {
           "Content-Type": "application/json",
	},

	body: '{"distance":2}'
     })
```
- *Example Response*:
```
{
    "message": "All runs updated accordingly"
}
```

#### 5. PUT https://foderj.eastus.cloudapp.azure.com/node/runs/###

- here '###' represents any valid id that correlates to a run
- Will bulk update anywhere from 1-3 attributes of the run specified by the ID in the url
- you will not be allowed to update the id of any run
- If an ID is included in the body, nothing will change regarding ID's in the database 
- Include the attributes you want to update in the body of your request 
- Body Neccesary 
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs/56', {
	method: 'PUT',

	headers: {
           "Content-Type": "application/json",
	},

	body: '{"distance":2,"pace":543}'
     })
```
- *Example Response*:
```
{
    "message": "Run '56' updated accordingly"
}
```

#### 6. DELETE https://foderj.eastus.cloudapp.azure.com/node/runs/###

- here '###' represents any valid id that correlates to a run
- Will delete any run specified by the ID in the url
- you will not be able to acsess this run after it is deleted
- Will update the ID's of the rest of the runs in the DB accordingly; the ones following the element deleted have their ID's decremented
- *Example Request*: 
```
fetch('https://foderj.eastus.cloudapp.azure.com/node/runs/92', {
	method: 'DELETE',

	headers: {
           "Content-Type": "application/json",
	}
     })
```
- *Example Response*:
```
{
    "message": "Run '92' deleted"
}
```
---
# Creativity 

 I decided to go with functional creativity vs design (css) creativity as functional is defintley my strong suit. Here is what I would like to be considered: 

 ##### 1. Form structure in the homepage
 - Here I really wanted to make the forms as easy to use/understand, and as straightforward as possible for the user. I think the way I seperated the fetch request into fields was pretty creative as balances the line of requiring the user to read the documentation, while also being easy to operate very well. I also think the use of a textarea for my JSON input was beneficial to the user and good to include

 ##### 2. Live Fetch Example
 - In order for the user to be able to learn as much as possible from the docs, and my 'testing tool', I included a auto updating javascript fetch call. As the user enters data into the form, this readonly text-area updates and shows the user exactly how that would make that fetch API call in javascript. I think this would be really helpful for a user as they can easily copy and paste it, while also helping them to understand how API works. 

##### 3. Pagination of Certain Responses
 - The way I updated the page when certain requests were tested was something I thought was pretty creative. I'm happy I went about parsing the API response instead of having the API respond with an abnormal body as this maintains the standard of every other call. I also edit the DOM for each response and others show up in a readonly text-area. 

##### 4. Documentation Markdown
 - I tried to organize my documentation in a way that was very easy to read/follow and I think I did a good job of doing that using markdown. Including the code boxes along with the examples defintley makes it easier to understand. 

---
```
Plan: 
	Orginization of the API is not that huge of a deal  
	Function get/new/:number
		Something becomes a variable, so don't have to run hundreds of endpoints; don't have to do: 
			get/new/1
			get/new/2
			get/new/3
			get/new/4
			get/new/5
		
		Use postman to test endpoints 
		Document what you consider for creativity
		Document API and Cite your sources
		
		Work Locally, then transfer to github. 
		Make it s25 instead f24 
		
		Don't forget certbot 

		Make, test with postman, then make frontend 

		

	My personal Runs API: 

		Server.js pulls from that JSON Data 
		Could not get real data, but setting up server so I can easily sub it in if I wanted
			navigate using run ID 

		1. GET / = retrieve an HTML/CSS/JS frontend of your creation (remember the
		app.use(express.static(‘public’)) thing?)
			Make functional Frontend: 
				
				
				
			
			Dropdown for GET, POST, PUT, DELETE
			Form: 
				Option to select: GET, POST, PUT, DELETE
				url textbox:
				body textbox:

				Handle if not Valid JSON input

				Box that presents the  the response: 
					use pagenation for books 




			Pagenation √
			remove async from mail and uncomment√
			API error handling√
			can't submit form if not valid JSON √
			Testing JSON input Box through homepage √
			
			


		2. GET /runs = retrieve a listing of run ID numbers (hint: you can use headers for this if
		you don’t want to send the list in the body of your response; hint2: consider pagination, √
		since you have a lot of articles!)
		3. GET /runs/### = retrieve the specific run from the JSON object √
		4. POST /runs = append a run at the end of the JSON √
		5. PUT /runs = bulk update all your run √
		6. PUT /runs/### = update the specific run √
		7. DELETE /runs/### = delete the specific run √

		
		



	Documentation: 
		id (Unique identifier from 1 to 110)
		distance (miles)
		time (seconds) 
		pace (seconds/mile)

		when adding an item, ALL FIELDS MUST BE FILLED OUT 

	POST /runs = append a run at the end of the JSON

	{
		"distance": 6.7,
		"time": 2760,
		"pace": 412
	}

	PUT /runs = bulk update all your run

expects anything like this, can only be 1 but will rewrite everything to having that attribute
{
   "distance": 6.7,
   "time": 2760,
   "pace": 412
}
Can only edit distance, time, and pace, as ID is uneditable as it is a unique identifier

API Review Notes: 
	just sends back some informaiton when you try to fetch something like: 
		var fetchRes = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=76b8f36558ce3b5fbce8ba9d025e5fe9");
		see example API Documentation: 
			https://frankfurter.dev

	if no method is specified, fetch() in Java is a GET request, 
		but you can specify any method

Must be served on: 
	https://<FQDN>/node



Requirements: 
	Keep Port @ 3000
	> 100 objects
	Create API DOcumentation 
	Document what you consider for creativity
	Document API and Cite your sources
	
	A front end at the main area that allows the user to input a form that will return what they want: 
		also include API Call Documentation 
		test if returns correctly by making JS call to the API (on mainpage use fetch and present results, dont change header)
		must have post,put,delete deatures
		homepage located at /node





Before Submit: 
	Download and setup git ignore file √
	toss on server √
	test if returns correctly by making JS call to the API (on mainpage use fetch and present results, dont change header) √
	Go through requrements to see if it hits all. √
	no node module files in repo √
	read over lab1 instructions again to be sure √
	test with postman, they will test all of my endpoints so make sure they work √
	test on server √
	validate pages √
	commennt √

	edit pagenation checker url to work live √√
	reset project.json √
	remove console logs, clean files √
	write documentation √
	add creativity section √
	finalize readme √


Creativity: 	
	documentation is on the api page
	as field updates it shows you what the javascript fetch call you are making would look like




Getting node to run on VM notes: 
	can have any directory structure in your repo on your vm: everything will be served from: 
		https://<FQDN>/node
	navigate to directory on VM where you are storing you server.js file (the new 'project')
	run 'sudo npm init' within that directory 
	enter through all prompts 
	type yes
	'sudo npm install express' within that directory 
	type 'node server' 
	'Listening on *:3000' should pop up 
	open web-browser and navigate 'to https://<FQDN>/node'
	from here, your file structure should be the same as when you test locally, just substitute the URL in this way: 
		sub 'http://localhost:3000/' for 'https://<FQDN>/node'. Example: 
			http://localhost:3000/itws/4500 = https://<FQDN>/node/itws/4500

		
	Everything should be served correctly from there

Citations/What I learned: 
	res.json automatically goes to the body: 
		 https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.geeksforgeeks.org/difference-between-res-send-and-res-json-in-express-js/&ved=2ahUKEwi-07K824qLAxU1jYkEHclcEK8QFnoECBwQAQ&usg=AOvVaw0ohAkldKYEeutD-AUaXDUK

	Browsers work through get requests
	

	Only would send info in the header for it to be a littl emore lightweight, 
	Arrays in JS are basically the same as in Python
	req.params is an object that contains all the route parameters (variables in the URL) and how we use 'number:'
		https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.geeksforgeeks.org/express-js-req-params-property/&ved=2ahUKEwix4-u-44qLAxWxpIkEHT8KFyIQFnoECBIQAQ&usg=AOvVaw3YMW_PaAa2vsJdsHI0NuGc
		if can't be parsed as number, req.params does not work

	if app.get function does not have a specified response, it will spin on Chrome forever but still log the right thing
		
	app.post: 
		https://www.geeksforgeeks.org/express-js-app-post-function/
		 the request body is the most common and recommended approach for sending data in POST requests.
	destructing assignment: 
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

	Writefilesync: 
		https://www.geeksforgeeks.org/node-js-fs-writefilesync-method/
	./ means current director 

	Parsing req bodies: 
		https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.geeksforgeeks.org/express-js-express-json-function/&ved=2ahUKEwij5Z76koyLAxUxkIkEHZ1YCfoQFnoECAgQAQ&usg=AOvVaw2Hv2KKIqisiT2RMM7yHfmL

	Splice (JS): 
		https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.w3schools.com/jsref/jsref_splice.asp&ved=2ahUKEwi6uZnZm4yLAxV4hIkEHbZvHF0QFnoECB0QAQ&usg=AOvVaw3E6K3kw9F_ybXFVnnwrx2h

	Only use HTML for Node 

	Node.js is very similar to using xampp 

	HTML Textarea: 
		https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.w3schools.com/tags/tag_textarea.asp&ved=2ahUKEwj0to--rIyLAxXSmYkEHVrmLqsQFnoECAgQAQ&usg=AOvVaw1zSyL_2DncySXU9AGIUEcO

		Note that this prints whitespace as well 


	app.use(express.json()); //what parses  -> what makes req/body a json 

	Object.keys(req.body).length
		//says there are no keys or vars in req.body (as req.body is a JSON)

	Listen 
	https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.w3schools.com/jsref/obj_inputevent.asp&ved=2ahUKEwi92dXl2YyLAxXjnokEHcM2KMUQFnoECB8QAQ&usg=AOvVaw3AgHYO0Tmzu3jspRFsQm0N

	Removing whitespace using regex: 
		https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://w3schools.invisionzone.com/topic/46639-space-remover-using-js-replacesg/&ved=2ahUKEwi67avG4IyLAxX7mokEHdlmJkEQFnoECBMQAQ&usg=AOvVaw2mX5dhkqg4CmSS0UwkwVHu

	the gitignore given blocks the node modules 

	Stringified JSON: JSON simply converted to a string 


future notes: 
	for #4, would be more efficient to actually append 
	change indexing of data values ’
	clean input field and make it safe 
	remove body portion for get and delete
	include documentation on public page
	cannot change id message (for now just doesn't do anything) 
	optimize server.js:126 
	reorganize documentation with what you want to do leading off as the header
	fix indents on fetch example
	don't decrement ID's 

Questions: 
	Use pagnation and style ID response, on main page. raw response from API does not need to be styled
		is this correct

Current: 
	done √
```