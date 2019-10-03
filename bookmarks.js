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
      <fieldset class="stars id="bookmarks-rating" name="rating">
        <div>
          <input class="star star-1" id="star-1" type="radio" name="rating" value="1" checked/>
          <label class="star star-1" for="star-1"><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i></label>
        </div>
        <div>
          <input class="star star-2" id="star-2" type="radio" name="rating" value="2"/>
          <label class="star star-2" for="star-2"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i></label>
        </div>
        <div>
          <input class="star star-3" id="star-3" type="radio" name="rating" value="3"/>
          <label class="star star-3" for="star-3"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i></label>
        </div>
        <div>
          <input class="star star-4" id="star-4" type="radio" name="rating" value="4"/>
          <label class="star star-4" for="star-4"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i></label>
        </div>
        <div>
          <input class="star star-5" id="star-5" type="radio" name="rating" value="5"/>
          <label class="star star-5" for="star-5"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></label> 
        </div>
      </fieldset>  
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
      <h2>Rating: ${bookmark.rating}</h2>
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

function handleToggle () {
  $('main').on('click', '.title', function (event) {
    this.toggleItem(event.currentTarget.id);
})   

function handleFilterRatings () {
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