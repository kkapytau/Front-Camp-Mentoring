import AppDispatcher from './AppDispatcher.js';
import { GET_NEWS_CHANNELS, GET_SELECTED_NEWS } from '../constants/consts.js';

const newsActions = {
  // Get All News Channels
  getNewsChannels: function(channels) {
    AppDispatcher.handleAction({
      actionType: GET_NEWS_CHANNELS,
      data: channels
    });
  },

  // Get Selected News
  getSelectedNews: function(news) {
    AppDispatcher.handleAction({
      actionType: GET_SELECTED_NEWS,
      data: news
    });
  }
};

export default newsActions;