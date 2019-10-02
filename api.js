import render from './bookmarks.js';
import store from './store.js';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/zee';

const listUrlFetch = function(...args) {
  let error;
  return fetch(...args)
    .then(response => {
      if (!response.ok) {
        error = {code: response.status};
        if (!response.headers.get('content-type').includes('json')) {
          error.message = response.statusText;
          return Promise.reject(error);
        }
      }
      return response.json();
    })
    .then (data => {
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getItem = function() {
  return listUrlFetch(`${BASE_URL}/bookmarks`);
};

const createItem = function(bookmark) {
  const newItem = JSON.stringify(bookmark);
  return listUrlFetch(`${BASE_URL}/bookmarks`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newItem
    }); 
};

const updateItem = function(id, updateData) {
  const newData = JSON.stringify(updateData);
  return listUrlFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    hearders: {
      'Content-Type': 'application/json',
    },
    body: newData
  });
};

const deleteItem = function(id) {
  return listUrlFetch(BASE_URL + '/bookmarks/' + id, {
    method: 'DELETE'
  });
};

export default{
  getItem,
  createItem,
  updateItem,
  deleteItem
};












