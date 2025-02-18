'use strict'; //catches mistakes
import {makeStatDis, h2, infoLi} from './statDis.js';

function locHold(){
   return React.createElement(
      'div',
      {
         className: 'innerHold',
         id: 'locHolder' 
      }, 
      h2({innerText: 'Location', givID: null }), 
      React.createElement(
         'ul',
         {
            className: 'miscList' 
         }, 
         infoLi({title: 'Latitude:', innerUnits: null, givID: 'lat'}),
         infoLi({title: 'Longitude:', innerUnits: null, givID: 'long'})
      )
   )
}

function makeLoc(){
   return React.createElement(
      'div',
      {
         className: 'mainHold',
         id: 'location' 
      }, 
      makeStatDis({extra: 'l'}),
      locHold()
   )

}

export default makeLoc