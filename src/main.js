import './css/css-loader.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showPagination,
  hidePagination,
  renderPagination,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formElem: document.querySelector('.js-form'),
  paginationContainer: document.querySelector('.js-pagination'),
};

const PER_PAGE = 15;

let page = 1;
let currentQuery = '';
let totalPages = 0;

//! ============= submit ======================================

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
  hidePagination();
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

      refs.paginationContainer.innerHTML = '';

      return;
    }

    createGallery(data.hits);
    renderPagination(page, totalPages);
    showPagination();

    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }
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

//! =========== Click on pagination ===========
refs.paginationContainer.addEventListener('click', async e => {
  if (!e.target.classList.contains('page-btn')) return;

  const selectedPage = Number(e.target.dataset.page);
  page = selectedPage;
  clearGallery();
  hidePagination();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);
    renderPagination(page, totalPages);
    showPagination();

    document
      .querySelector('.js-gallery')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch {
    iziToast.error({ message: 'Error loading page', position: 'topRight' });
  } finally {
    hideLoader();
  }
});
