import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

const API_KEY = '55023581-b8ae6332fd3af068fbd1cd850';

export async function getImagesByQuery(query, page) {
  const response = await axios.get('/api/', {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
    },
  });
  return response.data;
}
