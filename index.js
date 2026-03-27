import{a as p,S as $,i as l}from"./assets/vendor-BkC4bTqC.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=t(e);fetch(e.href,n)}})();p.defaults.baseURL="https://pixabay.com";const j="55023581-b8ae6332fd3af068fbd1cd850";async function d(a,r){return(await p.get("/api/",{params:{key:j,q:a,page:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15}})).data}const g=document.querySelector(".js-gallery"),m=document.querySelector(".loader"),h=document.querySelector(".js-pagination"),M=new $(".js-gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function y(a){const r=a.map(({webformatURL:t,largeImageURL:o,tags:e,likes:n,views:i,comments:w,downloads:S})=>`
<li class="gallery-item">
  <a class="gallery-link" href="${o}">
    <img class="gallery-image"
      src="${t}"
      alt="${e}"
    />
  </a>

  <div class="info">
    <p class="info-item"><b>Likes</b> ${n}</p>
    <p class="info-item"><b>Views</b> ${i}</p>
    <p class="info-item"><b>Comments</b> ${w}</p>
    <p class="info-item"><b>Downloads</b> ${S}</p>
  </div>
</li>`).join("");g.insertAdjacentHTML("beforeend",r),M.refresh()}function b(){g.innerHTML=""}function L(){m.classList.add("is-visible")}function v(){m.classList.remove("is-visible")}function E(){h.classList.remove("is-hidden")}function P(){h.classList.add("is-hidden")}const c={formElem:document.querySelector(".js-form"),paginationContainer:document.querySelector(".js-pagination")},C=15;let s=1,f="",u=0;//! =========== Pagination helper functions ===========
function D(a,r){const t=[],e=Math.max(2,a-1),n=Math.min(r-1,a+1);t.push(1),e>2&&t.push("...");for(let i=e;i<=n;i++)t.push(i);return n<r-1&&t.push("..."),r>1&&t.push(r),t}function q(a,r){const o=D(a,r).map(e=>e==="..."?'<span class="dots">...</span>':`<button class="page-btn ${e===a?"active":""}" data-page="${e}">${e}</button>`).join("");c.paginationContainer.innerHTML=o,console.log(c.paginationContainer)}//!===========================================================
//! ============= submit ======================================
c.formElem.addEventListener("submit",async a=>{a.preventDefault();const t=new FormData(a.currentTarget).get("search-text").trim();if(!t){l.error({message:"Please enter a search query!",position:"topRight",icon:!1});return}f=t,s=1,b(),P(),L();try{const o=await d(f,s);if(u=Math.ceil(o.totalHits/C),!o.hits.length){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#98a8d4ff",icon:!1}),c.paginationContainer.innerHTML="";return}if(y(o.hits),q(s,u),E(),s>=u){l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}}catch{l.error({message:"Error fetching images. Please try again later.",position:"topRight",icon:!1})}finally{v()}c.formElem.reset()});//! =========== Click on pagination ===========
c.paginationContainer.addEventListener("click",async a=>{if(!a.target.classList.contains("page-btn"))return;s=Number(a.target.dataset.page),b(),P(),L();try{const t=await d(f,s);y(t.hits),q(s,u),E(),document.querySelector(".js-gallery").scrollIntoView({behavior:"smooth",block:"start"})}catch{l.error({message:"Error loading page",position:"topRight"})}finally{v()}});
//# sourceMappingURL=index.js.map
