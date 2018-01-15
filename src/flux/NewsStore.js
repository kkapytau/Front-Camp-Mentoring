import EventEmitter from 'events';
import AppDispatcher from './AppDispatcher.js';
import constants from '../constants/consts.js';

// Define the newsList and newsChannels as an empty array
let _store = {
  newsList: []
};

// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
export class NewsStore extends EventEmitter {

  addChangeListener(cb) {
    this.on(constants.CHANGE_EVENT, cb);
  }

  emitChange() {
    this.emit(constants.CHANGE_EVENT);
  }

  removeChangeListener(cb) {
    this.removeListener(constants.CHANGE_EVENT, cb);
  }

  getList() {
    return _store.newsList;
  }

}

// Initialize the singleton to register with the
// dispatcher and export for React components
const newsStore = new NewsStore();

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a change
AppDispatcher.register((payload) => {
  const action = payload.action;
  switch (action.actionType) {

    case constants.GET_SELECTED_NEWS:
      const NewsItem = require("../components/newBox/NewsItem").default;
      action.data.then(data => {
        _store.newsList = data.articles.map(item => {
          return NewsItem(item);
        });
        newsStore.emitChange();
      });

    default:
      return true;
  }

  return true;
});

export default newsStore;