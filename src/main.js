import './css/css-loader.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formElem: document.querySelector('.js-form'),
  loadMoreBtn: document.querySelector('.js-load-more'),
};

const PER_PAGE = 15;

let page = 1;
let currentQuery = '';
let totalPages = 0;

//! ============= event ==========================
refs.formElem.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const query = formData.get('search-text').trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
      icon: false,
    });
    return;
  }

  currentQuery = query;
  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    totalPages = Math.ceil(data.totalHits / PER_PAGE);

    if (!data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        color: '#98a8d4ff',
        icon: false,
      });
      return;
    }

    createGallery(data.hits);

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    showLoadMoreButton();
  } catch {
    iziToast.error({
      message: 'Error fetching images. Please try again later.',
      position: 'topRight',
      icon: false,
    });
  } finally {
    hideLoader();
  }

  refs.formElem.reset();
});

// !============= btn load more ==========================

refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    // ================= scroll========================
    const elem = document.querySelector('.gallery-item:last-child');
    if (elem) {
      const cardHeight = elem.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
    // =====================================================

    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({
      message: 'Error fetching more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
