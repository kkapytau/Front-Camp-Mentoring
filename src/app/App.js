import { API_KEY, YOUR_CHOICE } from '../constants/consts.js';
import NewsAPI from '../api/NewsAPI.js';
import '../styles/main.less';
import OptionItem from '../components/option/OptionItem.js';
import NewsItem from '../components/newBox/NewsItem.js';

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
      // remove "," from the Array of strings using join("")
      this.drawData('dropdown-menu', channelOptions.join(""));
      this.showNews('dropdown-menu');
    });
  }

  drawData(elemClass, data, removeIndicator) {
    let elem = document.getElementsByClassName(elemClass)[0];
    elem.innerHTML = data;
    if(removeIndicator) {
      elem.classList.remove('hidden');
    }
  }

  showNews(targetClass) {
    document.getElementsByClassName(targetClass)[0].addEventListener("click",(e) =>{
      e.preventDefault();
      const target = e.target;
      let news = this.api.getNews(target.getAttribute("data-channel-id"));
      news.then(data => {
        const newsData = data.articles.map(item => {
          return NewsItem(item);
        });
        // remove "," from the Array of strings using join("")
        this.drawData('news', newsData.join(""));
      });

      this.drawData('channel-title', `${YOUR_CHOICE} «${target.innerHTML}»`, true);
    });
  }

}

const app = new NewsApp();

app.drawChannels();
