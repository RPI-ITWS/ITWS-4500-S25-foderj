/*Responsible for making running stats box */

/*Creates header of box*/
export function h2({ innerText, givID }) {

   return React.createElement(
      'h2',
      {
         id: givID
      },
      innerText
   );
}

/*creates running stats list item*/
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


/*creates entire running stats list*/
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

/*MAIN*/
/*creates entire running stats display box*/
export function makeStatDis({extra}){
   return React.createElement(
      'div', 
      {
         className: 'innerHold', 
         id: 'runHoldW'
      },
      h2({innerText: 'Really nice easy', givID: extra + 'name'}), 
      React.createElement(
         'div', 
         {
            className: 'innerHold'
         }, 
         infoList({extraChar: extra})
      )

   )
}

