import '../css/gallery.css';
import '../css/pagination.css';
import { getPagination } from './pagination.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.js-gallery');
const loaderElem = document.querySelector('.loader');
const paginationElem = document.querySelector('.js-pagination');

const lightbox = new SimpleLightbox('.js-gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const galleryMarkup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
  </a>

  <div class="info">
    <p class="info-item"><b>Likes</b> ${likes}</p>
    <p class="info-item"><b>Views</b> ${views}</p>
    <p class="info-item"><b>Comments</b> ${comments}</p>
    <p class="info-item"><b>Downloads</b> ${downloads}</p>
  </div>
</li>`;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox.refresh();
}

// !================ pagination markup ================

export function renderPagination(currentPage, totalPages) {
  const pages = getPagination(currentPage, totalPages);

  const markup = pages
    .map(p => {
      if (p === '...') return `<span class="dots">...</span>`;
      return `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    })
    .join('');

  paginationElem.innerHTML = markup;
}

// !========================================================

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loaderElem.classList.add('is-visible');
}

export function hideLoader() {
  loaderElem.classList.remove('is-visible');
}

export function showPagination() {
  paginationElem.classList.remove('is-hidden');
}

export function hidePagination() {
  paginationElem.classList.add('is-hidden');
}
