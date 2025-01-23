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
			API error handling
			can't submit form if not valid JSON 
			Test JSON input Box 
			include documentation of the API Above it (in textarea) witha  title above that 


		2. GET /runs = retrieve a listing of run ID numbers (hint: you can use headers for this if
		you don’t want to send the list in the body of your response; hint2: consider pagination, √
		since you have a lot of articles!)
		3. GET /runs/### = retrieve the specific run from the JSON object √
		4. POST /runs = append a run at the end of the JSON √
		5. PUT /runs = bulk update all your run √
		6. PUT /runs/### = update the specific run √
		7. DELETE /runs/### = delete the specific run √

		
		extremley basic error handling



	Documentation: 
		id (Unique identifier from 1 to 110)
		distance (miles)
		time (seconds) 
		pace (seconds/mile)

		when adding an item, ALL FIELDS MUST BE FILLED OUT 

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
	test if returns correctly by making JS call to the API (on mainpage use fetch and present results, dont change header)
	Go through requrements to see if it hits all. 
	Ensure no Npm init files in the repo
	read over lab1 instructions again to be sure 
	test with postman, they will test all of my endpoints so make sure they work
	test on server 
	validate pages 
	commennt
	Include the fact that documentation is in the API in creativity 

	edit pagenation checker url to work live


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


future notes: 
	for #4, would be more efficient to actually append 
	change indexing of data values ’
	clean input field and make it safe 

Questions: 
	Use pagnation and style ID response, on main page. raw response from API does not need to be styled
		is this correct

Current: 
	logging the value of method 
