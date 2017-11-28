class NewsAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
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