import { NewsStore } from './NewsStore.js';
import AppDispatcher from './AppDispatcher.js';
import { GET_NEWS_CHANNELS } from '../constants/consts.js';
import OptionItem from '../components/option/OptionItem.js';

// Define the newsList and newsChannels as an empty array
let _store = {
  channelsList: []
};

// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
class ChannelsStore extends NewsStore {

  constructor() {
    super();
  }

  getList() {
    return _store.channelsList;
  }

}

// Initialize the singleton to register with the
// dispatcher and export for React components
const channelsStore = new ChannelsStore();

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a change
AppDispatcher.register((payload) => {
  const action = payload.action;
  switch (action.actionType) {

    case GET_NEWS_CHANNELS:
      action.data.then(data => {
        _store.channelsList = data.sources.map(item => {
          return OptionItem(item);
        });
        channelsStore.emitChange();
      });
      break;

    default:
      return true;
  }

  return true;
});

export default channelsStore;