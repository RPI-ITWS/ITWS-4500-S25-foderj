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
		Upload 100 runs from my strava with endpoints how-ever it gives them to me
		have a JSON with all of it
		Server.js pulls from that JSON Data 
		Could not get real data, but setting up server so I can easily sub it in if I wanted
			navigate using run ID 

		1. GET / = retrieve an HTML/CSS/JS frontend of your creation (remember the
		app.use(express.static(‘public’)) thing?)
		2. GET /runs = retrieve a listing of run ID numbers (hint: you can use headers for this if
		you don’t want to send the list in the body of your response; hint2: consider pagination, √
		since you have a lot of articles!)
		3. GET /runs/### = retrieve the specific ID from the JSON object √
		4. POST /runs = append a run at the end of the JSON 
		5. PUT /runs = bulk update all your run
		6. PUT /runs/### = update the specific run
		7. DELETE /runs/### = delete the specific run
		have the ability to handle error/non-valid requests
		Use pagnation and style ID response, on main page. raw response from API does not need to be styled 	



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

future notes: 
	for #4, would be more efficient to actually append 

Questions: 
	Use pagnation and style ID response, on main page. raw response from API does not need to be styled
		is this correct