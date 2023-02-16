
import './css/styles.css';
import ImagesApiService from './ImagesApiService.js';
import LoadMoreBtn from './LoadMoreBtn.js';
import Notiflix from 'notiflix';


const form = document.getElementById('search-form'); 
const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: ".load-more",
  isHidden: true
});


form.addEventListener('submit', onInput);
loadMoreBtn.button.addEventListener('click', fetchImages);

function onInput(e) {   
    e.preventDefault();      
    const value = e.currentTarget.elements.searchQuery.value.trim();
 
    imagesApiService.resetPage();  
    clearImages();
    loadMoreBtn.show();

    imagesApiService.query = value;

       if (value === '') {
           gallery.innerHTML = '';
           return;
       }

   fetchImages().finally(()=> form.reset());
}

function fetchImages() {

  loadMoreBtn.disable();

  return imagesApiService.getImages().then((data) => {
    if (data.hits.length === 0) throw new Error(Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."));
       
    createMarkup(data.hits);

    const totalPages = Math.ceil(data.totalHits / imagesApiService.per_page);

    if (imagesApiService.page === totalPages) {
      loadMoreBtn.hide();
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.show();
    }

    console.log(data);

    loadMoreBtn.enable();
       
  }).catch(onError);
}

function createMarkup(hits) {    
    const markup = hits.reduce((markup, { webformatURL, tags, likes, views, comments, downloads}) => {

    return `<div class="photo-card">
  <img class="img-card" src="${webformatURL}" alt="${tags}" width='320' loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div> ` + markup }, '');
    
  gallery.insertAdjacentHTML('beforeend', markup);
  
}

function clearImages() {
  gallery.innerHTML = '';
}

function onError(err) {
  loadMoreBtn.hide();
}



