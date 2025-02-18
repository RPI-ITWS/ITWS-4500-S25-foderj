'use strict'; //catches mistakes
import makeWeathTab from './responses/weathTab.js';
import makeKudos from './responses/kudosTab.js';

function makeRes(){

   return React.createElement(
      'div',
      {id: "APIres"},
      makeWeathTab(),
      makeKudos()
   );

}


export default makeRes;