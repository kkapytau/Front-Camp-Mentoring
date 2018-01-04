export const API_KEY = "54c4b6ecb4394f91a1c3a7d88188cf26";
export const GET_NEWS_URL = "https://newsapi.org/v2/top-headlines?sources";
export const GET_NEWS_CHANNEL_URL = "https://newsapi.org/v2/sources?language=en&country=us";
export const YOUR_CHOICE = "Your choice is channel:";
export const TODAY = "Today";
export const NO_DESCRIPTION = "No Description";
export const NO_AUTHOR = "No Author";
export const CACHE_CHANNELS_TIME = 1000 * 60 * 60 * 24; // 1 DAY
export const CACHE_NEWS_TIME = 1000 * 60 * 60 * 1; // 1 HOUR

// flux constants
export const GET_NEWS_CHANNELS = "GET_CHANNELS";
export const GET_SELECTED_NEWS = "GET_NEWS";
export const ADD_FAKE_NEW = "ADD_FAKE_NEW";
export const CHANGE_EVENT = 'change';

export default {
  API_KEY,
  GET_NEWS_URL,
  GET_NEWS_CHANNEL_URL,
  YOUR_CHOICE,
  TODAY,
  NO_DESCRIPTION,
  NO_AUTHOR,
  CACHE_CHANNELS_TIME,
  CACHE_NEWS_TIME,
  GET_NEWS_CHANNELS,
  GET_SELECTED_NEWS,
  ADD_FAKE_NEW,
  CHANGE_EVENT
}