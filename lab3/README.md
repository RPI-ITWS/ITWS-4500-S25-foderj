
##### Served at: https://foderj.eastus.cloudapp.azure.com/node
- *Note: must be configured for vm and local, as there are url differences*
- *Note: path to lab3 folder on vm:* ```/var/www/html/foderjGit/lab3 ```

# Creativity 

 The main area of creativity for this lab was scalability, along with migrating some cool functionalities from my functionality.js to react. 

 ##### 1. Scalability/readability 
 - Structured my react in a way in which is it easy to understand what each file is responsibile for
 - Broke main page into 3 components: header, form, and results.
 - I then had a main file for the results portion which imported 5 more subcomponents of results (represented by the responses folder). 
 - the orginization of the files in this way allowed me to easily keep track of which portion of the lab I was working on and greatly impacted readability. 

 ##### 2. Miror functionality migrating to react
 - I decided to change my fetch mirror functionality from manipulating the DOM to using states in react. 
 - Integrated much easier with react than my previous funcionality. 
 - This can be seen [here](https://github.com/RPI-ITWS/ITWS-4500-S25-foderj/blob/28f62c6d35d44bfe69a04c383ce5db3a8d2d83ff/lab3/public/components/form.js#L100)
 

 ##### 3. File Seperation/Reusability
- When creating files and functions, I made sure to think in terms of reusability when creating them. For example, 'statDis.js' in my responses folder in imported into almost every single on of my respones and a very similar version is used for each response. 



---

# Running Work Log: 
```


Functionality from lab2 must exist in Lab 3. 
One file for each react component

Make this exact lab but in react 

Plan: 
   make a main js file where all of the components come together and that is the only thing connected to our index.html

Requirements: 
   remake the whole thing in react
   know how to use create element

before subit: 
   validate, comment, write up creativity
   remove log statements √

Creativity : 
   Scalability

Future Notes: 
   could integrate functionality and react so that when a response happens, can have a standardized react element that shows up to throw stuff into. 
   remove br and make the layout of the page more modern 
   convert functionality to react as well 

Things I learned/citations: 
   react is just used to create functions that make components of your page, things that are not made more then once do not need a function

   JS exports: https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export&ved=2ahUKEwj3ptv08cWLAxXJhIkEHVc7FFMQFnoECBQQAQ&usg=AOvVaw28HYPqII1Z6cRpmSSihS-M

   one line function shortcut: () => fetchMe()

   middle argument of createElement are any properties that you want to pass: 
      https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.w3schools.com/jsref/met_document_createelement.asp&ved=2ahUKEwio5t6X9cWLAxUgm4kEHc9II4IQFnoECBkQAQ&usg=AOvVaw1byJ7ttU9lwiz-UMS49JF1

   When doing this: 
      const headerNode = document.getElementById('like-button-root');
      const root = ReactDOM.createRoot(headerNode);
      root.render(React.createElement(makeHeader)); // how to pass arguments 

      Root node is replaced by the element I am rendering

   Using Webhooks :
      https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://stackoverflow.com/questions/75153066/how-do-i-get-the-value-of-a-usestate-hook-from-an-imported-component-in-a-react&ved=2ahUKEwi2zfDwkMuLAxVxlokEHUqDLTQQFnoECE4QAQ&usg=AOvVaw0Fy6LTgNuv4EtmAj874ENB

   JS export functions: 
      https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export&ved=2ahUKEwjeyaX0z82LAxUPM1kFHTD8JZUQFnoECAkQAQ&usg=AOvVaw28HYPqII1Z6cRpmSSihS-M

   For react files, if start with './', do not need to re-do path when on server

Creativity: 
   Migrating functionality of mirror to react

React Notes: 

   New thoughtprocess for making things: 
      reuse- UI elements 
      Not going to work on React and node working together

   Frameworks:
      standard way to build and deploy web apps 
      learn how to think with frameworks (there are multiple) 
      makes codebases easier to naviagate with the introduction of components 

   Data Binding: 
      html acts as a signpost of directives 
      Directives: adds behavior to DOM 
         Want to be reusable
      Components: Headers, buttons, forms ect
         written in js, shown as directive in html 
         Want to be reusable

   Event delegation: 
      IS an event listener 

   React start: 
      installed with this (like Jquery) 
      Props is short for properties 

      this is a directive: <div id="like-button-root"></div>
      Point of using react, to maximize minimizing writing code (multiple buttons, not one input box)
      react helps with logic 

Good example code: 
   async function fetchMe(){
      var fetchRes = await fetch("http://localhost:3000/runs/13343417366/temperature", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      }
   })

   var parsed = await fetchRes.json()
   console.log(parsed); 
   }



   function apiButton() {

   return React.createElement(
      'button',
      {
      onClick: () => fetchMe() //this makes react re-render the component as state or props changed, 
      },
      "Click here for API Call!"
   );
   }


Current: 
   done √
```