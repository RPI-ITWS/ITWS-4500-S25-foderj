'use strict'; //catches mistakes
import {makeStatDis, h2} from './statDis.js';









function makeTbody(){
   return React.createElement(
      'tbody', 
      null,
      React.createElement(
         'tr', 
         null, 
         React.createElement(
            'td', 
            null, 
            React.createElement(
               'b', 
               null,
               "Time"
               
            )
         ),
         React.createElement('td',null,'0:00'),
         React.createElement('td',null,'1:00'),
         React.createElement('td',null,'2:00'),
         React.createElement('td',null,'3:00'),
         React.createElement('td',null,'4:00'),
         React.createElement('td',null,'5:00'),
         React.createElement('td',null,'6:00'),
         React.createElement('td',null,'7:00'),
         React.createElement('td',null,'8:00'),
         React.createElement('td',null,'9:00'),
         React.createElement('td',null,'10:00'),
         React.createElement('td',null,'11:00'),
         React.createElement('td',null,'12:00'),

      ),
      React.createElement(
         'tr', 
         null, 
         React.createElement(
            'td', 
            {
               id: 'typeVal1'
            }, 
            React.createElement(
               'b', 
               null,
               "Rain"
            ),
         ),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null),
         React.createElement('td',null,null)
      ) 
      
   )
}

function initTable({givID}){
   return React.createElement(
      'table', 
      {
         id: givID
      }, 
      makeTbody()
     
   )
}

function makeWeathDis(){
   return React.createElement(
      'div', 
      {
         className: 'innerHold', 
         id: 'tabHolder'
      },
      h2({innerText: 'Precipitation (inches)', givID: 'weathKind'}), 
      initTable({givID:'top'}),
      React.createElement(
         'table', 
         {
            id: 'bot'
         }, 
         React.createElement(
            'tbody', 
            null,
            React.createElement(
               'tr', 
               null, 
               React.createElement(
                  'td', 
                  null, 
                  React.createElement(
                     'b', 
                     null,
                     "Time"
                     
                  )
               ),
               React.createElement('td',null,'13:00'),
               React.createElement('td',null,'14:00'),
               React.createElement('td',null,'15:00'),
               React.createElement('td',null,'16:00'),
               React.createElement('td',null,'17:00'),
               React.createElement('td',null,'18:00'),
               React.createElement('td',null,'19:00'),
               React.createElement('td',null,'20:00'),
               React.createElement('td',null,'21:00'),
               React.createElement('td',null,'22:00'),
               React.createElement('td',null,'23:00')
            ),
            React.createElement(
               'tr', 
               null, 
               React.createElement(
                  'td', 
                  {
                     id: 'typeVal2'
                  }, 
                  React.createElement(
                     'b', 
                     null,
                     "Rain"
                  ),
               ),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
               React.createElement('td',null,null),
            ) 
            
         )
         
        
      )
      

   )
}

function makeWeathTab(){

   return React.createElement(
      'form',
      {id: "apiCaller"},
      React.createElement(
         'div', 
         {
            className: 'mainHold',
            id: 'precip'
         }, 

         makeStatDis({extra: ''}),
         makeWeathDis()
      )
   );

}



export default makeWeathTab;