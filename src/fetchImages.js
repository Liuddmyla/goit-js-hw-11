
function fetchImages(query) {
    const URL = `https://pixabay.com/api/?key=33641920-b059883ebd7147c979fd953b4&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(URL).then(
        response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }
    )
}


export default fetchImages;

