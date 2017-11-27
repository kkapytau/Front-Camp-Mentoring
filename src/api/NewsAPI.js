class NewsAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  getNewsChannel(){
    const apiKey = this.apiKey;
    return new Promise((resolve, reject) => {
      try {
        $.ajax({
          url: "https://newsapi.org/v2/sources?language=en&country=us",
          data: {
            apiKey
          },
          dataType: 'json',
          success: resp => {
            resolve(resp);
          }
        });
      }
      catch (e) {
        reject(e)
      }
    });
  };
  getNews(sources){
    const apiKey = this.apiKey;
    return new Promise((resolve, reject) => {
      try {
        $.ajax({
          url: "https://newsapi.org/v2/top-headlines",
          data: {
            apiKey,
            sources
          },
          dataType: 'json',
          success: resp => {
            resolve(resp);
          }
        });
      }
      catch (e) {
        reject(e)
      }
    });
  };
}