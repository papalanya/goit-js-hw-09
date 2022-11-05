const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let o=null;t.addEventListener("click",(function(){t.disabled=!0,o=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){clearTimeout(o),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.7f7f60b9.js.map
