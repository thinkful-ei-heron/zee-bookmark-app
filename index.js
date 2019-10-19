import api from './api.js';
import store from './store.js';
import bookmarks from './bookmarks.js'



const main = function() {
  bookmarks.handleToggle();
  bookmarks.handleSubmitButton(); 
  bookmarks.getBookmarks();
  bookmarks.handleDeleteBookmark();
  bookmarks.handleFilterButton();
  // bookmarks.handleFilterRatings();
  bookmarks.render();  
};

$(main);