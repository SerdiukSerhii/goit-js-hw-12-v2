import{a as d,S as $,i as c}from"./assets/vendor-BkC4bTqC.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();d.defaults.baseURL="https://pixabay.com";const j="55023581-b8ae6332fd3af068fbd1cd850";async function g(r,a){return(await d.get("/api/",{params:{key:j,q:r,page:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15}})).data}function M(r,a){const t=[],e=Math.max(2,r-1),o=Math.min(a-1,r+1);t.push(1),e>2&&t.push("...");for(let n=e;n<=o;n++)t.push(n);return o<a-1&&t.push("..."),a>1&&t.push(a),t}const m=document.querySelector(".js-gallery"),h=document.querySelector(".loader"),p=document.querySelector(".js-pagination"),D=new $(".js-gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function y(r){const a=r.map(({webformatURL:t,largeImageURL:s,tags:e,likes:o,views:n,comments:w,downloads:S})=>`
<li class="gallery-item">
  <a class="gallery-link" href="${s}">
    <img class="gallery-image"
      src="${t}"
      alt="${e}"
    />
  </a>

  <div class="info">
    <p class="info-item"><b>Likes</b> ${o}</p>
    <p class="info-item"><b>Views</b> ${n}</p>
    <p class="info-item"><b>Comments</b> ${w}</p>
    <p class="info-item"><b>Downloads</b> ${S}</p>
  </div>
</li>`).join("");m.insertAdjacentHTML("beforeend",a),D.refresh()}function b(r,a){const s=M(r,a).map(e=>e==="..."?'<span class="dots">...</span>':`<button class="page-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`).join("");p.innerHTML=s}function L(){m.innerHTML=""}function v(){h.classList.add("is-visible")}function E(){h.classList.remove("is-visible")}function P(){p.classList.remove("is-hidden")}function q(){p.classList.add("is-hidden")}const l={formElem:document.querySelector(".js-form"),paginationContainer:document.querySelector(".js-pagination")},R=15;let i=1,f="",u=0;//! ============= submit ======================================
l.formElem.addEventListener("submit",async r=>{r.preventDefault();const t=new FormData(r.currentTarget).get("search-text").trim();if(!t){c.error({message:"Please enter a search query!",position:"topRight",icon:!1});return}f=t,i=1,L(),q(),v();try{const s=await g(f,i);if(u=Math.ceil(s.totalHits/R),!s.hits.length){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#98a8d4ff",icon:!1}),l.paginationContainer.innerHTML="";return}if(y(s.hits),b(i,u),P(),i>=u){c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}}catch{c.error({message:"Error fetching images. Please try again later.",position:"topRight",icon:!1})}finally{E()}l.formElem.reset()});//! =========== Click on pagination ===========
l.paginationContainer.addEventListener("click",async r=>{if(!r.target.classList.contains("page-btn"))return;i=Number(r.target.dataset.page),L(),q(),v();try{const t=await g(f,i);y(t.hits),b(i,u),P(),document.querySelector(".js-gallery").scrollIntoView({behavior:"smooth",block:"start"})}catch{c.error({message:"Error loading page",position:"topRight"})}finally{E()}});
//# sourceMappingURL=index.js.map
