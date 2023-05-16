const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35061241-cc64e28d246336ea3caedb193'

export const imagesApi = (text, page) => {
   return fetch(`${BASE_URL}?q=${text}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json())
}