(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-auth-login"],{"00d4":function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){}));var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-button",{staticClass:"u-btn u-line-1 u-fix-ios-appearance",class:["u-size-"+e.size,e.plain?"u-btn--"+e.type+"--plain":"",e.loading?"u-loading":"","circle"==e.shape?"u-round-circle":"",e.hairLine?e.showHairLineBorder:"u-btn--bold-border","u-btn--"+e.type,e.disabled?"u-btn--"+e.type+"--disabled":""],style:[e.customStyle,{overflow:e.ripple?"hidden":"visible"}],attrs:{id:"u-wave-btn","hover-start-time":Number(e.hoverStartTime),"hover-stay-time":Number(e.hoverStayTime),disabled:e.disabled,"form-type":e.formType,"open-type":e.openType,"app-parameter":e.appParameter,"hover-stop-propagation":e.hoverStopPropagation,"send-message-title":e.sendMessageTitle,"send-message-path":"sendMessagePath",lang:e.lang,"data-name":e.dataName,"session-from":e.sessionFrom,"send-message-img":e.sendMessageImg,"show-message-card":e.showMessageCard,"hover-class":e.getHoverClass,loading:e.loading},on:{getphonenumber:function(t){arguments[0]=t=e.$handleEvent(t),e.getphonenumber.apply(void 0,arguments)},getuserinfo:function(t){arguments[0]=t=e.$handleEvent(t),e.getuserinfo.apply(void 0,arguments)},error:function(t){arguments[0]=t=e.$handleEvent(t),e.error.apply(void 0,arguments)},opensetting:function(t){arguments[0]=t=e.$handleEvent(t),e.opensetting.apply(void 0,arguments)},launchapp:function(t){arguments[0]=t=e.$handleEvent(t),e.launchapp.apply(void 0,arguments)},click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.click(t)}}},[e._t("default"),e.ripple?a("v-uni-view",{staticClass:"u-wave-ripple",class:[e.waveActive?"u-wave-active":""],style:{top:e.rippleTop+"px",left:e.rippleLeft+"px",width:e.fields.targetWidth+"px",height:e.fields.targetWidth+"px","background-color":e.rippleBgColor||"rgba(0, 0, 0, 0.15)"}}):e._e()],2)},n=[]},"29d0":function(e,t,a){var o=a("c86c");t=o(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \n */.u-btn[data-v-1ea4ff2e]::after{border:none}.u-btn[data-v-1ea4ff2e]{position:relative;border:0;display:inline-flex;overflow:visible;line-height:1;display:flex;flex-direction:row;align-items:center;justify-content:center;cursor:pointer;padding:0 %?40?%;z-index:1;box-sizing:border-box;transition:all .15s}.u-btn--bold-border[data-v-1ea4ff2e]{border:1px solid #fff}.u-btn--default[data-v-1ea4ff2e]{color:#606266;border-color:#c0c4cc;background-color:#fff}.u-btn--primary[data-v-1ea4ff2e]{color:#fff;border-color:#2979ff;background-color:#2979ff}.u-btn--success[data-v-1ea4ff2e]{color:#fff;border-color:#19be6b;background-color:#19be6b}.u-btn--error[data-v-1ea4ff2e]{color:#fff;border-color:#fa3534;background-color:#fa3534}.u-btn--warning[data-v-1ea4ff2e]{color:#fff;border-color:#f90;background-color:#f90}.u-btn--default--disabled[data-v-1ea4ff2e]{color:#fff;border-color:#e4e7ed;background-color:#fff}.u-btn--primary--disabled[data-v-1ea4ff2e]{color:#fff!important;border-color:#a0cfff!important;background-color:#a0cfff!important}.u-btn--success--disabled[data-v-1ea4ff2e]{color:#fff!important;border-color:#71d5a1!important;background-color:#71d5a1!important}.u-btn--error--disabled[data-v-1ea4ff2e]{color:#fff!important;border-color:#fab6b6!important;background-color:#fab6b6!important}.u-btn--warning--disabled[data-v-1ea4ff2e]{color:#fff!important;border-color:#fcbd71!important;background-color:#fcbd71!important}.u-btn--primary--plain[data-v-1ea4ff2e]{color:#2979ff!important;border-color:#a0cfff!important;background-color:#ecf5ff!important}.u-btn--success--plain[data-v-1ea4ff2e]{color:#19be6b!important;border-color:#71d5a1!important;background-color:#dbf1e1!important}.u-btn--error--plain[data-v-1ea4ff2e]{color:#fa3534!important;border-color:#fab6b6!important;background-color:#fef0f0!important}.u-btn--warning--plain[data-v-1ea4ff2e]{color:#f90!important;border-color:#fcbd71!important;background-color:#fdf6ec!important}.u-hairline-border[data-v-1ea4ff2e]:after{content:" ";position:absolute;pointer-events:none;box-sizing:border-box;-webkit-transform-origin:0 0;transform-origin:0 0;left:0;top:0;width:199.8%;height:199.7%;-webkit-transform:scale(.5);transform:scale(.5);border:1px solid currentColor;z-index:1}.u-wave-ripple[data-v-1ea4ff2e]{z-index:0;position:absolute;border-radius:100%;background-clip:padding-box;pointer-events:none;-webkit-user-select:none;user-select:none;-webkit-transform:scale(0);transform:scale(0);opacity:1;-webkit-transform-origin:center;transform-origin:center}.u-wave-ripple.u-wave-active[data-v-1ea4ff2e]{opacity:0;-webkit-transform:scale(2);transform:scale(2);transition:opacity 1s linear,-webkit-transform .4s linear;transition:opacity 1s linear,transform .4s linear;transition:opacity 1s linear,transform .4s linear,-webkit-transform .4s linear}.u-round-circle[data-v-1ea4ff2e]{border-radius:%?100?%}.u-round-circle[data-v-1ea4ff2e]::after{border-radius:%?100?%}.u-loading[data-v-1ea4ff2e]::after{background-color:hsla(0,0%,100%,.35)}.u-size-default[data-v-1ea4ff2e]{font-size:%?30?%;height:%?80?%;line-height:%?80?%}.u-size-medium[data-v-1ea4ff2e]{display:inline-flex;width:auto;font-size:%?26?%;height:%?70?%;line-height:%?70?%;padding:0 %?80?%}.u-size-mini[data-v-1ea4ff2e]{display:inline-flex;width:auto;font-size:%?22?%;padding-top:1px;height:%?50?%;line-height:%?50?%;padding:0 %?20?%}.u-primary-plain-hover[data-v-1ea4ff2e]{color:#fff!important;background:#2b85e4!important}.u-default-plain-hover[data-v-1ea4ff2e]{color:#2b85e4!important;background:#ecf5ff!important}.u-success-plain-hover[data-v-1ea4ff2e]{color:#fff!important;background:#18b566!important}.u-warning-plain-hover[data-v-1ea4ff2e]{color:#fff!important;background:#f29100!important}.u-error-plain-hover[data-v-1ea4ff2e]{color:#fff!important;background:#dd6161!important}.u-info-plain-hover[data-v-1ea4ff2e]{color:#fff!important;background:#82848a!important}.u-default-hover[data-v-1ea4ff2e]{color:#2b85e4!important;border-color:#2b85e4!important;background-color:#ecf5ff!important}.u-primary-hover[data-v-1ea4ff2e]{background:#2b85e4!important;color:#fff}.u-success-hover[data-v-1ea4ff2e]{background:#18b566!important;color:#fff}.u-info-hover[data-v-1ea4ff2e]{background:#82848a!important;color:#fff}.u-warning-hover[data-v-1ea4ff2e]{background:#f29100!important;color:#fff}.u-error-hover[data-v-1ea4ff2e]{background:#dd6161!important;color:#fff}',""]),e.exports=t},"61bb":function(e,t,a){"use strict";a("6a54"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5c47"),a("0506");var o={data:function(){return{account:"",password:"",checked:!1}},onShow:function(){var e=uni.getStorageSync("userInfo");0==uni.$u.test.isEmpty(null===e||void 0===e?void 0:e.token)&&uni.showModal({title:"系统提示",content:"你已经登录，请勿重复登录！",showCancel:!1,success:function(e){e.confirm&&uni.navigateBack()}})},methods:{toAgreement:function(e){uni.navigateTo({url:1==e?"/pages/system/agreement":"/pages/system/privacy"})},login:function(){return uni.$u.test.isEmpty(this.account)?uni.$u.toast("账号不能为空"):uni.$u.test.isEmpty(this.password)?uni.$u.toast("密码不能为空"):this.checked?void this.api.login({account:this.account,password:this.password}).then((function(e){uni.setStorageSync("userInfo",e.userinfo),uni.showToast({title:"登录成功"}),setTimeout((function(){uni.reLaunch({url:"/pages/index/index"})}),1500)})):uni.$u.toast("勾选协议后操作")}}};t.default=o},"6a83":function(e,t,a){var o=a("29d0");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=a("967d").default;n("5d7e56df",o,!0,{sourceMap:!1,shadowMode:!1})},"7ca2":function(e,t,a){"use strict";a.r(t);var o=a("e164"),n=a("d5e0");for(var r in n)["default"].indexOf(r)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("c8bb");var i=a("828b"),f=Object(i["a"])(n["default"],o["b"],o["c"],!1,null,"67d9f3d4",null,!1,o["a"],void 0);t["default"]=f.exports},a9e4:function(e,t,a){var o=a("c86c");t=o(!1),t.push([e.i,".logo[data-v-67d9f3d4]{width:100%;margin:%?50?% auto}.input-item[data-v-67d9f3d4]{border-bottom:solid 1px #eee;padding:%?20?%}.input-item[data-v-67d9f3d4]:hover{border-color:rgba(18,157,177,.5)}.forget[data-v-67d9f3d4]{display:flex;justify-content:space-between;padding:%?20?%;font-size:%?24?%}.agree-content[data-v-67d9f3d4]{font-size:%?24?%;color:#031140;margin:0 %?10?%}.agreement[data-v-67d9f3d4]{width:100%;height:100vh;padding:20px;box-sizing:border-box}",""]),e.exports=t},afb6:function(e,t,a){var o=a("a9e4");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=a("967d").default;n("634d22ca",o,!0,{sourceMap:!1,shadowMode:!1})},bc5f:function(e,t,a){"use strict";var o=a("6a83"),n=a.n(o);n.a},c7c7:function(e,t,a){"use strict";a.r(t);var o=a("00d4"),n=a("dfd0");for(var r in n)["default"].indexOf(r)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("bc5f");var i=a("828b"),f=Object(i["a"])(n["default"],o["b"],o["c"],!1,null,"1ea4ff2e",null,!1,o["a"],void 0);t["default"]=f.exports},c8bb:function(e,t,a){"use strict";var o=a("afb6"),n=a.n(o);n.a},d5e0:function(e,t,a){"use strict";a.r(t);var o=a("61bb"),n=a.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){a.d(t,e,(function(){return o[e]}))}(r);t["default"]=n.a},dfd0:function(e,t,a){"use strict";a.r(t);var o=a("ec53"),n=a.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){a.d(t,e,(function(){return o[e]}))}(r);t["default"]=n.a},e164:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return o}));var o={uButton:a("c7c7").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"u-p-20"},[a("v-uni-view",{staticClass:"u-p-40"},[a("v-uni-image",{staticClass:"logo",attrs:{src:"/static/imgs/logo.png",mode:"widthFix"}}),a("v-uni-input",{staticClass:"input-item",attrs:{type:"text",placeholder:"输入登录账号"},model:{value:e.account,callback:function(t){e.account=t},expression:"account"}}),a("v-uni-input",{staticClass:"input-item",attrs:{type:"password",placeholder:"输入登录密码"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),a("v-uni-view",{staticClass:"forget"},[a("v-uni-navigator",{attrs:{url:"/pages/auth/register","hover-class":"none"}},[e._v("注册账户")]),a("v-uni-navigator",{attrs:{url:"register","hover-class":"none"}},[e._v("忘记密码")])],1),a("v-uni-view",{staticClass:"u-p-t-40"},[a("u-button",{attrs:{type:"primary",shape:"circle"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.login.apply(void 0,arguments)}}},[e._v("立即登录")])],1),a("v-uni-view",{staticStyle:{"text-align":"center","margin-top":"20upx"}},[a("v-uni-label",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.checked=!e.checked}}},[a("v-uni-radio",{staticStyle:{transform:"scale(0.6)"},attrs:{checked:e.checked,color:"#129db1"}}),a("v-uni-text",{staticStyle:{color:"#999","vertical-align":"middle","font-size":"24upx"}},[e._v("我已阅读并同意"),a("v-uni-text",{staticClass:"agree-content",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toAgreement(1)}}},[e._v("用户协议")]),e._v("和"),a("v-uni-text",{staticClass:"agree-content",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toAgreement(2)}}},[e._v("隐私政策")])],1)],1)],1)],1)],1)},r=[]},ec53:function(e,t,a){"use strict";a("6a54"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("64aa"),a("5ef2"),a("bf0f"),a("5c47");var o={name:"u-button",props:{hairLine:{type:Boolean,default:!0},type:{type:String,default:"default"},size:{type:String,default:"default"},shape:{type:String,default:"square"},plain:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},openType:{type:String,default:""},formType:{type:String,default:""},appParameter:{type:String,default:""},hoverStopPropagation:{type:Boolean,default:!1},lang:{type:String,default:"en"},sessionFrom:{type:String,default:""},sendMessageTitle:{type:String,default:""},sendMessagePath:{type:String,default:""},sendMessageImg:{type:String,default:""},showMessageCard:{type:Boolean,default:!1},hoverBgColor:{type:String,default:""},rippleBgColor:{type:String,default:""},ripple:{type:Boolean,default:!1},hoverClass:{type:String,default:""},customStyle:{type:Object,default:function(){return{}}},dataName:{type:String,default:""},throttleTime:{type:[String,Number],default:1e3},hoverStartTime:{type:[String,Number],default:20},hoverStayTime:{type:[String,Number],default:150}},computed:{getHoverClass:function(){if(this.loading||this.disabled||this.ripple||this.hoverClass)return"";var e;return e=this.plain?"u-"+this.type+"-plain-hover":"u-"+this.type+"-hover",e},showHairLineBorder:function(){return["primary","success","error","warning"].indexOf(this.type)>=0&&!this.plain?"":"u-hairline-border"}},data:function(){return{rippleTop:0,rippleLeft:0,fields:{},waveActive:!1}},methods:{click:function(e){var t=this;this.$u.throttle((function(){!0!==t.loading&&!0!==t.disabled&&(t.ripple&&(t.waveActive=!1,t.$nextTick((function(){this.getWaveQuery(e)}))),t.$emit("click",e))}),this.throttleTime)},getWaveQuery:function(e){var t=this;this.getElQuery().then((function(a){var o=a[0];if(o.width&&o.width&&(o.targetWidth=o.height>o.width?o.height:o.width,o.targetWidth)){t.fields=o;var n,r;n=e.touches[0].clientX,r=e.touches[0].clientY,t.rippleTop=r-o.top-o.targetWidth/2,t.rippleLeft=n-o.left-o.targetWidth/2,t.$nextTick((function(){t.waveActive=!0}))}}))},getElQuery:function(){var e=this;return new Promise((function(t){var a="";a=uni.createSelectorQuery().in(e),a.select(".u-btn").boundingClientRect(),a.exec((function(e){t(e)}))}))},getphonenumber:function(e){this.$emit("getphonenumber",e)},getuserinfo:function(e){this.$emit("getuserinfo",e)},error:function(e){this.$emit("error",e)},opensetting:function(e){this.$emit("opensetting",e)},launchapp:function(e){this.$emit("launchapp",e)}}};t.default=o}}]);