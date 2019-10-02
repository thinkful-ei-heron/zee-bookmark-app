import render from './bookmarks.js';
import store from './store.js';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/zee';

const listUrlFetch = function(...args) {
  let error;
  return fetch(...args)
    .then(response => {
      if (!response.ok) {
        error = {code: response.status};
        if (!response.headers.get('content-type').includes('json')) {
          error.message = response.statusText;
          return Promise.reject(error);
        }
      }
      return response.json();
    })
    .then (data => {
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getItem = function() {
  return listUrlFetch(`${BASE_URL}/items`);
};

const createItem = function(name) {
  const newItem = JSON.stringify({name});
  return listUrlFetch(`${BASE_URL}/items`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newItem
    }); 
};

const updateItem = function(id, updateData) {
  const newData = JSON.stringify(updateData);
  return listUrlFetch(`${BASE_URL}/store/items`, {
    method: 'PATCH',
    hearders: {
      'Content-Type': 'application/json',
    },
    body: newData
  });
};

const deleteItem = function(id) {
  return listUrlFetch(BASE_URL + '/items/' + id, {
    method: 'DELETE'
  });
};

export default{
  getItem,
  createItem,
  updateItem,
  deleteItem
};


//THING TO DO HERE
//everything you do here affect the API/DB
//Create item in api using fetch
//Get items from api using fetch
//update item in api using fetch
//delete item in api using fetch






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



