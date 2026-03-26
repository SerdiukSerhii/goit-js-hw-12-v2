import './css/css-loader.css';
import './css/pagination.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
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

//! =========== Pagination helper functions ===========

function getPagination(currentPage, totalPages) {
  const pages = [];
  const delta = 1;
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);
  if (rangeStart > 2) pages.push('...');
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
  if (rangeEnd < totalPages - 1) pages.push('...');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

function renderPagination(currentPage, totalPages) {
  const pages = getPagination(currentPage, totalPages);

  const markup = pages
    .map(p => {
      if (p === '...') return `<span class="dots">...</span>`;
      return `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    })
    .join('');

  refs.paginationContainer.innerHTML = markup;
  console.log(refs.paginationContainer);
}

//!===========================================================

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
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);
    renderPagination(page, totalPages);

    document
      .querySelector('.js-gallery')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch {
    iziToast.error({ message: 'Error loading page', position: 'topRight' });
  } finally {
    hideLoader();
  }
});
