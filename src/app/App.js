import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap';
import { API_KEY, YOUR_CHOICE } from '../constants/consts.js';
//import NewsAPI from '../api/NewsAPI.js';
import ProxyNewsAPI from '../patterns/ProxyNewsAPI.js';
import Observer from '../patterns/EventObserver.js';
import { AddFakeNewStrategy, topFakeNew, bottomFakeNew } from '../patterns/Strategy.js';
import '../styles/main.less';
import removeNumbers from '../loader/removeNumberKeysFromJson.js';
// Flux
import newsActions from '../flux/NewsActionsCreator.js';
import newsStore from '../flux/NewsStore.js';
import channelsStore from '../flux/ChannelsStore.js';

/*
* Class NewsApp was rewritten for implementation Prototype Pattern
* */
function NewsApp(){
  //this.api = new NewsAPI(API_KEY); // now we use Proxy Api for common requests. Cache 1 hour for news
  this.api = new ProxyNewsAPI(API_KEY);

  channelsStore.addChangeListener(this.drawChannels.bind(this));
  //newsStore.addChangeListener(this.showNews.bind(this));

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

  const getChannels = function() {
    newsActions.getNewsChannels(this.api.getNewsChannel());
  };

  const drawChannels = function() {
    drawData('.dropdown-menu', channelsStore.getList());
    this.getNews('.dropdown-menu');
  };

  const getNews = function(targetClass) {
    $(targetClass).eq(0).on("click",(e) => {
      e.preventDefault();
      const target = e.target;

      newsActions.getSelectedNews(this.api.getNews(target.getAttribute("data-channel-id")));
      drawData('.channel-title', `${YOUR_CHOICE} «${target.innerHTML}»`, true);

    });
    this.showNews();
  };

  const drawData = function(elemClass, data, removeIndicator) {
    let elem = $(elemClass).eq(0).html('');
    elem.append(data);
    if(removeIndicator) {
      elem.removeClass('hidden');
    }
  };

  const showNews = function() {
    $('.show-news').eq(0).on( "click", () => {
      require.ensure(['../components/newBox/NewsItem'], () => {
        const newsData = newsStore.getList();

        // just for observer
        this.newsList = newsData;

        drawData('.news', newsData);
      });
    });
  };

  return {
    drawChannels,
    showNews,
    addFakeNew,
    getChannels,
    getNews
  }

}();

const app = new NewsApp();

app.getChannels();
app.addFakeNew();

removeNumbers();