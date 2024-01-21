import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BAZE_URL = 'https://pixabay.com/api';
const API_KEY = '41870399-9b44301246ceb98c07efd626a';

const refs = {
  searchForm: document.querySelector('.search-form'),
  photoList: document.querySelector('.photo-list'),
  loader: document.querySelector('.loader'),
};
refs.loader.style.display = 'none';
refs.searchForm.addEventListener('submit', handleSearch); // обробник подій на форму

function handleSearch(event) {
  event.preventDefault(); // скидуємо стандартну поведінку браузера
  // функція,яка описує обробник події  handleSearch
  refs.loader.style.display = 'inline-block';
  refs.photoList.innerHTML = ''; // очищаємо вміст галереї (перед здійсненням нового пошуку вміст
  // галереї очищаємо щоб уникнути переплутання результатів)
  const form = event.currentTarget;
  const query = form.elements.query.value; // дістаємо значення з форми
  // перевірка на пустий рядок запиту
  if (query === '') {
    iziToast.show({
      message: 'Please enter your request',
      position: 'topRight',
      color: 'yellow',
    });
    refs.loader.style.display = 'none';

    return;
  }
  searchPhoto(query)
    .then(createMarkuPhoto)
    .catch(err => console.log(err))
    .finally(() => form.reset());
  console.log(query);
}

// пишемо функцію для того щоб робити запит
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

function createMarkuPhoto({ hits }) {
  refs.loader.style.display = 'none';
  // перевірка на відсутність результатів від бекенду (якщо бекенд повертає порожній масив)
  if (hits.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    console.log(hits);
    return;
  }
  // створення розмітки
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
  // додаємо нові елементи до галереї
  refs.photoList.innerHTML = markup;
  // викликали метод бібліотеки SimpleLightbox
  refreshPage.refresh();
}

const refreshPage = new SimpleLightbox('.photo-list a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
