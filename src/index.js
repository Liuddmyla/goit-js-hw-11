import './css/styles.css';
import fetchImages from './fetchImages';
import Notiflix from 'notiflix';


const form = document.getElementById('search-form'); 
const gallery = document.querySelector('.gallery');


form.addEventListener('submit', onInput);

function onInput(e) {   
    e.preventDefault();  
    gallery.innerHTML = '';
    const value = e.currentTarget.elements.searchQuery.value.trim();

       if (value === '') {
           gallery.innerHTML = '';
           return;
    }

    fetchImages(value).then(({hits}) => {
        if (hits.length === 0) {
           Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
       }
        
        createMarkup(hits);
       
    }).catch((err)=> console.log("Error!"));
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


