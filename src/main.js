import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BAZE_URL = 'https://pixabay.com/api';
const API_KEY = '41870399-9b44301246ceb98c07efd626a';

const refs = {
  searchForm: document.querySelector('.search-form'),
  photoList: document.querySelector('.photo-list'),
};

refs.searchForm.addEventListener('submit', handleSearch); // обробник подій на форму
function handleSearch(event) {
  // функція яка описує обробник події
  event.preventDefault();
  const form = event.currentTarget;
  const query = form.elements.query.value; // дістаємо значення з форми

  searchPhoto(query)
    .then(createMarkuPhoto)
    .catch(onFetchError)
    .finally(() => form.reset());

  searchPhoto(query).then(data => {
    if (!data.hits.length || query === '') {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
  });
}

// пишемо функцію для того щоб робити сам запит
function searchPhoto(value) {
  return fetch(
    `${BAZE_URL}/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=9`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

// function searchPhoto(value) {
//   const urlParams = new URLSearchParams({
//     key: API_KEY,
//     q: value,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   });
// }
function onFetchError(error) {
  console.error(error);
}

function createMarkuPhoto({ hits }) {
  const markup = hits
    .map(
      hits => `<li class="gallery-item">
<a class="gallery-link" href="${hits.largeImageURL}">
<img class="gallery-image" ;
    src="${hits.webformatURL}"
    data-source="${hits.largeImageURL}"
   alt="${hits.tags}" />
   </a>
    <p>Likes: ${hits.likes}</p>
   <p>Views: ${hits.views}</p>
   <p>Comment: ${hits.comments}</p>
   <p>Downloads: ${hits.downloads}</p>
</li>`
    )
    .join('');

  refs.photoList.innerHTML = markup;
  refreshPage.refresh();
}

const refreshPage = new SimpleLightbox('.photo-list a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
