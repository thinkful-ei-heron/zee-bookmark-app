import store from './store.js';
import api from './api.js';


const newBookmark = function () {
  return `
  <h1>Bookmark Saver</h1>
    <form id="js-form" class="js-bookmark-list">
     <h3>Title:</h3>
          <label for="bookmarks-title"></label>
          <input 
              type="text" 
              name="bookmarks-title"
              class="js-bookmarks-title"
              placeholder="e.g. Google" required
          />
      <h3>Website:</h3>
          <label for="bookmarks-url"></label>
          <input
              type="url"
              name="bookmarks-url"
              class="js-bookmarks-url"
              placeholder="e.g. https://www.google.com" required
          />
      <h3>Description:</h3>
          <label for="bookmarks-description"></label>
          <input
              type="text"
              name="bookmarks-description"
              class="js-bookmarks-description"
              placeholder="e.g. Search Engine"
          />
          <h3>Rating:</h3>
      <select id="bookmarks-rating" name="rating">
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
      </select> 
      <p></p>
          <button type="submit" class="submitButton">Submit</button>
    </form> `;
};

const filterBookmark = function () {
  return `
  <form id="js-filter" class="js-bookmark-filter">
  <legend> Rating: </legend>
  <select id="bookmarks-filter" name="rating">
          <option value="5" ${parseInt(store.filter) === 5 ? 'selected' : ''}>5</option>
          <option value="4" ${parseInt(store.filter) === 4 ? 'selected' : ''}>4</option>
          <option value="3" ${parseInt(store.filter) === 3 ? 'selected' : ''}>3</option>
          <option value="2" ${parseInt(store.filter) === 2 ? 'selected' : ''}>2</option>
          <option value="1" ${parseInt(store.filter) === 1 ? 'selected' : ''}>1</option>
  </select>
  </form> `;
};
function handleFilterButton() {
  $('main').on('submit', '#js-filter', event => {
    event.preventDefault();
    const rating = event.target.rating.value;
    const number = parseInt(rating);
    // store.setFilter(number);
    render();
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

function handleSubmitButton() {
  $('main').on('submit', '#js-form', event => {
    event.preventDefault();
    const bookmarkData = $('#js-form').serializeArray();
    let newBookmark = {
      title: bookmarkData[0].value, url: bookmarkData[1].value, desc: bookmarkData[2].value,
      rating: bookmarkData[3].value
    };
    this.adding = false;
    api.createItem(newBookmark)
      .then(function (res) {
        store.addItem(res);
        console.log(res);
        render();
      }
      );
  });
}

const render = function () {
  $('main').html(`
   <h1>Bookmark Saver</h1>
   <button class='newBookmarkButton'>Add Bookmark</button>
      ${filterBookmark()}
    <section id="results-list" class="js-results-list"></section>
  `);

  $('main').on('click', '.newBookmarkButton',
    function (event) {

      $('main').html(newBookmark());
    });

  $('main').on('change', '#bookmarks-filter',
    function (event) {
      const value = $(this).val();
      store.setFilter(value);
      render();
      console.log($(this).val());
    });

  displayResults(store.bookmarks);
};

function getBookmarks() {
  api.getItem()
    .then(function (response) {
      response.forEach(bookmark => {
        store.addItem(bookmark);
      });

      displayResults(store.bookmarks);

    }).catch(function (error) {
    });
}

function generateCondensedBookmark(bookmark) {
  console.log('cond');
  return `
    <div class='condensed-view'> 
        <p class='title' id='${bookmark.id}'>Title: ${bookmark.title}</p>
        <p>Rating: ${bookmark.rating}</p>
    </div>
    `;
}

function generateExpandBookmark(bookmark) {
  console.log('exp');
  return `
    <div class='expanded-view'>
      <p class='title' id='${bookmark.id}'>Title: ${bookmark.title}</p>
      <p>Rating: ${bookmark.rating}</p>
      <div id='expanded-${bookmark.id}'>
        <p>Link: 
          <button type='url'<a href="">${bookmark.url}</a> 
          class='visit-site-button' id='${bookmark.id}'>Visit Site</button> 
        </p>
        <p>Description: ${bookmark.desc}</p>
        <button class='delete-button' id='${bookmark.id}'>Delete</button>
      </div>
    </div>`;
}

function handleToggle() {
  $('main').on('click', '.title', function (event) {
    store.toggleItem(event.currentTarget.id);
    render();
  });
}

// function handleFilterRatings() {
//   $('#js-form').on('change', '.filter', function () {
//     let filter = parseInt($(this).val(), 10);
//     bookmarks.filterBookmarks(filter);
//     render();
//   });
// }

function displayResults(bookmarks) {
  console.log('bookmarks:', bookmarks);
  bookmarks.forEach(bookmark => {
    if (bookmark.rating < store.filter) {
      return;
    }
    if (bookmark.expanded === false) {
      $('#results-list').append(generateCondensedBookmark(bookmark));
    }
    else {
      $('#results-list').append(generateExpandBookmark(bookmark));
    }
  });
}

const handleDeleteBookmark = function () {
  $('main').on('click', '.delete-button', function (event) {
    // event.stopPropagation();
    // event.stopImmediatePropagation();
    api.deleteItem(event.currentTarget.id)
      .then(function (res) {
        store.findAndDelete(event.currentTarget.id);
        render();
      });
  });
};

export default {
  handleSubmitButton,
  handleToggle,
  getBookmarks,
  handleDeleteBookmark,
  handleFilterButton,
  render
};