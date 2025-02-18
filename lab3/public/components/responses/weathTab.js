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

function infoList(){
   return React.createElement(
      'ul',
      {
         id: 'miscList' 
      }, 
      l
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
   );

}

export default makeWeathTab;