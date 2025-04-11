/*Responsible for Curating html for Kudos related responses */
'use strict'; //catches mistakes
import {makeStatDis, h2, infoLi} from './statDis.js';

/*Creates the box which holds kudo information  */
function kudoHold(){
   return React.createElement(
      'div',
      {
         className: 'innerHold',
         id: 'kudoHolder' 
      }, 
      h2({innerText: 'Kudos Count', givID: null }), 
      React.createElement(
         'ul',
         {
            className: 'miscList' 
         }, 
         infoLi({title: 'Kudos:', innerUnits: null, givID: 'kudosRes'})
      )
   )
}


/*MAIN*/

/*creates run description and kudos box*/
function makeKudos(){
   return React.createElement(
      'div',
      {
         className: 'mainHold',
         id: 'kudos' 
      }, 
      makeStatDis({extra: 'k'}),
      kudoHold()
   )

}

export default makeKudos