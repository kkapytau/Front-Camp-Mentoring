import noIcon from '../../images/nopapernonews.jpg';
import { TODAY, NO_DESCRIPTION, NO_AUTHOR } from '../../constants/consts.js';
import './styles.less';

export default function NewsItem(props){
  const item = ItemDecorator(props);
  return `<a href="${item.url}">
      <figure>
          <img src="${item.imageUrl}" alt="${item.title}">
          <figcaption>
              <span class="title">${item.title}</span>
              <span class="description">${item.description}</span>
              <span class="date">${item.date[0]} at ${item.date[1]}</span>
              <span class="author">${item.author}</span>
          </figcaption>
      </figure>
  </a>`;
}

function ItemDecorator(item){
  let newItem = {...item};
  newItem.date = (item.publishedAt) ? item.publishedAt.replace('Z','').split('T') : [TODAY,'00:00:00'];
  const plusPosition = newItem.date[1].indexOf("+");
  if(plusPosition !== -1){
    newItem.date[1] = newItem.date[1].substring(0, plusPosition);
  }
  newItem.imageUrl = (item.urlToImage) ? item.urlToImage : noIcon;
  newItem.description = (item.description) ? item.description : NO_DESCRIPTION;
  newItem.author = (item.author) ? item.author : NO_AUTHOR;
  return newItem;
}