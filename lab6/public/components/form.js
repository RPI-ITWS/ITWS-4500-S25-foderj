
import makeWeathVis from './responses/weathVis.js';
import KudoLineChart from './responses/kudoVis.js';
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
      ),
      React.createElement(
         'br',
         null,
         null
      ),
      //local
      React.createElement(
         'a', 
         {href: "node/visualizations.html"}, 
         "Click Here for Visualizations"
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


/*makes all of the method buttons on te same line*/
function methButtons(){
   return React.createElement(
      'div', 
      {}, 
      React.createElement(
         'button',
         { //this makes react re-render the component as state or props changed, 
            id: 'getButton'
         },
         "GET"
      ), 
      React.createElement(
         'button',
         { //this makes react re-render the component as state or props changed, 
            id: 'putButton'
         },
         "PUT"
      ), 
      React.createElement(
         'button',
         { //this makes react re-render the component as state or props changed, 
            id: 'postButton'
         },
         "POST"
      ), 
      React.createElement(
         'button',
         { //this makes react re-render the component as state or props changed, 
            id: 'delButton'
         },
         "DELETE"
      )
   )

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

         // //vm
         if(newText.trim() == "0" || newText.trim() == "empty"){
            INPURL = "node/db";
         }else{
            INPURL = "node/db/" + newText.trim();
         }
         
         //local
         // if(newText.trim() == "0" || newText.trim() == "empty"){
         //    INPURL = "/db";
         // }else{
         //    INPURL = "/db/" + newText.trim();
         // }
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
      methButtons(),
      bk(),
      bk(),
      makeLabel({ innerText: 'Insert Document ID here (or "0" for /db):' }),
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
         type: 'submit',
         id: 'subButton'
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