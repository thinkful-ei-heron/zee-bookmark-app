import api from './api.js';
import store from './store.js';
import bookmarks from './bookmarks.js'

const main = function() {
  bookmarks.render();
  bookmarks.handleSubmitButton();    
};
// api.getItem();
$(main);