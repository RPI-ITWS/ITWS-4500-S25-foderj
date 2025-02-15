'use strict'; //catches mistakes



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
      makeLabel({ innerText: 'Enter Request URL:' }),
      bk(),
      makeInput({id: 'url', place: 'Request URL'}),
      bk(),
      bk(),
   );
 
}

export default makeForm;