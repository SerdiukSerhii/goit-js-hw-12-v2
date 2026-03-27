import{S,i as l}from"./assets/vendor-BrddEoy-.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();async function g(n,i=1){throw new Error("API key is missing! Check .env and prefix VITE_")}const d=document.querySelector(".js-gallery"),p=document.querySelector(".loader"),m=document.querySelector(".js-pagination"),$=new S(".js-gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function h(n){const i=n.map(({webformatURL:t,largeImageURL:o,tags:e,likes:r,views:a,comments:P,downloads:q})=>`
<li class="gallery-item">
  <a class="gallery-link" href="${o}">
    <img class="gallery-image"
      src="${t}"
      alt="${e}"
    />
  </a>

  <div class="info">
    <p class="info-item"><b>Likes</b> ${r}</p>
    <p class="info-item"><b>Views</b> ${a}</p>
    <p class="info-item"><b>Comments</b> ${P}</p>
    <p class="info-item"><b>Downloads</b> ${q}</p>
  </div>
</li>`).join("");d.insertAdjacentHTML("beforeend",i),$.refresh()}function y(){d.innerHTML=""}function b(){p.classList.add("is-visible")}function L(){p.classList.remove("is-visible")}function v(){m.classList.remove("is-hidden")}function E(){m.classList.add("is-hidden")}const c={formElem:document.querySelector(".js-form"),paginationContainer:document.querySelector(".js-pagination")},j=15;let s=1,f="",u=0;//! =========== Pagination helper functions ===========
function M(n,i){const t=[],e=Math.max(2,n-1),r=Math.min(i-1,n+1);t.push(1),e>2&&t.push("...");for(let a=e;a<=r;a++)t.push(a);return r<i-1&&t.push("..."),i>1&&t.push(i),t}function w(n,i){const o=M(n,i).map(e=>e==="..."?'<span class="dots">...</span>':`<button class="page-btn ${e===n?"active":""}" data-page="${e}">${e}</button>`).join("");c.paginationContainer.innerHTML=o,console.log(c.paginationContainer)}//!===========================================================
//! ============= submit ======================================
c.formElem.addEventListener("submit",async n=>{n.preventDefault();const t=new FormData(n.currentTarget).get("search-text").trim();if(!t){l.error({message:"Please enter a search query!",position:"topRight",icon:!1});return}f=t,s=1,y(),E(),b();try{const o=await g(f,s);if(u=Math.ceil(o.totalHits/j),!o.hits.length){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#98a8d4ff",icon:!1}),c.paginationContainer.innerHTML="";return}if(h(o.hits),w(s,u),v(),s>=u){l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}}catch{l.error({message:"Error fetching images. Please try again later.",position:"topRight",icon:!1})}finally{L()}c.formElem.reset()});//! =========== Click on pagination ===========
c.paginationContainer.addEventListener("click",async n=>{if(!n.target.classList.contains("page-btn"))return;s=Number(n.target.dataset.page),y(),E(),b();try{const t=await g(f,s);h(t.hits),w(s,u),v(),document.querySelector(".js-gallery").scrollIntoView({behavior:"smooth",block:"start"})}catch{l.error({message:"Error loading page",position:"topRight"})}finally{L()}});
//# sourceMappingURL=index.js.map
