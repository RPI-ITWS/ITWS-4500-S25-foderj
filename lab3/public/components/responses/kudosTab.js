'use strict'; //catches mistakes
import {makeStatDis, h2, infoLi} from './statDis.js';

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