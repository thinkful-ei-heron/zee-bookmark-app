const APIKEY = 'https://thinkful-list-api.herokuapp.com';
//function to handle the submit button
function handleSubmitButton() {
  $('#js-form').submit(event => {
    event.preventDefault();
    let value = parseInt($('#value').val());
    console.log(handleSubmitButton);
  });
}















// //file that initialize the app
// import jQuery form 'jquery';
// import store.js from './store.js';
// import api.js from './api.js';
// import main.css from './main.css';
// import 'normalize.css';


// function main() {
//     // getBookmarks.bindEventListeners();
//     // getBookmarks.render();
//     console.log('DOM is loaded');
  
//     // const startMsg = $('<p>Webpack is working!</p>');
//     //   $('#root').append(startMsg);
//     render();
//   }

//   $(main);