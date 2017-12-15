import noIcon from '../../images/nopapernonews.jpg';
import { TODAY, NO_DESCRIPTION, NO_AUTHOR } from '../../constants/consts.js';
import './styles.less';

export default function NewsItem(props){
  const tmpArr = (props.publishedAt) ? props.publishedAt.replace('Z','').split('T') : [TODAY,'00:00:00'];
  return `<a href="${props.url}">
      <figure>
          <img src="${(props.urlToImage) ? props.urlToImage : noIcon}" alt="${props.title}">
          <figcaption>
              <span class="title">${props.title}</span>
              <span class="description">${(props.description) ? props.description : NO_DESCRIPTION }</span>
              <span class="date">${tmpArr[0]} at ${tmpArr[1]}</span>
              <span class="author">${(props.author) ? props.author : NO_AUTHOR}</span>
          </figcaption>
      </figure>
  </a>`;
}
