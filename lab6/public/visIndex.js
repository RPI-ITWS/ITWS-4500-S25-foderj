
/*Higher level react file that puts all main components together */
'use strict'; //catches mistakes
import makeWeathVis from './components/responses/weathVis.js';
import KudoLineChart from './components/responses/kudoVis.js';




/*Expidites the rendering process */
function insertElement(id, createFun){
   const formNode = document.getElementById(id);
   const formRoot = ReactDOM.createRoot(formNode);
   formRoot.render(React.createElement(createFun)); 
}

function makeVis(){
   return React.createElement(
      'div',
      {
          id: 'vizes'  //this makes react re-render the component as state or props changed, 
      },
      makeWeathVis(), 
      KudoLineChart()
    );
}

/*MAIN*/ 
window.addEventListener("load", function() {

   insertElement('vis', makeVis);
})

