(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-forum-index"],{"637f":function(t,n,i){"use strict";i.d(n,"b",(function(){return e})),i.d(n,"c",(function(){return u})),i.d(n,"a",(function(){return a}));var a={zPaging:i("aa12").default,uTabs:i("3f8b").default,siddhicmsForumList:i("87ac").default},e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("z-paging",{ref:"paging",attrs:{"auto-show-back-to-top":!0,"auto-show-system-loading":!0},on:{query:function(n){arguments[0]=n=t.$handleEvent(n),t.queryList.apply(void 0,arguments)}},model:{value:t.dataList,callback:function(n){t.dataList=n},expression:"dataList"}},[i("v-uni-view",{attrs:{slot:"top"},slot:"top"},[i("u-tabs",{attrs:{list:t.group,current:t.current,"bg-color":"#f3f3f3"},on:{change:function(n){arguments[0]=n=t.$handleEvent(n),t.changetabs.apply(void 0,arguments)}}})],1),i("siddhicms-forum-list",{attrs:{list:t.dataList}})],1)},u=[]},9159:function(t,n,i){"use strict";i.r(n);var a=i("637f"),e=i("93f7");for(var u in e)["default"].indexOf(u)<0&&function(t){i.d(n,t,(function(){return e[t]}))}(u);var r=i("828b"),o=Object(r["a"])(e["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);n["default"]=o.exports},"93f7":function(t,n,i){"use strict";i.r(n);var a=i("ef66"),e=i.n(a);for(var u in a)["default"].indexOf(u)<0&&function(t){i.d(n,t,(function(){return a[t]}))}(u);n["default"]=e.a},ef66:function(t,n,i){"use strict";i("6a54"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,i("3efd"),i("fd3c");n.default={data:function(){return{dataList:[],group:[],current:0}},onLoad:function(){var t=this;this.api.forumGroup().then((function(n){n.unshift({id:0,name:"推荐"}),t.group=n}))},methods:{queryList:function(t,n){var i,a=this;this.api.forum({page:t,num:n,pid:(null===(i=this.group[this.current])||void 0===i?void 0:i.id)||0}).then((function(t){t.map((function(t){return t.images=""==t.images?[]:t.images.split(",")})),a.$refs.paging.complete(t)}))},changetabs:function(t){this.current=t,this.$refs.paging.reload()}}}}}]);