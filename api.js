// import store from './store';
// import jQuery from 'jquery';
// import html from './index.html';


const BASE_URL = 'https://thinkful-list-api.herokuapp.com';
//function to handle the submit button
function handleSubmitButton() {
  $('#js-form').submit(event => {
    event.preventDefault();
    let newBookmark = $('.js-form').val();
    $('#js-results-list').empty();
    
    
  });
}
 
function displayResults (responseJson) {
    console.log(responseJson, typeof responseJson);

    for(let i = 0; i < responseJson.length; i++) {
        $('.results-list').append(`
        <p?${i+1}.${response.Json[i].name}</p>
        <a href="">${responseJson[i].url}
        <p>${responseJson[i].description}</p>`);
    }
}


$(handleSubmitButton);


// const handleNewItemSubmit = function() {
//     $('#js-bookmarks-form').submit(function(event) {
//         event.preventDefault();
//         const newBookmark = $('.js-bookmarks-entry').val();
//         $('js-bookmarks-entry').val('');
//         store.addItem(newBookmark);
//         render();

//     })
// }
// const render = function() {
//     let items = [...store.bookmarks];
// }
// const getBookmarks = function() {
//     return function (`${url}/' '`);
// };

// // const api.getBookmarks() {
// //     store.addBookmark()
// // };



// //user will be able to add a new bookmark
// //bookmark should include title, url, description, rating

// //functions working with store in store.js, api in api.js and so on

// //user can see a list of their bookmarks when they first open the app
// //list defaults to condensed view showing only title and rating
// const bookmarkList() = function() {
    

// };

// //click a bookmark to display the detailed view
// //expands to also display description and "Visit Site" link
// const detailedBookmarks = function () {

// }


// const addBookmark = function(title) {
//      return  {
//         title: "", required;
//         url: "", required;
//         description: "",
//         rating: 1 - 5

//     };

// }

// //use <select> element
// //user can select from dropdown a minimum rating to filter the list
// //by bookmarks rated at or above the chosen selection
// const dropdown() = function() {

// }

// //user can remove bookmark from bookmark list
// const deleteBookmark = function(id) {
    
//     }

// const fetchWrapper = function(...args) {
//     let error;
//     return fetch(...args) 
//     .then(resp => {
//         if(!resp.ok) {
//             error = {code: resp.status};
//         }
//         return resp

    })
}


// export default {

// }