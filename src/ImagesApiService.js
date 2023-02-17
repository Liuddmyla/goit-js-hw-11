import axios from "axios";

export default class ImagesApiService{
    constructor() {
        this.page = 1;
        this.query = '';
        this.per_page = 40;
    }

    async getImages(query) {
        
        const URL = `https://pixabay.com/api/?key=33641920-b059883ebd7147c979fd953b4&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;

        const response = await axios.get(URL);
        this.nextPage();
        return response.data;
        
    }

    nextPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}