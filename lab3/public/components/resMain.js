'use strict'; //catches mistakes
import makeWeathTab from './responses/weathTab.js';
import makeKudos from './responses/kudosTab.js';
import makeLoc from './responses/locTab.js';
import makeDesc from './responses/descTab.js';
import {makeStatDis, h2, infoLi} from './responses/statDis.js';

function makeRes(){

   return React.createElement(
      'div',
      {id: "APIres"},
      makeWeathTab(),
      makeKudos(),
      makeLoc(), 
      makeDesc(), 
      React.createElement(
         'div',
         {
            className: 'mainHold',
            id: 'solo' 
         }, 
         makeStatDis({extra: 's'})
      ), 
      React.createElement('div', {id:'message'}, null)
   );

}


export default makeRes;