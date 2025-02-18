'use strict'; //catches mistakes
import makeHeader from './components/header.js';
import makeForm from './components/form.js';
import makeRes from './components/resMain.js';





function insertElement(id, createFun){
   const formNode = document.getElementById(id);
   const formRoot = ReactDOM.createRoot(formNode);
   formRoot.render(React.createElement(createFun)); 
}

window.addEventListener("load", function() {

   insertElement('insHeader', makeHeader);
   insertElement('insApiCaller', makeForm);
   insertElement('insAPIres', makeRes); 
})

