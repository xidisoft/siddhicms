(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-create-edit"],{"30f7":function(t,e,i){"use strict";i("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},i("7a76"),i("c9b5")},4733:function(t,e,i){"use strict";i("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){if(Array.isArray(t))return(0,n.default)(t)};var n=function(t){return t&&t.__esModule?t:{default:t}}(i("8d0b"))},4968:function(t,e,i){var n=i("6a34");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("967d").default;a("09ca7ea2",n,!0,{sourceMap:!1,shadowMode:!1})},"4e9a":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var n={uInput:i("0bf2").default,uUpload:i("8cb3").default,uButton:i("c7c7").default,xidicmsLoading:i("f88e").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"u-p-20"},[i("v-uni-view",{staticClass:"u-border-bottom u-p-20"},[i("u-input",{attrs:{type:"textarea","custom-style":{fontSize:"32upx"},placeholder:"在此输入内容,140字以内"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),i("v-uni-view",{staticClass:"input-item"},[i("v-uni-view",{staticClass:"title"},[i("v-uni-text",{staticClass:"require"},[t._v("*")]),i("v-uni-text",[t._v("标题")])],1),i("v-uni-input",{staticClass:"right-input",attrs:{type:"text",placeholder:"请输入标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),i("v-uni-view",{staticClass:"u-border-bottom u-p-b-20"},[i("u-upload",{ref:"uUpload",attrs:{"max-count":"9","file-list":t.fileList,action:t.action,header:t.formData,"auto-upload":!1,"before-remove":t.beforeRemove},on:{"on-uploaded":function(e){arguments[0]=e=t.$handleEvent(e),t.afterUpload.apply(void 0,arguments)},"on-list-change":function(e){arguments[0]=e=t.$handleEvent(e),t.onlistchange.apply(void 0,arguments)}}})],1),t._l(t.jsonData,(function(e,n){return i("v-uni-view",{key:n,staticClass:"tags-input"},[i("v-uni-view",{staticClass:"title"},[1==e.r?i("v-uni-text",{staticClass:"require"},[t._v("*")]):t._e(),i("v-uni-text",[t._v(t._s(e.k))])],1),i("v-uni-view",{staticClass:"u-flex-1 u-flex u-flex-wrap"},t._l(e.v,(function(e,a){return i("v-uni-text",{class:t.select.includes(n+"-"+a)?"tags active":"tags",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chooseTags(n,a)}}},[t._v(t._s(e))])})),1)],1)})),i("v-uni-view",{staticClass:"input-item"},[i("v-uni-view",{staticClass:"title"},[i("v-uni-text",{staticClass:"require"},[t._v("*")]),i("v-uni-text",[t._v("电话")])],1),i("v-uni-input",{staticClass:"right-input",attrs:{type:"number",placeholder:"请输入电话"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),i("v-uni-view",{staticStyle:{margin:"20upx","padding-bottom":"100px"}},[i("u-button",{attrs:{type:"primary",shape:"circle","custom-style":{background:"#129db1"}},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("确认修改")])],1),i("xidicms-loading",{attrs:{show:t.showLoading}})],2)},s=[]},"6a34":function(t,e,i){var n=i("c86c");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \n */.input-item[data-v-709acbfd]{display:flex;align-items:center;padding:%?20?%}.tags-input[data-v-709acbfd]{display:flex;align-items:flex-start;padding:%?40?% %?20?%;border-bottom:solid 1px #eee}.title[data-v-709acbfd]{width:%?100?%;margin-right:%?20?%}.right-input[data-v-709acbfd]{flex:1;border-bottom:solid 1px #eee;padding:%?10?% 0;font-size:%?32?%}.tags[data-v-709acbfd]{background:#f3f3f3;color:#999;font-size:%?30?%;border:solid 1px #ddd;padding:%?4?% %?10?%;margin-right:%?20?%;margin-bottom:%?20?%;border-radius:%?10?%}.active[data-v-709acbfd]{background:#129db1;color:#fff}.require[data-v-709acbfd]{color:red}',""]),t.exports=e},"7e75":function(t,e,i){"use strict";i("6a54");var n=i("f5bd").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("b7c7")),s=n(i("2634")),o=n(i("2fdc"));i("fd3c"),i("aa9c"),i("22b6"),i("5ef2"),i("dd2b"),i("5c47"),i("a1c1"),i("0506"),i("bf0f"),i("8f71"),i("c223");var u={data:function(){return{formData:{token:uni.getStorageSync("userInfo").token},action:this.host+"/api/common/upload",showLoading:!0,jsonData:[],select:[],fileList:[],title:"",content:"",images:"",phone:"",tagsjson:{},group_id:0,id:0,append:[]}},onLoad:function(t){var e=this;this.api.editInfo({id:t.id}).then((function(t){e.group_id=t.group_id,e.title=t.title,e.content=t.content,e.images=t.images,e.phone=t.phone,e.tagsjson=t.tagsjson,e.id=t.id,uni.setNavigationBarTitle({title:"编辑-"+t.name}),""!=e.images&&e.images.split(",").map((function(t){e.fileList.push({url:e.host+t})})),e.jsonData=JSON.parse(t.paramjson),e.tagsjson=JSON.parse(t.tagsjson);var i=Object.values(e.tagsjson),n=e;e.jsonData.map((function(t,e){t.v=t.v.split(","),i.map((function(i){var a=t.v.indexOf(i);-1!=a&&n.select.push(e+"-"+a)}))})),setTimeout((function(){e.showLoading=!1}),1e3)}))},methods:{chooseTags:function(t,e){var i=this,n=this.jsonData[t],a=this.tagsjson;if(1==n["m"]){var s=0;this.select.map((function(n,a){n==t+"-"+e&&(i.select.splice(a,1),s++)})),0==s?(this.select.push(t+"-"+e),a[n["k"]]+=n["v"][e]+","):a[n["k"]]=a[n["k"]].replace(n["v"][e]+",","")}else a[n["k"]]=n["v"][e],this.select.map((function(e,n){e.split("-")[0]==t&&i.select.splice(n,1)})),this.select.push(t+"-"+e)},submit:function(){if(this.$u.test.isEmpty(this.content))return this.$u.toast("内容不能为空");if(this.$u.test.isEmpty(this.title))return this.$u.toast("标题不能为空");if(this.$u.test.isEmpty(this.phone))return this.$u.toast("电话不能为空");for(var t in this.jsonData){var e=this.jsonData[t];if(""==this.tagsjson[e["k"]]){if(1==e["r"])return this.$u.toast("请输入".concat(e["k"],"值"));delete this.tagsjson[e["k"]]}}if(this.fileList.length>0){var i=this.fileList.some((function(t){return 0==t.progress}));i?this.$refs.uUpload.upload():this.create()}else this.create()},onlistchange:function(t){this.fileList=t},beforeRemove:function(t,e){var i=this;return(0,o.default)((0,s.default)().mark((function n(){var a,o,u,r;return(0,s.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(100!=e[t].progress){n.next=14;break}if(a=e[t].url,o=i.images.split(","),u=o.filter((function(t){return-1!=a.indexOf(t)})),!(u.length>0)){n.next=14;break}return n.next=7,i.api.removeImg({image:u[0]});case 7:if(r=n.sent,!r){n.next=13;break}return o=o.filter((function(t){return t!==u[0]})),i.images=o.join(),console.log(i.images),n.abrupt("return",!0);case 13:return n.abrupt("return",!1);case 14:case"end":return n.stop()}}),n)})))()},afterUpload:function(t,e){this.append=t.filter((function(t){return 100==t.progress&&!uni.$u.test.isEmpty(t.response)})),this.append.length>0&&(this.append=this.append.map((function(t){return t.response.data.url}))),this.create()},create:function(){var t=this;1==this.append.length?""==this.images?this.images=this.append[0]:this.images=this.images+","+this.append[0]:this.images=[].concat((0,a.default)(this.images.split(",")),(0,a.default)(this.append)).join();var e={id:this.id,group_id:this.group_id,title:this.title,content:this.content,phone:this.phone,tagsjson:this.tagsjson,images:this.images,type:"edit"};this.api.create(e).then((function(e){uni.showToast({title:"修改成功"}),setTimeout((function(){uni.reLaunch({url:"/pages/index/group?id="+t.group_id})}),1500)}))}}};e.default=u},"8efc":function(t,e,i){"use strict";i.r(e);var n=i("7e75"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},b7c7:function(t,e,i){"use strict";i("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return(0,n.default)(t)||(0,a.default)(t)||(0,s.default)(t)||(0,o.default)()};var n=u(i("4733")),a=u(i("d14d")),s=u(i("5d6b")),o=u(i("30f7"));function u(t){return t&&t.__esModule?t:{default:t}}},be6e:function(t,e,i){"use strict";var n=i("4968"),a=i.n(n);a.a},d14d:function(t,e,i){"use strict";i("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},i("01a2"),i("e39c"),i("bf0f"),i("844d"),i("18f7"),i("de6c"),i("08eb")},f65f:function(t,e,i){"use strict";i.r(e);var n=i("4e9a"),a=i("8efc");for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("be6e");var o=i("828b"),u=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"709acbfd",null,!1,n["a"],void 0);e["default"]=u.exports}}]);