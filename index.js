import{a as m,S as P,i}from"./assets/vendor-BkC4bTqC.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();m.defaults.baseURL="https://pixabay.com";const M="55023581-b8ae6332fd3af068fbd1cd850";async function p(o,r){return(await m.get("/api/",{params:{key:M,q:o,page:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15}})).data}const g=document.querySelector(".js-gallery"),y=document.querySelector(".js-load-more"),h=document.querySelector(".loader"),S=new P(".js-gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function b(o){const r=o.map(({webformatURL:s,largeImageURL:a,tags:e,likes:t,views:l,comments:E,downloads:q})=>`
<li class="gallery-item">
  <a class="gallery-link" href="${a}">
    <img class="gallery-image"
      src="${s}"
      alt="${e}"
    />
  </a>

  <div class="info">
    <p class="info-item"><b>Likes</b> ${t}</p>
    <p class="info-item"><b>Views</b> ${l}</p>
    <p class="info-item"><b>Comments</b> ${E}</p>
    <p class="info-item"><b>Downloads</b> ${q}</p>
  </div>
</li>`).join("");g.insertAdjacentHTML("beforeend",r),S.refresh()}function R(){g.innerHTML=""}function L(){h.classList.add("is-visible")}function v(){h.classList.remove("is-visible")}function w(){y.classList.add("is-visible")}function c(){y.classList.remove("is-visible")}const u={formElem:document.querySelector(".js-form"),loadMoreBtn:document.querySelector(".js-load-more")},B=15;let n=1,f="",d=0;//! ============= event ==========================
u.formElem.addEventListener("submit",async o=>{o.preventDefault();const s=new FormData(o.currentTarget).get("search-text").trim();if(!s){i.error({message:"Please enter a search query!",position:"topRight",icon:!1});return}f=s,n=1,R(),c(),L();try{const a=await p(f,n);if(d=Math.ceil(a.totalHits/B),!a.hits.length){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"#98a8d4ff",icon:!1});return}if(b(a.hits),n>=d){c(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}w()}catch{i.error({message:"Error fetching images. Please try again later.",position:"topRight",icon:!1})}finally{v()}u.formElem.reset()});u.loadMoreBtn.addEventListener("click",async()=>{n+=1,c(),L();try{const o=await p(f,n);b(o.hits);const r=document.querySelector(".gallery-item:last-child");if(r){const s=r.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}n>=d?i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):w()}catch{i.error({message:"Error fetching more images.",position:"topRight"})}finally{v()}});
//# sourceMappingURL=index.js.map
