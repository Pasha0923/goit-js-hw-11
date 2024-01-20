import{i as l,S as u}from"./assets/vendor-46aac873.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const f="https://pixabay.com/api",m="41870399-9b44301246ceb98c07efd626a",c={searchForm:document.querySelector(".search-form"),photoList:document.querySelector(".photo-list")};c.searchForm.addEventListener("submit",p);function p(n){n.preventDefault();const t=n.currentTarget,r=t.elements.query.value;i(r).then(h).catch(d).finally(()=>t.reset()),i(r).then(a=>{if(!a.hits.length||r===""){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}})}function i(n){return fetch(`${f}/?key=${m}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&per_page=9`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})}function d(n){console.error(n)}function h({hits:n}){const t=n.map(r=>`<li class="gallery-item">
<a class="gallery-link" href="${r.largeImageURL}">
<img class="gallery-image" ;
    src="${r.webformatURL}"
    data-source="${r.largeImageURL}"
   alt="${r.tags}" />
   </a>
    <p>Likes: ${r.likes}</p>
   <p>Views: ${r.views}</p>
   <p>Comment: ${r.comments}</p>
   <p>Downloads: ${r.downloads}</p>
</li>`).join("");c.photoList.innerHTML=t,g.refresh()}const g=new u(".photo-list a",{captions:!0,captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
