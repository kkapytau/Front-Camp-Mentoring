
const api = new NewsAPI("54c4b6ecb4394f91a1c3a7d88188cf26");

const channels = api.getNewsChannel();
channels.then(data => {
  const channelOptions = data.sources.map(item => {
    return `<li><a data-channel-id="${item.id}" href="${item.url}">${item.name}</a></li>`;
  });

  $(".dropdown-menu").eq(0).append(channelOptions.join(''));
});

$(".dropdown-menu").click((e) =>{
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

    $(".news").eq(0).html('').append(newsData.join(''));
  });

  $(".channel-title").removeClass("hidden").text(`Your choice is channel: «${target.innerHTML}»`);
});