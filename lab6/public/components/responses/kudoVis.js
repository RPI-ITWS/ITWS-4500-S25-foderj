/*Responsible for Curating html for a kudo visualization response of all the data */


// const fs = require('fs'); //importing file system module 
// import data from './congDocs.json';



const KudoLineChart = () => {
   return React.createElement(
      'div', // Parent element
      null, // No additional properties for the div
      [
        React.createElement('img', {
          key: 'image', // Add a key to the image for React's virtual DOM
         //  src: 'node/img5.png', // Path to the image
          //local
          src: 'img5.png', // Path to the image
          alt: 'Kudos Line Chart', // Alt text for accessibility
          width: '70%' // Optional styling to make the image responsive
        })
      ]
    );
};

export default KudoLineChart;

