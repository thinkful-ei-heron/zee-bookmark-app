import store from './store.js';
import api from './api.js';


const newBookmark = function () {
  return `
  <h1>Bookmark Saver</h1>
    <form id="js-form" class="js-bookmark-list">
     <legend>Title:</legend>
          <label for="bookmarks-title"></label>
          <input 
              type="text" 
              name="bookmarks-title"
              class="js-bookmarks-title"
              placeholder="e.g. Google" required
          />
      <legend>Website:</legend>
          <label for="bookmarks-url"></label>
          <input
              type="url"
              name="bookmarks-url"
              class="js-bookmarks-url"
              placeholder="e.g. https://www.google.com" required
          />
      <legend>Description:</legend>
          <label for="bookmarks-description"></label>
          <input
              type="text"
              name="bookmarks-description"
              class="js-bookmarks-description"
              placeholder="e.g. Search Engine"
          />
      <select id="bookmarks-rating" name="rating">
      <legend>Rating:</legend>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
      </select>
          <button type="submit" class="submitButton">Submit</button>
      </form> `;
};

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
    this.adding = false;
    api.createItem(newBookmark)
      .then(function (res) {
        this.addItem(res);
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
        this.addItem(bookmark);
      });

      displayResults(this.bookmarks);

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
      <p class='title' id='${bookmark.id}'>Title: ${bookmark.title}</p>
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
    this.toggleItem(event.currentTarget.id);
  });
}    

const handleFilterRatings() = function () {
  $('#js-form').on('change', '.filter', function () {
    let filter = parseInt($(this).val(), 10);
    bookmarks.filterBookmarks(filter);
    render();
  });
};

function displayResults(bookmark) {
  console.log('bookmarks:', bookmark);
  bookmarks.forEach(bookmark => {
    if (bookmark.expanded === false) {
      $('#results-list').append(generateCondensedBookmark(bookmark));
    }
    else {
      $('#results-list').append(generateExpandedBookmark(bookmark));
    };
})
    
const deleteBookmark = function(bookmark) {
  $('main').on('click', '.delete-button', function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
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