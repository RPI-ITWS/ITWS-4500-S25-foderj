// 'use strict'; //catches mistakes
// import makeHeader from './components/header.js';
// import makeForm from './components/form.js';





// function insertElement(id, createFun){
//    const formNode = document.getElementById(id);
//    const formRoot = ReactDOM.createRoot(formNode);
//    formRoot.render(React.createElement(createFun)); 
// }

// window.addEventListener("load", function() {

//    insertElement('insHeader', makeHeader);
//    insertElement('insApiCaller', makeForm);
// })


// Using React.createElement to create elements and manage state
const { useState } = React;

const MyComponent = () => {
  const [text, setText] = useState('Original Text');

  const updateText = () => {
    // Update the state to change the text
    setText('Updated text with React.createElement!');
  };

  // Return the JSX-like structure using React.createElement
  return React.createElement(
    'div', 
    null,
    React.createElement('h1', null, text),
    React.createElement('button', { onClick: updateText }, 'Update Text')
  );
};

// Use React 18's createRoot API for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the component to the DOM using React 18's root.render
root.render(React.createElement(MyComponent));
