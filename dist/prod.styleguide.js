!function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=51)}({51:function(e,t,n){n(52),function(e,t,n){filterTerm=t=>{const n=e(".DesignSystem__MenuSection");e(".DesignSystem__MenuSubSection").addClass("DesignSystem__MenuSubSection--inactive"),n.find("a").each((n,i)=>{e(i).text().toLowerCase().includes(t.toLowerCase())?(e(i).show(),e(i).parent().addClass("DesignSystem__MenuSubSection--expanded").removeClass("DesignSystem__MenuSubSection--inactive")):e(i).hide()})},bindEvents=()=>{this.$aside.on("click",".DesignSystem__MenuItemSection",t=>{e(t.target).parent().toggleClass("DesignSystem__MenuSubSection--expanded")}),this.$aside.on("click",".DesignSystem__Menu a[title]",n=>{n.preventDefault();let i=e(n.target).attr("href"),s=e(n.target).attr("title");t.location.href=`${i}#${s}`}),this.$filterClear.on("click",()=>{this.$filterInput.val("").trigger("input")}),this.$aside.on("click",'a[ui="button-expand-all"]',()=>openAll()),this.$aside.on("click",'a[ui="button-collapse-all"]',()=>closeAll()),e(t).load(()=>{const n=t.location.hash.slice(1);if(n){let i=e(".DesignSystem__Content").find('[title="'+n+'"]');i.length&&e(t).scrollTop(i.offset().top)}markAsideMenu(!0)}),e(t).on("hashchange",()=>{scrollToHashTarget()})},scrollToHashTarget=()=>{let n=e(".DesignSystem__Content").find('[id="'+t.location.hash.slice(1)+'"]'),i=e(".DesignSystem__Content").find('[title="'+t.location.hash.slice(1)+'"]');n.length?e(t).scrollTop(n.offset().top):i.length&&e(t).scrollTop(i.offset().top),markAsideMenu(!1)},markAsideMenu=n=>{const i=t.location.hash.slice(1);let s=t.location.pathname.replace("/Styleguidev2_UI/","");e(".DesignSystem__MenuSection a").each((t,l)=>{let o=e(l).attr("href").split("?")[0],r=e(l).attr("title");if(o===s){if(i===r||!i&&!r?e(l).addClass("active"):e(l).removeClass("active"),e(l).closest(".DesignSystem__MenuSubSection").length&&(e(l).closest(".DesignSystem__MenuSubSection").addClass("DesignSystem__MenuSubSection--expanded"),n)){let t=e(l).closest(".DesignSystem__MenuSubSection")[0].offsetTop;e(".DesignSystem__Menu")[0].scroll(0,t-230)}}else e(l).removeClass("active")})},openAll=()=>{e(".DesignSystem__MenuSubSection").addClass("DesignSystem__MenuSubSection--expanded"),e(".DesignSystem__Menu")[0].scroll(0,0),e(".DesignSystem__MenuSubSection").removeClass("DesignSystem__MenuSubSection--inactive")},closeAll=()=>{e(".DesignSystem__MenuSubSection").removeClass("DesignSystem__MenuSubSection--expanded"),e(".DesignSystem__Menu")[0].scroll(0,0),e(".DesignSystem__MenuSubSection").removeClass("DesignSystem__MenuSubSection--inactive")},n.DesignSystem={create:t=>{this.$aside=e(".DesignSystem__Aside"),this.$filterInput=e("#"+t.filterInput),this.$filterClear=this.$filterInput.parent().find(".icon"),this.$filterInput.on("keydown",e=>{if("Enter"===e.key)return!1}),this.$filterInput.on("input",t=>{if(this.$filterInput.val().length>2)this.filterTerm(t.target.value),this.$filterClear.show();else{e(".DesignSystem__MenuSection").find("a, .DesignSystem__MenuSection, .DesignSystem__MenuSubSection").show(),e(".DesignSystem__MenuSubSection").removeClass("DesignSystem__MenuSubSection--inactive"),this.$filterInput.val().length>0?this.$filterClear.show():this.$filterClear.hide()}}),this.bindEvents()},openAll:openAll,closeAll:closeAll,setRTLmode:()=>{e(".DesignSystem.Page").toggleClass("AR")}}}(jQuery,window,SapphireWidgets)},52:function(e,t,n){}});