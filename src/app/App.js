import { API_KEY } from '../constants/consts.js';
import NewsAPI from '../api/NewsAPI.js';

class NewsApp {
  constructor(){
    this.api = new NewsAPI(API_KEY);
    this.channels = this.api.getNewsChannel();
  }

  drawChannels() {
    this.channels.then(data => {
      const channelOptions = data.sources.map(item => {
        return `<li><a data-channel-id="${item.id}" href="${item.url}">${item.name}</a></li>`;
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
          const tmpArr = (item.publishedAt) ? item.publishedAt.replace('Z','').split('T') : ['Today','00:00:00'];
          return `<a href="${item.url}">
            <figure>
                <img src="${(item.urlToImage) ? item.urlToImage : './images/nopapernonews.jpg'}" alt="${item.title}">
                <figcaption>
                    <span class="title">${item.title}</span>
                    <span class="description">${item.description}</span>
                    <span class="date">${tmpArr[0]} at ${tmpArr[1]}</span>
                    <span class="author">${item.author}</span>
                </figcaption>
            </figure>
        </a>`;
        });
        // remove "," from the Array of strings using join("")
        this.drawData('news', newsData.join(""));
      });

      this.drawData('channel-title', `Your choice is channel: «${target.innerHTML}»`, true);
    });
  }

}

const app = new NewsApp();

app.drawChannels();
