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

function makeTxtArea({givID, place, inner, readO}){

   useEffect(() => {
      const observer = new MutationObserver(() => {
        setText($(givID).text()); // Sync jQuery changes with React state
      });
  
      observer.observe(document.getElementById(givID), { childList: true });
  
      return () => observer.disconnect();
    }, []);

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
      makeInput({givID: 'url', place: 'Request URL'}),
      bk(),
      bk(),
      makeHeader({place: "Enter JSON Body of request (if neccesary):"}), 
      makeTxtArea({givID: "jsonInput", place : '{"distance":9.1,"moving_time":6710,"average_speed":684}', inner: null, readO: false}), 
      bk(), 
      bk(), 
      makeHeader({place: "What the fetch request you are creating would look like using Fetch API:"}), 
      makeTxtArea({givID: "fetch", place: null, inner: "fetch('', {\n\
          method: 'GET',\n\
\n\
          headers: {\n\
            'Content-Type': 'application/json',\n\
          },\n\
\n\
          body: ''\n\
      })", readO: true})



   );
 
}

export default makeForm;