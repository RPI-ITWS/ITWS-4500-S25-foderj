/*Responsible for Curating html for Location related responses */
'use strict'; //catches mistakes
import {makeStatDis, h2, infoLi} from './statDis.js';

/*Creates the box which holds lat and long information  */
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


/*MAIN*/

/*creates run description and location box*/
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