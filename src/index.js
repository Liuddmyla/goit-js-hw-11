
import './css/styles.css';
import ImagesApiService from './ImagesApiService.js';
import LoadMoreBtn from './LoadMoreBtn.js';
import Notiflix from 'notiflix';

const form = document.getElementById('search-form'); 
const gallery = document.querySelector('.gallery');


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

    imagesApiService.query = value;

    if (value === '') {
      gallery.innerHTML = '';     
      return;
    }
  
    loadMoreBtn.show();

  fetchImages().finally(()=> form.reset());
}

async function fetchImages() {

  loadMoreBtn.disable();

  try { 
    const data = await imagesApiService.getImages();
    if (data.hits.length === 0) throw new Error(Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."));

    createMarkup(data.hits);

    loadMoreBtn.enable();

    const totalPages = Math.ceil(data.totalHits / imagesApiService.per_page);
    
      if (imagesApiService.page === totalPages) {
      loadMoreBtn.hide();
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      } 

  }
  catch (err) {
    onError();
  }  
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



