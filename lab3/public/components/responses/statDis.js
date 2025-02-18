export function h2({ innerText, givID }) {

   return React.createElement(
      'h2',
      {
         id: givID
      },
      innerText
   );
}


export function infoLi({title,innerUnits, givID}){
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

function infoList({extraChar}){
   return React.createElement(
      'ul',
      {
         className: 'miscList' 
      }, 
      infoLi({title: 'Date:', innerUnits: null, givID: extraChar + 'start_date'}),
      infoLi({title: 'Duration:', innerUnits: null, givID: extraChar +'elapsed_time'}),
      infoLi({title: 'Distance:', innerUnits: 'miles', givID: extraChar +'distance'}),
      infoLi({title: 'Speed:', innerUnits: 'mph', givID: extraChar +'average_speed'})
   )
}

export function makeStatDis({extra}){
   return React.createElement(
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
         infoList({extraChar: extra})
      )

   )
}

