import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap';
import { API_KEY, YOUR_CHOICE } from '../constants/consts.js';
//import NewsAPI from '../api/NewsAPI.js';
import ProxyNewsAPI from '../patterns/ProxyNewsAPI.js';
import Observer from '../patterns/EventObserver.js';
import { AddFakeNewStrategy, topFakeNew, bottomFakeNew } from '../patterns/Strategy.js';
import '../styles/main.less';
import OptionItem from '../components/option/OptionItem.js';
import removeNumbers from '../loader/removeNumberKeysFromJson.js';

/*
* Class NewsApp was rewritten for implementation Prototype Pattern
* */
function NewsApp(){
  //this.api = new NewsAPI(API_KEY); // now we use Proxy Api for common requests. Cache 1 hour for news
  this.api = new ProxyNewsAPI(API_KEY);
  this.channels = this.api.getNewsChannel();

  // just for observer
  this.newsList = [];
  this.observer = new Observer();

}

NewsApp.prototype = function() {

  const addFakeNew = function() {
    this.observer.subscribe((data) => {
      drawData('.news', data);
    });
    const fakeNewStrategy = new AddFakeNewStrategy();

    let fakeNewsCounter = 0;
    const item = this.api.getFakeNew();
    const newsItem = require("../components/newBox/NewsItem").default(item);

    $(".add-fake-news").eq(0).on("click",() => {
      (fakeNewsCounter % 2)? fakeNewStrategy.setStrategy(topFakeNew.bind(this, newsItem)) : fakeNewStrategy.setStrategy(bottomFakeNew.bind(this, newsItem));

      fakeNewStrategy.applyNewsStrategy();

      this.observer.broadcast(this.newsList);
      fakeNewsCounter++;
    });
  };

  const drawChannels = function() {
    this.channels.then(data => {
      const channelOptions = data.sources.map(item => {
        return OptionItem(item);
      });
      drawData('.dropdown-menu', channelOptions);
      this.showNews('.dropdown-menu');
    });
  };

  const drawData = function(elemClass, data, removeIndicator) {
    let elem = $(elemClass).eq(0).html('');
    elem.append(data);
    if(removeIndicator) {
      elem.removeClass('hidden');
    }
  };

  const showNews = function(targetClass) {
    $(targetClass).eq(0).on("click",(e) =>{
      e.preventDefault();
      const target = e.target;
      let news = this.api.getNews(target.getAttribute("data-channel-id"));

      $('.show-news').eq(0).on( "click", () => {
        require.ensure(['../components/newBox/NewsItem'], (require) => {
          const NewsItem = require("../components/newBox/NewsItem").default;
          news.then(data => {
            const newsData = data.articles.map(item => {
              return NewsItem(item);
            });
            // just for observer
            this.newsList = newsData;
            drawData('.news', newsData);
          });
        });
      });

      drawData('.channel-title', `${YOUR_CHOICE} «${target.innerHTML}»`, true);
    });
  };

  return {
    drawChannels,
    showNews,
    addFakeNew
  }

}();

const app = new NewsApp();

app.drawChannels();
app.addFakeNew();

removeNumbers();