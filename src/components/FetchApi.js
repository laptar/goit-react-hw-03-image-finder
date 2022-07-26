const API_KEY = '28350803-646ac60833af8cee69618d9eb';
const perPage = 12;

function fetchImage(page = 1, searchImg = 'cat') {
  return fetch(
    `https://pixabay.com/api/?q=${searchImg}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(res => res.json());
}

export { fetchImage };
