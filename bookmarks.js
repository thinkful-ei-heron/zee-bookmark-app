import store from './store.js';
import api from './api.js';


const newBookmark = function () {
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
      </form> `;
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
    let newBookmark = {
      title: bookmarkData[0].value, url: bookmarkData[1].value, desc: bookmarkData[2].value,
      rating: bookmarkData[3].value
    };
    store.adding = false;
    api.createItem(newBookmark)
      .then(function (res) {
        store.addItem(res);
        render();
      }
      );

  });
}

const render = function () {
  $('main').html(`
    <button class='newBookmarkButton'>Add Bookmark</button>
    <section id="results-list" class="js-results-list"></section>
  `);
  
  $('main').on('click', '.newBookmarkButton', function (event) {
 
    $('main').html(newBookmark());
  });
  api.getItem()
    .then(function (response) {
      response.forEach(bookmark => {
        store.addItem(bookmark);
      });

      displayResults(store.bookmarks);

    }).catch(function (error) {
    });
};

function generateCondensedBookmark(bookmark) {
  console.log('cond')
  return `
    <div class='condensed-view'> 
        <p class='title' id='${bookmark.id}'>Title: ${bookmark.title}</p>
        <p>Rating: ${bookmark.rating}</p>
    </div>
    `;
}
function generateExpandBookmark(bookmark) {
  console.log('exp')
  return `
    <div class='expanded-view'>
      <p class='title' id='${bookmark.id}''>Title: ${bookmark.title}</p>
      <p>Rating: ${bookmark.rating}</p>
      <div id='expanded-${bookmark.id}'>
        <p>Link: <a href="">${bookmark.url}</a>
          <button class='visit-site-button' id='${bookmark.id}'>Visit Site</button> 
        </p>
        <p>Description: ${bookmark.desc}</p>
        <button class='delete-button' id='${bookmark.id}'>Delete</button>
      </div>
    </div>`;
}

function handleToggle() {
  $('main').on('click', '.title', function (event) {
    store.toggleItem(event.currentTarget.id);
  });
}    

function displayResults(bookmarks) {
  console.log('bookmarks: ', bookmarks);
  bookmarks.forEach(bookmark => {
    if (bookmark.expanded === false) {
      $('#results-list').append(generateCondensedBookmark(bookmark));
    }
    else {
      $('#results-list').append(generateExpandedBookmark(bookmark));
    }
    
const deleteBookmark = function(bookmar) {
  $('main').on('click', 'delete-button', function (event) {
    // event.stopPropagation();
    // event.stopImmediatePropagation();
    api.deleteItem(event.target.id)
      .then(function (res) {
        render();
      });
    });
}
    
 
export default {
  handleSubmitButton,
  handleToggle,
  deleteBookmark,
  render
};