
const newBookmarkMade = function(){
  return `
    
    `
}

const createBookmarkElement = function() {
  return `
           
    `
}



const listAllBookmarks = function() {
  return `
    
    `;
};

// function handleDeleteButton() {
//     //watch for click on button | jquery event listener
//     $('main').on('click', '.submitButton', event => {
//         event.preventDefault();
//         this.${store.bookmarks}.find(currentItem => currentItem.id === id);
//         },
    
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
  $('main').on('click', '.submitButton', event => {
    //stop event default        | event.preventDefault()
    console.log(handleSubmitButton());
    event.preventDefault();
    
    let formElement = $('js-form')[0];
    $('main').html(listAllBookmarks());
    store.store.adding = false;
    // render()
  });
}

const render = function() {
  $('js-form').html()
  
//ccheck if adding
//if adding, call newBookMarkMade()
//if !adding, call listAllBookmarks()
}




export default{
  listAllBookmarks,
  handleSubmitButton   
}