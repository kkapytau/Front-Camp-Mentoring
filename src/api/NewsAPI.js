import Promise from 'promise-polyfill';
import setAsap from 'setasap';

import { GET_NEWS_URL, GET_NEWS_CHANNEL_URL } from '../constants/consts.js';

export default class NewsAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    Promise._immediateFn = setAsap;
  }
  getNewsChannel(){
    const apiKey = this.apiKey;
    return new Promise((resolve, reject) => {
      const ajax = new XMLHttpRequest();
      try {
        ajax.open("GET", `${GET_NEWS_CHANNEL_URL}&apiKey=${apiKey}`, true);
        ajax.send();
        ajax.onreadystatechange = () => {
          if (ajax.readyState == 4 && ajax.status == 200) {
            resolve(JSON.parse(ajax.responseText));
          }
        };
      }
      catch (e) {
        reject(e)
      }
    });
  };
  getNews(sources){
    const apiKey = this.apiKey;
    return new Promise((resolve, reject) => {
      const ajax = new XMLHttpRequest();
      try {
        ajax.open("GET", `${GET_NEWS_URL}=${sources}&apiKey=${apiKey}`, true);
        ajax.send();
        ajax.onreadystatechange = () => {
          if (ajax.readyState == 4 && ajax.status == 200) {
            resolve(JSON.parse(ajax.responseText));
          }
        };
      }
      catch (e) {
        reject(e)
      }
    });
  };
}