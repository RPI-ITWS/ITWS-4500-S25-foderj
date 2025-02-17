'use strict'; //catches mistakes
import makeHeader from './components/header.js';
import makeForm from './components/form.js';





function insertElement(id, createFun){
   const formNode = document.getElementById(id);
   const formRoot = ReactDOM.createRoot(formNode);
   formRoot.render(React.createElement(createFun)); 
}

window.addEventListener("load", function() {

   insertElement('insHeader', makeHeader);
   insertElement('insApiCaller', makeForm);
})


// // Using React.createElement to create elements and manage state
// const { useState } = React;

// const MyComponent = () => {
//   // State for the first textbox
//   const [firstText, setFirstText] = useState('');
  
//   // State for the second textbox (this will be updated based on the first one)
//   const [secondText, setSecondText] = useState('');

//   // Update the second textbox whenever the first one changes
//   const handleFirstTextChange = (e) => {
//     const newText = e.target.value;
//     setFirstText(newText);  // Update the first textbox state
//     setSecondText(newText); // Update the second textbox state
//   };

//   return React.createElement(
//     'div',
//     null,
//     React.createElement(
//       'input', 
//       {
//         type: 'text',
//         value: firstText, // Bind the value to the state
//         onChange: handleFirstTextChange, // Update the state when the first textbox changes
//       }
//     ),
//     React.createElement(
//       'input', 
//       {
//         type: 'text',
//         value: secondText, // Bind the value to the second textbox state
//         readOnly: true, // Make the second textbox read-only so the user can't change it
//       }
//     )
//   );
// };

// // Use React 18's createRoot API for rendering
// const root = ReactDOM.createRoot(document.getElementById('root'));

// // Render the component to the DOM using React 18's root.render
// root.render(React.createElement(MyComponent));
