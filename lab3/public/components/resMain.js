'use strict'; //catches mistakes
import makeWeathTab from './responses/weathTab.js';

function makeRes(){

   return React.createElement(
      'div',
      {id: "APIres"},
      makeWeathTab(),
   );

}


export default makeRes;