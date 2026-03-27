// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com';

// const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
// console.log(API_KEY);

// export async function getImagesByQuery(query, page) {
//   const response = await axios.get('/api/', {
//     params: {
//       key: API_KEY,
//       q: query,
//       page: page,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: 15,
//     },
//   });
//   return response.data;
// }

import axios from 'axios';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  if (!API_KEY) {
    throw new Error('API key is missing! Check .env and prefix VITE_');
  }

  const response = await axios.get(BASE_URL, {
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
