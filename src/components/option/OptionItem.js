export default function OptionItem(props){
  return `<a class="dropdown-item" data-channel-id="${props.id}" href="${props.url}">${props.name}</a>`;
}