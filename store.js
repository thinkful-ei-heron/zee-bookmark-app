const store = {
  // bookmarks: [
  //   {
  //     id: 'x56w',
  //     title: 'Title 1',
  //     rating: 3,
  //     url: 'http://www.title1.com',
  //     description: 'lorem ipsum dolor sit',
  //     expanded: false
  //   },
  //   {
  //     id: '6ffw',
  //     title: 'Title 2',
  //     rating: 5,
  //     url: 'http://www.title2.com',
  //     description: 'dolorum tempore deserunt',
  //     expanded: false
  //   }],
  // adding: false,
  // error: null,
  // filter: 0
};


const addItem = function (jsonResponseObj){ 
  try {

    const storeObj = { ...jsonResponseObj, expanded: false};
    this.bookmarks.push(storeObj);
  } catch (e) {
    console.log(e.message);
  }
};

const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id == id);
};

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const findAndUpdate = function(id, name) {
  let currentItem = this.findById(id);
  Object.assign(currentItem, name);
};

const toggleItem = function(id) {
  console.log(this);
  const currentItem = this.findById(id);
  console.log(currentItem);
  currentItem.expanded = !currentItem.expanded;
};

const resetError = function() {
  this.error = null;
};

const setFilter = function(rating) {
  this.filter = rating;
}

export default {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0,
  addItem,
  findById,
  findAndDelete,
  findAndUpdate,
  toggleItem,
  setFilter,
  resetError
};