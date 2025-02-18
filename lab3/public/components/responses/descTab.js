'use strict'; //catches mistakes
import {makeStatDis, h2, infoLi} from './statDis.js';

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