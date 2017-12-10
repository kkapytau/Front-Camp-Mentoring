export default function OptionItem(props){
  return `<li><a data-channel-id="${props.id}" href="${props.url}">${props.name}</a></li>`;
}