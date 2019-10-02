import store from './store.js';
import api from './api.js';


const newBookmark = function() {
  return `
  <h1>Bookmark Saver</h1>
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
    const bookmarkData = $('#js-form').serializeArray();
    let newBookmark = {title:bookmarkData[0].value, url:bookmarkData[1].value, desc:bookmarkData[2].value, 
      rating:bookmarkData[3].value};
    store.adding = false;
    api.createItem(newBookmark)
      .then(function () {
        render();
      }
      );
  
  });
}

const render = function() {
  $('main').html(`
    <button class='newBookmarkButton'>Add Bookmark</button>
    <section id="results-list" class="js-results-list"></section>
  `);
  $('.newBookmarkButton').on('click', function(event) {
    $('main').html(newBookmark());
  });
  api.getItem().then(function (response) {
    store.bookmarks = response;
    displayResults(store.bookmarks);
  }).catch(function(error) { 
  });
};
 
function displayResults (responseJson = []) {
  for(let i = 0; i < responseJson.length; i++) {
    let hidden;
    if(responseJson[i].condensed === true) {
      hidden = 'hidden';
    }
    $('#results-list').append(`
      <div class='condensed-view' id='condensed-${responseJson[i].id}'> 
        <p>${i+1}. Title: ${responseJson[i].title}</p>
        <p>Rating: ${responseJson[i].rating}</p>
      <div class='expanded-view' ${hidden} id='expanded-${responseJson[i].id}'>
        <p>Link: <a href="">${responseJson[i].url}</a>
        <button class='visit-site-button' id='${responseJson[i].id}'>Visit Site</button> 
        </p>
        <p>Description: ${responseJson[i].desc}</p>
        <button class='delete-button' id='${responseJson[i].id}'>Delete</button>
      </div>
      </div>
      `);

    $('.condensed-view').on('click', function(event) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      api.toggleItem(event.target.id)
        .then(function() {
          render();
        });
      //select all expanded views and give them the hidden attribute
      //event.currentTarget is the condensed div
      //we can get the id from that div
      //we can take a substring to get everything afte the dash
      //thats that bookmark id
      //with that bookmarks id we can add expanded-follwed by bookmark id
      //then update the elements with that id to remove
      //the hidden attributes
      
    });

    $('.delete-button').on('click', function(event) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      api.deleteItem(event.target.id)
        .then(function() {
          render();
        });
    });
  }
}

export default{
  handleSubmitButton,
  render   
};