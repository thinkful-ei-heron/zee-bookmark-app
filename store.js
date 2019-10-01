const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 

  ];

  const adding = false;
  const error = null;
  const filter = 0;


const addItem = function(name) {
  try {
    item.validateName(name);
    this.items.push(item.create(name));
  } catch (e) {
    console.log(e.message)
  }
};

const findById = function(id) {
  return this.items.find(currentItem => currentItem.id === id);
}

const findAndDelete = function(id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
}

const findAndUpdate = function(id, name) {
  let currentItem = this.findById(id);
  Object.assign(currentItem, name);
}

const resetError = function() {
  this.error = null;
}

export default {
  bookmarks,
  addItem,
  findAndDelete,
  findAndUpdate,
  error,
  resetError,
  
}