import $ from 'jquery';
import store from './store.js';
import api from './api.js';

const newBookmark = function() {
  return `
  <form id="js-form" class="js-bookmark-list">
                <p>Title:</p>
                    <label for="bookmarks-title"></label>
                    <input 
                        type="text" 
                        name="bookmarks-title"
                        class="js-bookmarks-title"
                        placeholder="e.g. Google" required
                    />
                <p>Website:</p>
                    <label for="bookmarks-url"></label>
                    <input
                        type="url"
                        name="bookmarks-url"
                        class="js-bookmarks-url"
                        placeholder="e.g. https://www.google.com" required
                    />
                <p>Description:</p>
                    <label for="bookmarks-description"></label>
                    <input
                        type="text"
                        name="bookmarks-description"
                        class="js-bookmarks-description"
                        placeholder="e.g. Search Engine"
                    />
                <select id="bookmarks-rating" name="rating">
                <p>Rating:</p>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
                    <button type="submit" class="submitButton">Submit</button>
                </form> `
};

const createBookmarkElement = function() {
  return `
           
    `
}



const listAllBookmarks = function() {
  return `
  <p>
    
    `;
};

// function handleDeleteButton() {
//     //watch for click on button | jquery event listener
//     $('main').on('click', '.submitButton', event => {
//         event.preventDefault();
//         this.${store.bookmarks}.find(currentItem => currentItem.id === id);
//         },
    
//         //find the id fo the item clicked   | fall findIdOfElement function, here in bookmarks.js
//         //call on the api.deleteitem        | call a function that in the api module
//         //wait for the response             | .then(etc...)
//         //use same id to find the item in the store     | call a function in store.js that finds the item and resturns it
//         //remove item from the store                    | call afunction in store.js that deltes item from store
//         //rerender the page (shows all the imtes on the page)      | call a function here in bookmarks.js to re-render the page
//     }
    
function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}
    
function handleSubmitButton() {
  $('main').on('submit', event => {
    event.preventDefault();
    let newBookMark = $('js-form')[0];
    $('newBookMark').html('js-form');
    store.adding = false;
    console.log('submitButton works');
    // render()
  });
}

const render = function() {
  $('js-form').html()
  
//ccheck if adding
//if adding, call newBookMarkMade()
//if !adding, call listAllBookmarks()
}




// const enterNewBookmark('js-form') {
//     let allBookmark = `${BASE_URL}${'js-form}`;
//     console.log(allBookmark)`

// }
 
// function displayResults (responseJson) {
//   console.log(responseJson, typeof responseJson);

//   for(let i = 0; i < responseJson.length; i++) {
//     $('.results-list').append(`
//         <p?${i+1}.${response.Json[i].name}</p>
//         <a href="">${responseJson[i].url}
//         <p>${responseJson[i].description}</p>`);
//   }
// }





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
//make call to delet from bookmarks and call upon api module to remove record
//once receive response back then delete record out of store
//re-render
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

//    })
//}

export default{
  listAllBookmarks,
  handleSubmitButton   
}