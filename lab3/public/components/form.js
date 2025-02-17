'use strict'; //catches mistakes
const { useState } = React; //basically importing
var INPURL = ""
var INPJSON = ""
var INPMETH = "GET"



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

function makeLabel({ innerText }){
   return React.createElement(
      'label',
      null,
      innerText, 
   );
}

function bk(){
   return React.createElement(
      'br',
      null,
      null
   );
}

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

function makeInput({givID, place}){
   return React.createElement(
      'input',
      {
         id: givID,
         size: "86",
         type: "text",
         placeholder: place, 
         required: true
      },
      null

   );
}

function makeTxtArea({givID, place, inner, readO}){

   return React.createElement(
      'textarea',
      {
         id: givID,
         rows: 15,
         cols: 70,
         placeholder: place, 
         readOnly: readO,
         defaultValue: inner
      }

   );
}

function makeHeader({place}){
   return React.createElement(
      'header',
      null,
      place
   );
}




// const MyComponent = () => {
//   // State for the first textbox
//   const [firstText, setFirstText] = useState('');
  
//   // State for the second textbox (this will be updated based on the first one)
//   const [secondText, setSecondText] = useState('');

  
//   //e is the event object 
//   const handleFirstTextChange = (e) => {
//     const newText = e.target.value;
//     setFirstText(newText);  // Update the first textbox state
//     setSecondText(newText); // Update the second textbox state
//   };

//   return React.createElement(
//     'div',
//     null,
//     React.createElement(
//       'input', 
//       {
//         type: 'text',
//         value: firstText, // Bind the value to the state
//         onChange: handleFirstTextChange, // Update the state when the first textbox changes
//       }
//     ),
//     React.createElement(
//       'input', 
//       {
//         type: 'text',
//         value: secondText, // Bind the value to the second textbox state
//         readOnly: true, // Make the second textbox read-only so the user can't change it
//       }
//     )
//   );
// };



function makeMirror(){


     // State for the first textbox
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

   const handleBoxChange = (e) => {
      const newText = e.target.value;
      if(e.target.id == 'url'){
         INPURL = newText
      }else{
         INPJSON = newText
      }

      var newFetch = "fetch('" + INPURL + "', {\n\
          method: 'GET',\n\
\n\
          headers: {\n\
            'Content-Type': 'application/json',\n\
          },\n\
\n\
          body: '" + INPJSON + "'\n\
      })"

      setFetch(newFetch)
   };




   return React.createElement(
      'div', 
      null, 
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
            id: "fetch",
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
            id: "jsonInput",
            rows: 15,
            cols: 70,
            placeholder: '{"distance":9.1,"moving_time":6710,"average_speed":684}', 
            value: simpleFetch,
            readOnly: true 
         }
      )
   )
}

/*MAIN*/
function makeForm() {

   return React.createElement(
      'form',
      {id: "apiCaller"},
      docHeader(),
      makeLabel({ innerText: 'Choose a Call Method:' }),
      bk(),
      makeSelect(),
      bk(),
      bk(),
      makeMirror()

   );
 
}

export default makeForm;