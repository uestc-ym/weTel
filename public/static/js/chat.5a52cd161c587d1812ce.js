/*! hey,xc-cli */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[0],{0:function(t,e){},"0JDW":function(t,e,s){"use strict";s.r(e);var a=s("u55l");var n=s.n(a);for(var i in a)if(i!=="default")(function(t){s.d(e,t,function(){return a[t]})})(i);e["default"]=n.a},"4Ztt":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:true});var a=s("rJAk");Object.defineProperty(e,"default",{enumerable:true,get:function t(){return n(a).default}});function n(t){return t&&t.__esModule?t:{default:t}}},"8I3Y":function(t,e,s){"use strict";var a=function(){var t=this;var e=t.$createElement;var s=t._self._c||e;return s("transition",{attrs:{name:"mint-toast-pop"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"mint-toast",class:t.customClass,style:{padding:t.iconClass===""?"10px":"20px"}},[t.iconClass!==""?s("i",{staticClass:"mint-toast-icon",class:t.iconClass}):t._e(),t._v(" "),s("span",{staticClass:"mint-toast-text",style:{"padding-top":t.iconClass===""?"0":"10px"}},[t._v(t._s(t.message))])])])};var n=[];a._withStripped=true;s.d(e,"a",function(){return a});s.d(e,"b",function(){return n})},GDmp:function(t,e){},Hwc4:function(t,e,s){"use strict";var a=s("GDmp");var n=s.n(a);var i=n.a},Tgqe:function(t,e,s){"use strict";s.r(e);var a=s("vP7j");var n=s("urob");for(var i in n)if(i!=="default")(function(t){s.d(e,t,function(){return n[t]})})(i);var r=s("igdp");var u=s("KHd+");var o=Object(u["a"])(n["default"],a["a"],a["b"],false,null,"42042321",null);if(false){var c}o.options.__file="src/page/home/chat.vue";e["default"]=o.exports},XcHQ:function(t,e,s){"use strict";s.r(e);var a=s("8I3Y");var n=s("0JDW");for(var i in n)if(i!=="default")(function(t){s.d(e,t,function(){return n[t]})})(i);var r=s("Hwc4");var u=s("KHd+");var o=Object(u["a"])(n["default"],a["a"],a["b"],false,null,null,null);if(false){var c}o.options.__file="src/client/component/Vue/mint/toast/src/toast.vue";e["default"]=o.exports},b1DP:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:true});var a=s("24Ii");var i=c(a);var n=s("4Ztt");var r=c(n);var u=s("gFX4");var o=c(u);function c(t){return t&&t.__esModule?t:{default:t}}var l=void 0;e.default={data:function t(){return{inputMsg:"",messages:[]}},activated:function t(){document.body.style.background="#ddd";var e=this.toUserName;document.title=e;this.getMessages()},deactivated:function t(){document.body.style.background="#fff"},created:function t(){var a=this;l=(0,o.default)("http://14f.fe.dev.sankuai.com/chat");l.on("getMsg",function(t){var e=t&&t.msg||{};var s=e.from===a.userName&&e.to===a.toUserName||e.from===a.toUserName&&e.to===a.userName;if(!s){return}if(t.code!==200){(0,r.default)("消息发送失败")}else{a.inputMsg="";a.messages=a.messages.concat(t.msg)}})},computed:{userName:function t(){return window.user.name},toUserName:function t(){return this.$route.query.toUserName},defaultProfile:function t(){return"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564931888461&di=4e095b77b7e16cab3c0516292caf116f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F56%2F69%2F585747cfd354024.jpg"}},methods:{sendMsg:function t(){var e={from:this.userName,to:this.toUserName,content:this.inputMsg,createdTime:+new Date};l.emit("sendMsg",e)},isSelfMsg:function t(e){return e===this.userName},getMessages:function t(){var n=this;var e={to:this.toUserName};i.default.get("/api/getmessages",e).end(function(t,e){var s=e&&e.body;if(s.code===200){n.messages=s.data}else{var a=t&&t.message||s.error;(0,r.default)(a)}})}}}},igdp:function(t,e,s){"use strict";var a=s("tBd3");var n=s.n(a);var i=n.a},rJAk:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:true});var a=s("oCYn");var n=u(a);var i=s("XcHQ");var r=u(i);function u(t){return t&&t.__esModule?t:{default:t}}var o=n.default.extend(r.default);var c=[];var l=function t(){if(c.length>0){var e=c[0];c.splice(0,1);return e}return new o({el:document.createElement("div")})};var f=function t(e){if(e){c.push(e)}};var d=function t(e){if(e.target.parentNode){e.target.parentNode.removeChild(e.target)}};o.prototype.close=function(){this.visible=false;this.$el.addEventListener("transitionend",d);this.closed=true;f(this)};var v=function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var s=e.duration||3e3;var a=l();a.closed=false;clearTimeout(a.timer);a.message=typeof e==="string"?e:e.message;a.position=e.position||"middle";a.className=e.className||"";a.iconClass=e.iconClass||"";document.body.appendChild(a.$el);n.default.nextTick(function(){a.visible=true;a.$el.removeEventListener("transitionend",d);~s&&(a.timer=setTimeout(function(){if(a.closed)return;a.close()},s))});return a};e.default=v},tBd3:function(t,e){},u55l:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default={props:{message:String,className:{type:String,default:""},position:{type:String,default:"middle"},iconClass:{type:String,default:""}},data:function t(){return{visible:false}},computed:{customClass:function t(){var e=[];switch(this.position){case"top":e.push("is-placetop");break;case"bottom":e.push("is-placebottom");break;default:e.push("is-placemiddle")}e.push(this.className);return e.join(" ")}}}},urob:function(t,e,s){"use strict";s.r(e);var a=s("b1DP");var n=s.n(a);for(var i in a)if(i!=="default")(function(t){s.d(e,t,function(){return a[t]})})(i);e["default"]=n.a},vP7j:function(t,e,s){"use strict";var a=function(){var s=this;var t=s.$createElement;var a=s._self._c||t;return a("div",{staticClass:"chatPage"},[a("div",{staticClass:"content"},s._l(s.messages,function(t,e){return a("div",{key:e,class:"item "+(s.isSelfMsg(t.from)?"right":"left")},[a("img",{staticClass:"profile",attrs:{src:t.profile||s.defaultProfile}}),s._v(" "),a("div",{staticClass:"msg"},[s._v(s._s(t.content))])])}),0),s._v(" "),a("div",{staticStyle:{height:"50px","padding-bottom":"env(safe-area-inset-bottom)"}}),s._v(" "),a("div",{staticClass:"footer"},[a("input",{directives:[{name:"model",rawName:"v-model",value:s.inputMsg,expression:"inputMsg"}],staticClass:"input",domProps:{value:s.inputMsg},on:{input:function(t){if(t.target.composing){return}s.inputMsg=t.target.value}}}),s._v(" "),a("a",{staticClass:"send",on:{click:s.sendMsg}},[s._v("发送")])])])};var n=[];a._withStripped=true;s.d(e,"a",function(){return a});s.d(e,"b",function(){return n})}}]);
//# sourceMappingURL=chat.5a52cd161c587d1812ce.js.map