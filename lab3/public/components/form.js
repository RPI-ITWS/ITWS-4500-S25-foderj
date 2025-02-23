/*Responsible for creating form in which user can make API Calls */
'use strict'; //catches mistakes
const { useState } = React; //basically importing
var INPURL = ""
var INPJSON = ""
var INPMETH = "GET"


/*Makes header that links to API documentation*/
function docHeader() {

   return React.createElement(
      'h3',
      null,
      React.createElement(
         'a', 
         {href: "https://github.com/RPI-ITWS/ITWS-4500-S25-foderj/tree/main/lab2#readme"}, 
         "Click Here for Documentation"
      )
   );
}

/*Creates label to help label things within form*/
function makeLabel({ innerText }){
   return React.createElement(
      'label',
      null,
      innerText, 
   );
}

/*Quick Funciton To create a break*/
function bk(){
   return React.createElement(
      'br',
      null,
      null
   );
}

/*Makes select dropdown menu for form*/
function makeSelect(){
   return React.createElement(
      'select',
      {
         id: "method"
      },
      React.createElement('option',{value: "GET"}, "GET"),
      React.createElement('option',{value: "POST"}, "POST"),
      React.createElement('option',{value: "PUT"}, "PUT"),
      React.createElement('option',{value: "DELETE"}, "DELETE")
   );
}




/*Creates a header with a given placeholder*/
function makeHeader({place}){
   return React.createElement(
      'header',
      null,
      place
   );
}



/*Responsible for fetch caller functionality  */ 
function makeMirror(){
   //itial string in box
   var init = "fetch('', {\n\
          method: 'GET',\n\
\n\
          headers: {\n\
            'Content-Type': 'application/json',\n\
          },\n\
\n\
          body: ''\n\
      })"


   const [simpleFetch, setFetch] = useState(init);

   //updates fetch box when others change
   const handleBoxChange = (e) => {
      const newText = e.target.value;
      if(e.target.id == 'url'){
         INPURL = newText
      }else if(e.target.id == 'method'){
         INPMETH = newText
      }else{
         INPJSON = newText
      }

      var newFetch = "fetch('" + INPURL + "', {\n\
          method: '" + INPMETH + "',\n\
\n\
          headers: {\n\
            'Content-Type': 'application/json',\n\
          },\n\
\n\
          body: '" + INPJSON + "'\n\
      })"

      setFetch(newFetch)
   };


   //defining the intertwined components
   return React.createElement(
      'div', 
      null, 
      makeLabel({ innerText: 'Choose a Call Method:' }),
      bk(),
      React.createElement(
         'select',
         {
            id: "method",
            onChange: handleBoxChange
         },
         React.createElement('option',{value: "GET"}, "GET"),
         React.createElement('option',{value: "POST"}, "POST"),
         React.createElement('option',{value: "PUT"}, "PUT"),
         React.createElement('option',{value: "DELETE"}, "DELETE")
      ),
      bk(),
      bk(),
      makeLabel({ innerText: 'Enter Request URL:' }),
      bk(),
      React.createElement(
         'input',
         {
            id: 'url',
            size: "86",
            type: "text",
            placeholder: 'Request URL', 
            required: true, 
            onChange: handleBoxChange
         },
         null
      ),
      bk(),
      bk(),
      makeHeader({place: "Enter JSON Body of request (if neccesary):"}), 
      React.createElement(
         'textarea',
         {
            id: "jsonInput",
            rows: 15,
            cols: 70,
            placeholder: '{"distance":9.1,"moving_time":6710,"average_speed":684}', 
            onChange: handleBoxChange
         }
      ),
      bk(), 
      bk(), 
      makeHeader({place: "What the fetch request you are creating would look like using Fetch API:"}), 
      React.createElement(
         'textarea',
         {
            id: "fetch",
            rows: 15,
            cols: 70,
            placeholder: '{"distance":9.1,"moving_time":6710,"average_speed":684}', 
            value: simpleFetch,
            readOnly: true 
         }
      )
   )
}

/*simply makes submit button*/
function makeSub(){
   return (React.createElement(
      'button', 
      {
         type: 'submit'
      }, 
      'Submit'
   ))
}

/*MAIN*/
function makeForm() {

   return React.createElement(
      'form',
      {id: "apiCaller"},
      docHeader(),
      makeMirror(),
      makeSub()
   );
 
}

export default makeForm;