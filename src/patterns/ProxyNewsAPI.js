import NewsAPI from '../api/NewsAPI.js';
import Cache from 'timed-cache';
import { CACHE_CHANNELS_TIME, CACHE_NEWS_TIME } from '../constants/consts.js';

export default class ProxyNewsAPI {
  constructor(apiKey) {
    this.api = new NewsAPI(apiKey);
    this.apiCacheChannels = new Cache({ defaultTtl: CACHE_CHANNELS_TIME });
    this.apiCacheNews = new Cache({ defaultTtl: CACHE_NEWS_TIME });
  };
  getFakeNew(){
    return this.api.getFakeNew();
  }
  getNewsChannel(){
    if (!(this.apiCacheChannels.get("channels"))) {
      this.apiCacheChannels.put("channels", this.api.getNewsChannel());
    }
    return this.apiCacheChannels.get("channels");
  };
  getNews(sources){
    if (!this.apiCacheNews.get(sources)) {
      this.apiCacheNews.put(sources, this.api.getNews(sources));
    }
    return this.apiCacheNews.get(sources);
  };
}