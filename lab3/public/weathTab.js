'use strict'; //catches mistakes


function h2({ innerText, givID }) {

   return React.createElement(
      'h2',
      {
         id: givID
      },
      innerText
   );
}

function infoLi({title,innerUnits, givID}){
   return React.createElement(
      'li', 
      null,
      title, 
      React.createElement(
         'span',
         {
            className: 'res'
         },
         React.createElement(
            'span', 
            {
               id: givID
            },
         ), 
         innerUnits

      )
      
   )
}

function infoList(){
   return React.createElement(
      'ul',
      {
         id: 'miscList' 
      }, 
      infoLi({title: 'Date:', innerUnits: null, givID: 'start_date'}),
      infoLi({title: 'Duration:', innerUnits: null, givID: 'elapsed_time'}),
      infoLi({title: 'Distance:', innerUnits: 'miles', givID: 'distance'}),
      infoLi({title: 'Speed:', innerUnits: 'mph', givID: 'average_speed'})
   )
}


function makeStatDis(){
   React.createElement(
      'div', 
      {
         className: 'innerHold', 
         id: 'runHoldW'
      },
      h2({innerText: 'Really nice easy', givID: 'name'}), 
      React.createElement(
         'div', 
         {
            className: 'innerHold'
         }, 
         infoList()
      )

   )
}

function makeTbody(){
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
   React.createElement(
      'table', 
      {
         id: givID
      }, 
      makeTbody()
     
   )
}

function makeWeathDis(){
   React.createElement(
      'div', 
      {
         className: 'innerHold', 
         id: 'tabHolder'
      },
      h2({innerText: 'Precipitation (inches)', givID: 'weathKind'}), 
      initTable({givID:'top'}),
      initTable({givID:'bot'})

   )
}

function makeWeathTab(){

   return React.createElement(
      'form',
      {id: "apiCaller"},
      React.createElement(public/components/responses/weathTab.js public/home.css
         'div', 
         {
            className: 'mainHold',
            id: 'precip'
         }, 
         makeStatDis(),
         makeWeathDis()
      )
   );

}

export default makeWeathTab;