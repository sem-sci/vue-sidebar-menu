!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["vue-sidebar-menu"]=t():e["vue-sidebar-menu"]=t()}(this,(function(){return function(e){var t={};function i(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(o,n,function(t){return e[t]}.bind(null,n));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/",i(i.s=4)}([function(e,t,i){},function(e,t,i){var o=i(2);e.exports=d,e.exports.parse=s,e.exports.compile=function(e,t){return r(s(e,t))},e.exports.tokensToFunction=r,e.exports.tokensToRegExp=u;var n=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function s(e,t){for(var i,o=[],s=0,l=0,r="",m=t&&t.delimiter||"/";null!=(i=n.exec(e));){var c=i[0],u=i[1],d=i.index;if(r+=e.slice(l,d),l=d+c.length,u)r+=u[1];else{var p=e[l],f=i[2],v=i[3],b=i[4],g=i[5],w=i[6],I=i[7];r&&(o.push(r),r="");var _=null!=f&&null!=p&&p!==f,C="+"===w||"*"===w,y="?"===w||"*"===w,x=i[2]||m,S=b||g;o.push({name:v||s++,prefix:f||"",delimiter:x,optional:y,repeat:C,partial:_,asterisk:!!I,pattern:S?h(S):I?".*":"[^"+a(x)+"]+?"})}}return l<e.length&&(r+=e.substr(l)),r&&o.push(r),o}function l(e){return encodeURI(e).replace(/[\/?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}function r(e){for(var t=new Array(e.length),i=0;i<e.length;i++)"object"==typeof e[i]&&(t[i]=new RegExp("^(?:"+e[i].pattern+")$"));return function(i,n){for(var s="",r=i||{},a=(n||{}).pretty?l:encodeURIComponent,h=0;h<e.length;h++){var m=e[h];if("string"!=typeof m){var c,u=r[m.name];if(null==u){if(m.optional){m.partial&&(s+=m.prefix);continue}throw new TypeError('Expected "'+m.name+'" to be defined')}if(o(u)){if(!m.repeat)throw new TypeError('Expected "'+m.name+'" to not repeat, but received `'+JSON.stringify(u)+"`");if(0===u.length){if(m.optional)continue;throw new TypeError('Expected "'+m.name+'" to not be empty')}for(var d=0;d<u.length;d++){if(c=a(u[d]),!t[h].test(c))throw new TypeError('Expected all "'+m.name+'" to match "'+m.pattern+'", but received `'+JSON.stringify(c)+"`");s+=(0===d?m.prefix:m.delimiter)+c}}else{if(c=m.asterisk?encodeURI(u).replace(/[?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})):a(u),!t[h].test(c))throw new TypeError('Expected "'+m.name+'" to match "'+m.pattern+'", but received "'+c+'"');s+=m.prefix+c}}else s+=m}return s}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function h(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function m(e,t){return e.keys=t,e}function c(e){return e.sensitive?"":"i"}function u(e,t,i){o(t)||(i=t||i,t=[]);for(var n=(i=i||{}).strict,s=!1!==i.end,l="",r=0;r<e.length;r++){var h=e[r];if("string"==typeof h)l+=a(h);else{var u=a(h.prefix),d="(?:"+h.pattern+")";t.push(h),h.repeat&&(d+="(?:"+u+d+")*"),l+=d=h.optional?h.partial?u+"("+d+")?":"(?:"+u+"("+d+"))?":u+"("+d+")"}}var p=a(i.delimiter||"/"),f=l.slice(-p.length)===p;return n||(l=(f?l.slice(0,-p.length):l)+"(?:"+p+"(?=$))?"),l+=s?"$":n&&f?"":"(?="+p+"|$)",m(new RegExp("^"+l,c(i)),t)}function d(e,t,i){return o(t)||(i=t||i,t=[]),i=i||{},e instanceof RegExp?function(e,t){var i=e.source.match(/\((?!\?)/g);if(i)for(var o=0;o<i.length;o++)t.push({name:o,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return m(e,t)}(e,t):o(e)?function(e,t,i){for(var o=[],n=0;n<e.length;n++)o.push(d(e[n],t,i).source);return m(new RegExp("(?:"+o.join("|")+")",c(i)),t)}(e,t,i):function(e,t,i){return u(s(e,i),t,i)}(e,t,i)}},function(e,t){e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},function(e,t,i){"use strict";var o=i(0);i.n(o).a},function(e,t,i){"use strict";i.r(t),i.d(t,"SidebarMenu",(function(){return I}));var o=i(1),n=i.n(o),s={pollInterval:void 0,urlPoller:void 0,listeners:[]},l={hash:window.location.hash,href:window.location.href,host:window.location.host,hostname:window.location.hostname,origin:window.location.origin,pathname:window.location.pathname,port:window.location.port,protocol:window.location.protocol,search:window.location.search,addChangeListener:function(e){s.listeners.push(e)},removeChangeListener:function(e){var t=s.listeners.indexOf(e);-1!==t&&s.listeners.splice(t,1)}};function r(){l.hash=window.location.hash,l.href=window.location.href,l.host=window.location.host,l.hostname=window.location.hostname,l.origin=window.location.origin,l.pathname=window.location.pathname,l.port=window.location.port,l.protocol=window.location.protocol,l.search=window.location.search,s.listeners.forEach((function(e){return e()}))}Object.defineProperty(l,"pollInterval",{get:function(){return s.pollInterval},set:function(e){s.pollInterval=e,s.urlPoller&&clearInterval(s.urlPoller),s.pollInterval&&(s.urlPoller=setInterval((function(){l.href!==window.location.href&&r()}),s.pollInterval))}}),window.addEventListener("hashchange",r),l.pollInterval=300;var a=l,h={data:function(){return{itemShow:!1,itemHover:!1,location:null,item:null,prevExactActive:!1}},created:function(){this.item=this.menuItem,a.addChangeListener(this.onLocationChanged),this.onLocationChanged(),!this.item.child||this.showChild||this.item.isPopout||(this.itemShow=this.active)},destroyed:function(){a.removeChangeListener(this.onLocationChanged)},methods:{onLocationChanged:function(){this.location={href:a.href,pathname:a.pathname,hash:a.hash,search:a.search}},isShowActive:function(e){var t=this;return this.activeShow===e||e.child&&e.child.some((function(e){return t.isShowActive(e)}))},isLinkActive:function(e){return this.matchRoute(e)||this.isChildActive(e.child)||this.isAliasActive(e)},isLinkExactActive:function(e){return this.matchExactRoute(e.href)},isChildActive:function(e){var t=this;return!!e&&e.some((function(e){return t.isLinkActive(e)}))},isAliasActive:function(e){if(e.alias){var t=this.useVueRouter?this.$route.fullPath:this.location.pathname+this.location.search+this.location.hash;return Array.isArray(e.alias)?e.alias.some((function(e){return n()(e).test(t)})):n()(e.alias).test(t)}return!1},matchRoute:function(e){var t=e.href,i=e.exactPath;if(!t)return!1;if(this.useVueRouter){var o=this.$router.resolve(t).route;return i?o.path===this.$route.path:this.matchExactRoute(t)}return i?t===this.location.pathname||t===this.location.pathname+"/":this.matchExactRoute(t)},matchExactRoute:function(e){return!!e&&(this.useVueRouter?this.$router.resolve(e).route.fullPath===this.$route.fullPath:e===this.location.pathname+this.location.search+this.location.hash||e===this.location.pathname+"/"+this.location.search+this.location.hash)},clickEvent:function(e){if(!this.item.disabled){if(this.emitItemClick(e,this.item,this),this.isPopout&&!this.isMobileItem){if(this.mobileItem&&this.mobileItem===this.item||this.emitSetMobileItem({item:this.item,itemEl:e.currentTarget.offsetParent}),this.hover||this.item.child)return;this.emitUnsetMobileItem(!0)}!this.item.child||this.item.href&&!this.exactActive||(this.showOneChild?this.activeShow===this.item?this.emitActiveShow(null):this.emitActiveShow(this.item):(this.itemShow=!this.itemShow,console.log("click(): set itemShow",this.item.title,this.itemShow)))}},mouseEnterEvent:function(e){e.stopPropagation(),this.item.disabled||(this.itemHover||this.isMobileItem||this.isMobileItemChild||this.mobileItem===this.item?(this.isMobileItem||this.isMobileItemChild)&&this.emitStopMobileTimer():this.emitUnsetMobileItem(!this.isPopout),this.itemHover=!0,this.hover||!this.isPopout||this.isMobileItem||this.isMobileItemChild||this.emitSetMobileItem({item:this.item,itemEl:e.currentTarget}))},mouseLeaveEvent:function(e){e.stopPropagation(),this.itemHover=!1},emitSetMobileItem:function(e){var t=e.item,i=e.itemEl;this.$emit("set-mobile-item",{item:t,itemEl:i})},emitUnsetMobileItem:function(e){this.$emit("unset-mobile-item",e)}},computed:{useVueRouter:function(){return this.$router&&!this.disableVueRouter},isRouterLink:function(){return!0===(this.useVueRouter&&this.item&&void 0!==this.item.href&&!this.item.external)},isFirstLevel:function(){return 1===this.level},isPopout:function(){return this.isCollapsed&&this.isFirstLevel||this.item.isPopout&&!this.isMobileItemChild},show:function(){return!!this.item.child&&(!(!this.showChild&&!this.isMobileItem)||this.itemShow)},itemLinkClass:function(){return["vsm--link",this.isMobileItem?"":"vsm--link_level-"+this.level,{"vsm--link_mobile-item":this.isMobileItem},{"vsm--link_hover":this.hover},{"vsm--link_active":this.active},{"vsm--link_exact-active":this.exactActive},{"vsm--link_disabled":this.item.disabled},this.item.class]},itemClass:function(){return["vsm--item",{"vsm--item_open":this.show},this.isMobileItem?"":"vsm--item_level-"+this.level,{"vsm--item_mobile-item":this.isMobileItem},{"vsm--item_hover":this.hover},{"vsm--item_disabled":this.item.disabled},this.item.class]},isItemHidden:function(){return this.isCollapsed?!(!this.item.hidden||void 0!==this.item.hiddenOnCollapse)||!0===this.item.hiddenOnCollapse:!0===this.item.hidden},itemLinkHref:function(){return!this.item.href||this.item.disabled?null:this.item.href},hover:function(){return this.isPopout?this.item===this.mobileItem:this.itemHover},itemLinkTag:function(){return this.itemLinkHref?this.isRouterLink?"router-link":"a":"span"},active:function(){return this.isLinkActive(this.item)},exactActive:function(){var e=this.isLinkExactActive(this.item);return e&&!this.prevExactActive&&this.showOneChild&&this.activeShow!==this.item&&this.emitActiveShow(this.item),this.prevExactActive=e,e}},watch:{menuItem:function(e,t){this.item=e,this.emitItemUpdate(e,t)},activeShow:function(e){e&&(this.itemShow=this.isShowActive(this.item))}},inject:["emitActiveShow","emitItemClick","emitItemUpdate","emitStopMobileTimer"]},m={methods:{expandEnter:function(e){e.style.height=e.scrollHeight+"px"},expandAfterEnter:function(e){e.style.height="auto"},expandBeforeLeave:function(e){e.style.height=e.scrollHeight+"px"}}};function c(e,t,i,o,n,s,l,r){var a,h="function"==typeof e?e.options:e;if(t&&(h.render=t,h.staticRenderFns=i,h._compiled=!0),o&&(h.functional=!0),s&&(h._scopeId="data-v-"+s),l?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(l)},h._ssrRegister=a):n&&(a=r?function(){n.call(this,this.$root.$options.shadowRoot)}:n),a)if(h.functional){h._injectStyles=a;var m=h.render;h.render=function(e,t){return a.call(t),m(e,t)}}else{var c=h.beforeCreate;h.beforeCreate=c?[].concat(c,a):[a]}return{exports:e,options:h}}var u=c({name:"SidebarMenuLink",props:{tag:{type:String,default:""},href:{type:[String,Object],default:""},disabled:{type:Boolean,default:!1},attributes:{type:Object,default:null}}},(function(){var e=this,t=e.$createElement;return(e._self._c||t)(e.tag,e._b({tag:"component",attrs:{tabindex:e.disabled?-1:0,role:"link"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.$parent.clickEvent(t)}}},"component",["router-link"===e.tag?{to:e.href}:{href:e.href},e.attributes],!1),[e._t("default")],2)}),[],!1,null,null,null);u.options.__file="SidebarMenuLink.vue";var d=u.exports,p=c({name:"SidebarMenuIcon",props:{icon:{type:[String,Object],default:""}}},(function(){var e=this,t=e.$createElement;return(e._self._c||t)(e.icon.element?e.icon.element:"i",e._b({tag:"component",staticClass:"vsm--icon",class:"string"==typeof e.icon||e.icon instanceof String?e.icon:e.icon.class},"component",e.icon.attributes,!1),[e._v("\n  "+e._s(e.icon.text)+"\n")])}),[],!1,null,null,null);p.options.__file="SidebarMenuIcon.vue";var f=p.exports,v=c({name:"SidebarMenuBadge",props:{badge:{type:Object,default:function(){}}}},(function(){var e=this,t=e.$createElement;return(e._self._c||t)(e.badge.element?e.badge.element:"span",e._b({tag:"component",staticClass:"vsm--badge",class:e.badge.class},"component",e.badge.attributes,!1),[e._v("\n  "+e._s(e.badge.text)+"\n")])}),[],!1,null,null,null);v.options.__file="SidebarMenuBadge.vue";var b=c({name:"SidebarMenuItem",components:{SidebarMenuLink:d,SidebarMenuIcon:f,SidebarMenuBadge:v.exports},mixins:[h,m],props:{menuItem:{type:Object,required:!0},level:{type:Number,default:1},isCollapsed:{type:Boolean},isMobileItem:{type:Boolean,default:!1},isMobileItemChild:{type:Boolean,default:!1},mobileItem:{type:Object,default:null},activeShow:{type:Object,default:null},showChild:{type:Boolean,default:!1},showOneChild:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},disableHover:{type:Boolean,default:!1},mobileItemStyle:{type:Object,default:null},useLocationPolling:{type:Boolean,default:!1},disableVueRouter:{type:Boolean,default:!1}}},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.item.component&&!e.isItemHidden?i(e.item.component,e._b({tag:"component"},"component",e.item.props,!1)):e.item.header&&!e.isItemHidden?i("div",e._b({staticClass:"vsm--header",class:e.item.class},"div",e.item.attributes,!1),[e._v("\n  "+e._s(e.item.title)+"\n")]):e.isItemHidden?e._e():i("div",e._g({class:e.itemClass,on:{mouseout:e.mouseLeaveEvent}},e.disableHover&&e.isCollapsed?{click:e.mouseEnterEvent}:{mouseover:e.mouseEnterEvent}),[i("sidebar-menu-link",{class:e.itemLinkClass,attrs:{tag:e.itemLinkTag,href:e.itemLinkHref,disabled:e.item.disabled,attributes:e.item.attributes},nativeOn:{click:function(t){return e.clickEvent(t)}}},[e.item.icon&&!e.isMobileItem?i("sidebar-menu-icon",{attrs:{icon:e.item.icon}}):e._e(),e._v(" "),i("transition",{attrs:{name:"fade-animation",appear:e.isMobileItem}},[e.isCollapsed&&!e.isFirstLevel||!e.isCollapsed||e.isMobileItem?[i("span",{staticClass:"vsm--title"},[e._v(e._s(e.item.title))])]:e._e()],2),e._v(" "),e.isCollapsed&&!e.isFirstLevel||!e.isCollapsed||e.isMobileItem?[e.item.badge?i("sidebar-menu-badge",{attrs:{badge:e.item.badge}}):e._e(),e._v(" "),e.item.child?i("div",{staticClass:"vsm--arrow",class:[{"vsm--arrow_open":e.show},{"vsm--arrow_slot":e.$slots["dropdown-icon"]}]},[e._t("dropdown-icon")],2):e._e()]:e._e()],2),e._v(" "),e.item.child?[e.isCollapsed&&!e.isFirstLevel||!e.isCollapsed||e.isMobileItem?[i("transition",{attrs:{appear:e.isMobileItem,name:"expand"},on:{enter:e.expandEnter,afterEnter:e.expandAfterEnter,beforeLeave:e.expandBeforeLeave}},[e.show?i("div",{staticClass:"vsm--dropdown",class:e.isMobileItem&&"vsm--dropdown_mobile-item",style:e.isMobileItem&&e.mobileItemStyle.dropdown},[i("div",{staticClass:"vsm--list"},e._l(e.item.child,(function(t,o){return i("sidebar-menu-item",{key:o,attrs:{"menu-item":t,level:e.level+1,"active-show":e.activeShow,"show-one-child":e.showOneChild,"show-child":e.showChild,rtl:e.rtl,"is-collapsed":e.isCollapsed,"use-location-polling":e.useLocationPolling,"disable-vue-router":e.disableVueRouter,"is-mobile-item-child":e.isMobileItemChild||e.isMobileItem},on:{"set-mobile-item":e.emitSetMobileItem,"unset-mobile-item":e.emitUnsetMobileItem}},[e._t("dropdown-icon",null,{slot:"dropdown-icon"})],2)})),1)]):e._e()])]:e._e()]:e._e()],2)}),[],!1,null,null,null);b.options.__file="SidebarMenuItem.vue";var g={name:"SidebarMenu",components:{SidebarMenuItem:b.exports},mixins:[m],props:{menu:{type:Array,required:!0},collapsed:{type:Boolean,default:!1},width:{type:String,default:"350px"},widthCollapsed:{type:String,default:"60px"},showChild:{type:Boolean,default:!1},theme:{type:String,default:""},showOneChild:{type:Boolean,default:!1},rtl:{type:Boolean,default:!1},relative:{type:Boolean,default:!1},hideToggle:{type:Boolean,default:!1},disableHover:{type:Boolean,default:!1},useLocationPolling:{type:Boolean,default:!1},disableVueRouter:{type:Boolean,default:!1}},data:function(){return{isCollapsed:this.collapsed,mobileItem:null,mobileItemPos:0,mobileItemHeight:0,mobileItemTimeout:null,activeShow:null,parentHeight:0,parentWidth:0,parentOffsetTop:0,parentOffsetLeft:0}},computed:{sidebarWidth:function(){return this.isCollapsed?this.widthCollapsed:this.width},sidebarClass:function(){return[this.isCollapsed?"vsm_collapsed":"vsm_expanded",this.theme?"vsm_"+this.theme:"",this.rtl?"vsm_rtl":"",this.relative?"vsm_relative":""]},mobileItemStyle:function(){return{item:[{position:"absolute"},{top:this.mobileItemPos+"px"},this.rtl?{right:"0px"}:{left:"0px"},this.rtl?{"padding-right":this.sidebarWidth}:{"padding-left":this.sidebarWidth},this.rtl&&{direction:"rtl"},{width:window.innerWidth+"px"},this.isCollapsed?{"max-width":this.width}:{"max-width":"calc("+this.width+"*2 - "+this.widthCollapsed+")"}],dropdown:[{position:"absolute"},{top:this.mobileItemHeight+"px"},{width:window.innerWidth+"px"},{"max-width":"calc("+this.width+" - "+this.widthCollapsed+")"},{"max-height":this.parentHeight-(this.mobileItemPos+this.mobileItemHeight)-this.parentOffsetTop+"px"},{"overflow-y":"auto"}],background:[{position:"absolute"},{top:"0px"},{left:"0px"},{right:"0px"},{width:"100%"},{height:this.mobileItemHeight+"px"}]}}},watch:{collapsed:function(e){this.isCollapsed!==this.collapsed&&(this.isCollapsed=e,this.unsetMobileItem())}},methods:{onMouseLeave:function(){this.unsetMobileItem(!0)},onToggleClick:function(){this.isCollapsed=!this.isCollapsed,this.unsetMobileItem(),this.$emit("toggle-collapse",this.isCollapsed)},onActiveShow:function(e){this.activeShow=e},onItemClick:function(e,t,i){this.$emit("item-click",e,t,i)},setMobileItem:function(e){var t=this,i=e.item,o=e.itemEl;if(this.stopMobileTimer(),this.mobileItem!==i){var n=this.$el.getBoundingClientRect().top,s=o.getBoundingClientRect().top,l=o.children[0],r=window.getComputedStyle(o),a=parseFloat(r.paddingTop),h=parseFloat(r.marginTop),m=l.offsetHeight,c=s-n+a+h;this.unsetMobileItem(),this.$nextTick((function(){t.initParentOffsets(),t.mobileItem=i,t.mobileItemPos=c,t.mobileItemHeight=m}))}},unsetMobileItem:function(e){var t=this;this.stopMobileTimer(),e?this.mobileItemTimeout=setTimeout((function(){t.mobileItem=null}),600):this.mobileItem=null},stopMobileTimer:function(){this.mobileItemTimeout&&clearTimeout(this.mobileItemTimeout),this.mobileItemTimeout=null},initParentOffsets:function(){var e=this.$el.getBoundingClientRect(),t=e.top,i=e.left,o=e.right,n=this.relative?this.$el.parentElement:document.documentElement;if(this.parentHeight=n.clientHeight,this.parentWidth=n.clientWidth,this.relative){var s=n.getBoundingClientRect(),l=s.top,r=s.left;this.parentOffsetTop=t-(l+n.clientTop),this.parentOffsetLeft=this.rtl?this.parentWidth-o+(r+n.clientLeft):i-(r+n.clientLeft)}else this.parentOffsetTop=t,this.parentOffsetLeft=this.rtl?this.parentWidth-o:i},onItemUpdate:function(e,t){t===this.mobileItem&&(this.mobileItem=e),t===this.activeShow&&(this.activeShow=e)}},provide:function(){return{emitActiveShow:this.onActiveShow,emitItemClick:this.onItemClick,emitItemUpdate:this.onItemUpdate,emitStopMobileTimer:this.stopMobileTimer}}},w=(i(3),c(g,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"v-sidebar-menu",class:e.sidebarClass,style:[{"max-width":e.sidebarWidth}],on:{mouseleave:e.onMouseLeave}},[e._t("header"),e._v(" "),i("div",{staticClass:"vsm--scroll-wrapper"},[i("div",{staticClass:"vsm--list",style:e.isCollapsed&&{width:e.widthCollapsed}},e._l(e.menu,(function(t,o){return i("sidebar-menu-item",{key:o,attrs:{"menu-item":t,"is-collapsed":e.isCollapsed,"active-show":e.activeShow,"show-one-child":e.showOneChild,"show-child":e.showChild,rtl:e.rtl,"mobile-item":e.mobileItem,"disable-hover":e.disableHover,"use-location-polling":e.useLocationPolling,"disable-vue-router":e.disableVueRouter},on:{"set-mobile-item":e.setMobileItem,"unset-mobile-item":e.unsetMobileItem}},[e._t("dropdown-icon",null,{slot:"dropdown-icon"})],2)})),1),e._v(" "),e.mobileItem?i("div",{staticClass:"vsm--mobile-item",style:e.mobileItemStyle.item},[i("sidebar-menu-item",{attrs:{"menu-item":e.mobileItem,"is-mobile-item":!0,"mobile-item-style":e.mobileItemStyle,"is-collapsed":e.isCollapsed,"show-child":e.showChild,rtl:e.rtl,"use-location-polling":e.useLocationPolling,"disable-vue-router":e.disableVueRouter}},[e._t("dropdown-icon",null,{slot:"dropdown-icon"})],2),e._v(" "),i("transition",{attrs:{name:"slide-animation"}},[i("div",{staticClass:"vsm--mobile-bg",style:e.mobileItemStyle.background})])],1):e._e()]),e._v(" "),e._t("footer"),e._v(" "),e.hideToggle?e._e():i("button",{staticClass:"vsm--toggle-btn",class:{"vsm--toggle-btn_slot":e.$slots["toggle-icon"]},on:{click:e.onToggleClick}},[e._t("toggle-icon")],2)],2)}),[],!1,null,null,null));w.options.__file="SidebarMenu.vue";var I=w.exports;t.default={install:function(e){e.component("sidebar-menu",I)}}}])}));
//# sourceMappingURL=vue-sidebar-menu.js.map