import{a as p,S as w,i as l}from"./assets/vendor-BkC4bTqC.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();p.defaults.baseURL="https://pixabay.com";const P="55023581-b8ae6332fd3af068fbd1cd850";async function g(r,a){return(await p.get("/api/",{params:{key:P,q:r,page:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15}})).data}const d=document.querySelector(".js-gallery"),m=document.querySelector(".loader"),S=new w(".js-gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function y(r){const a=r.map(({webformatURL:t,largeImageURL:n,tags:e,likes:o,views:s,comments:E,downloads:q})=>`
<li class="gallery-item">
  <a class="gallery-link" href="${n}">
    <img class="gallery-image"
      src="${t}"
      alt="${e}"
    />
  </a>

  <div class="info">
    <p class="info-item"><b>Likes</b> ${o}</p>
    <p class="info-item"><b>Views</b> ${s}</p>
    <p class="info-item"><b>Comments</b> ${E}</p>
    <p class="info-item"><b>Downloads</b> ${q}</p>
  </div>
</li>`).join("");d.insertAdjacentHTML("beforeend",a),S.refresh()}function h(){d.innerHTML=""}function b(){m.classList.add("is-visible")}function L(){m.classList.remove("is-visible")}const c={formElem:document.querySelector(".js-form"),paginationContainer:document.querySelector(".js-pagination")},$=15;let i=1,f="",u=0;//! =========== Pagination helper functions ===========
function M(r,a){const t=[],e=Math.max(2,r-1),o=Math.min(a-1,r+1);t.push(1),e>2&&t.push("...");for(let s=e;s<=o;s++)t.push(s);return o<a-1&&t.push("..."),a>1&&t.push(a),t}function v(r,a){const n=M(r,a).map(e=>e==="..."?'<span class="dots">...</span>':`<button class="page-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`).join("");c.paginationContainer.innerHTML=n,console.log(c.paginationContainer)}//!===========================================================
//! ============= submit ======================================
c.formElem.addEventListener("submit",async r=>{r.preventDefault();const t=new FormData(r.currentTarget).get("search-text").trim();if(!t){l.error({message:"Please enter a search query!",position:"topRight",icon:!1});return}f=t,i=1,h(),b();try{const n=await g(f,i);if(u=Math.ceil(n.totalHits/$),!n.hits.length){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#98a8d4ff",icon:!1}),c.paginationContainer.innerHTML="";return}if(y(n.hits),v(i,u),i>=u){l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}}catch{l.error({message:"Error fetching images. Please try again later.",position:"topRight",icon:!1})}finally{L()}c.formElem.reset()});//! =========== Click on pagination ===========
c.paginationContainer.addEventListener("click",async r=>{if(!r.target.classList.contains("page-btn"))return;i=Number(r.target.dataset.page),h(),b();try{const t=await g(f,i);y(t.hits),v(i,u),document.querySelector(".js-gallery").scrollIntoView({behavior:"smooth",block:"start"})}catch{l.error({message:"Error loading page",position:"topRight"})}finally{L()}});
//# sourceMappingURL=index.js.map
