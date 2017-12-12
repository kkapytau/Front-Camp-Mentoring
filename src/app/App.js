import { API_KEY, YOUR_CHOICE } from '../constants/consts.js';
import NewsAPI from '../api/NewsAPI.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap';
import '../styles/main.less';
import OptionItem from '../components/option/OptionItem.js';

class NewsApp {
  constructor(){
    this.api = new NewsAPI(API_KEY);
    this.channels = this.api.getNewsChannel();
  }

  drawChannels() {
    this.channels.then(data => {
      const channelOptions = data.sources.map(item => {
        return OptionItem(item);
      });
      this.drawData('.dropdown-menu', channelOptions);
      this.showNews('.dropdown-menu');
    });
  }

  drawData(elemClass, data, removeIndicator) {
    let elem = $(elemClass).eq(0).html('');
    elem.append(data);
    if(removeIndicator) {
      elem.removeClass('hidden');
    }
  }

  showNews(targetClass) {
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
            this.drawData('.news', newsData);
          });
        });
      });

      this.drawData('.channel-title', `${YOUR_CHOICE} «${target.innerHTML}»`, true);
    });
  }

}

const app = new NewsApp();

app.drawChannels();
