import{i,S as c}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const u="https://pixabay.com/api",f="41870399-9b44301246ceb98c07efd626a",a={searchForm:document.querySelector(".search-form"),photoList:document.querySelector(".photo-list"),loader:document.querySelector(".loader")};a.loader.style.display="none";a.searchForm.addEventListener("submit",p);function p(n){n.preventDefault(),a.loader.style.display="inline-block",a.photoList.innerHTML="";const r=n.currentTarget,o=r.elements.query.value;if(o===""){i.show({message:"Please enter your request",position:"topRight",color:"yellow"}),a.loader.style.display="none";return}d(o).then(m).catch(s=>console.log(s)).finally(()=>r.reset()),console.log(o)}function d(n){return fetch(`${u}/?key=${f}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&per_page=9`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function m({hits:n}){if(a.loader.style.display="none",n.length===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),console.log(n);return}const r=n.map(o=>`<li class="gallery-item">
<a class="gallery-link" href="${o.largeImageURL}">
<img class="gallery-image" ;
    src="${o.webformatURL}"
    data-source="${o.largeImageURL}"
   alt="${o.tags}" />
   </a>
    <p>Likes: ${o.likes}</p>
   <p>Views: ${o.views}</p>
   <p>Comment: ${o.comments}</p>
   <p>Downloads: ${o.downloads}</p>
</li>`).join("");a.photoList.innerHTML=r,y.refresh()}const y=new c(".photo-list a",{captions:!0,captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
