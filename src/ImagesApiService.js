import Notiflix from 'notiflix';

export default class ImagesApiService{
    constructor() {
        this.page = 1;
        this.query = '';
    }

    getImages(query) {
        const URL = `https://pixabay.com/api/?key=33641920-b059883ebd7147c979fd953b4&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        return fetch(URL).then(
            response => {
                if (!response.ok) {
                   throw new Error(Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."));
                }
            return response.json();
            }
        ).then(({ hits }) => {
            this.nextPage();
            return hits;
        })
    }

    nextPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}