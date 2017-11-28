
const api = new NewsAPI(API_KEY);

const channels = api.getNewsChannel();
channels.then(data => {
  const channelOptions = data.sources.map(item => {
    return `<li><a data-channel-id="${item.id}" href="${item.url}">${item.name}</a></li>`;
  });
  // we use join, as channelOptions is array and result source will be with comma like: a1,a2,a3
  document.getElementsByClassName('dropdown-menu')[0].innerHTML = channelOptions.join("");
});

document.getElementsByClassName('dropdown-menu')[0].addEventListener("click",(e) =>{
  e.preventDefault();
  const target = e.target;
  let news = api.getNews(target.getAttribute("data-channel-id"));
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
    // remove "," from the result object using join("")
    document.getElementsByClassName('news')[0].innerHTML = newsData.join("");
  });

  let channelTitle = document.getElementsByClassName('channel-title')[0];
  channelTitle.classList.remove('hidden');
  channelTitle.innerHTML = `Your choice is channel: «${target.innerHTML}»`;

});