
const newBookmarkMade = function(){
    return `
    <form id="js-form">
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
            </form>
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

function handleDeleteButton() {
    //watch for click on button | jquery event listener
    $('main').on('click', '.submitButton', event => {
        event.preventDefault();
        this.${store.bookmarks}.find(currentItem => currentItem.id === id);
        },
    
    //stop event default        | event.preventDefault()
    //find the id fo the item clicked   | fall findIdOfElement function, here in bookmarks.js
    //call on the api.deleteitem        | call a function that in the api module
    //wait for the response             | .then(etc...)
    //use same id to find the item in the store     | call a function in store.js that finds the item and resturns it
    //remove item from the store                    | call afunction in store.js that deltes item from store
    //rerender the page (shows all the imtes on the page)      | call a function here in bookmarks.js to re-render the page
}

function handleSubmitButton() {
    $('main').on('click', '.submitButton', event => {
      event.preventDefault();
      let newBookmark = $('.js-form').val();
      console.log(newBookmark)
      $('main').html(listAllBookmarks());
      store.store.adding = false;
      render()
    });
}

const render = function() {
    $()
    if(adding === false) {
        return newBookmarkMade();
    } else (!adding === false ); {
        return ListAllBookmarks();
    }
//ccheck if adding
//if adding, call newBookMarkMade()
//if !adding, call listAllBookmarks()
}




export default{
 listAllBookmarks,
 handleSubmitButton   
}