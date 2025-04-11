/*Responsible for creating page header */
'use strict'; //catches mistakes



function makeHeader() {

 return React.createElement(
   'h1',
   {
       id: 'header'  //this makes react re-render the component as state or props changed, 
   },
   "Joe's Quiz 2"
 );
}

export default makeHeader;