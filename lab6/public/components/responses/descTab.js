/*Responsible for Curating html for Description related responses */
'use strict'; //catches mistakes
import {makeStatDis, h2, infoLi} from './statDis.js';

/*Creates the box which holds description information  */
function descHold(){
   return React.createElement(
      'div',
      {
         className: 'innerHold',
         id: 'descHolder' 
      }, 
      h2({innerText: 'Description', givID: null }), 
      React.createElement(
         'ul',
         {
            className: 'miscList' 
         }, 
         infoLi({title: 'Description:', innerUnits: null, givID: 'descRes'}),
      )
   )
}


/*MAIN*/

/*creates run description and description box*/
function makeDesc(){
   return React.createElement(
      'div',
      {
         className: 'mainHold',
         id: 'description' 
      }, 
      makeStatDis({extra: 'd'}),
      descHold()
   )

}

export default makeDesc