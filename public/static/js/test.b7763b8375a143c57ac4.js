/*! hey,xc-cli */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{KTAH:function(t,n,e){var a=e("pCSS");if(typeof a==="string")a=[[t.i,a,""]];if(a.locals)t.exports=a.locals;var o=e("SZ7m").default;var i=o("31ab1702",a,false,{});if(false){}},NGUL:function(t,n,e){"use strict";var a=e("KTAH");var o=e.n(a);var i=o.a},ewyI:function(t,n,e){"use strict";var a=function(){var t=this;var n=t.$createElement;var e=t._self._c||n;return e("div",{staticClass:"home"},[t._v("\n    hello,world!\n\n    "),e("div",[e("span",{staticClass:"text home-one",on:{click:t.goPageOne}},[t._v("one")]),t._v(" "),e("span",{staticClass:"text home-two"},[t._v("two")]),t._v(" "),e("span",{staticClass:"text home-three"},[t._v("three")])]),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"data"},[t._v(t._s(t.name))]),t._v(" "),t._m(1),t._v(" "),t._m(2)])};var o=[function(){var t=this;var n=t.$createElement;var e=t._self._c||n;return e("div",{staticClass:"content"},[e("span",{staticClass:"content-a"},[t._v("contentA")]),t._v(" "),e("span",{staticClass:"content-b"},[t._v("contentB")]),t._v(" "),e("span",{staticClass:"content-c"},[t._v("contentC")])])},function(){var t=this;var n=t.$createElement;var e=t._self._c||n;return e("div",{staticClass:"canvas-wrapper"},[e("canvas",{attrs:{id:"test-canvas"}}),t._v(" "),e("img",{staticStyle:{position:"absolute",top:"-1000px",left:"-1000px"},attrs:{id:"img",src:"https://p0.meituan.net/scarlett/179002cea64a2add40fb2eeaa7bc046e19731.png"}}),t._v(" "),e("img",{staticStyle:{position:"absolute",top:"-9000px",left:"-9000px"},attrs:{id:"imgFooter",src:"https://p0.meituan.net/scarlett/1e722b6b91e529de108a88d1888839359923.png"}})])},function(){var t=this;var n=t.$createElement;var e=t._self._c||n;return e("div",{staticClass:"home-block3"},[e("div",{staticClass:"left"},[t._v("left")]),t._v(" "),e("div",{staticClass:"right"},[t._v("right")])])}];a._withStripped=true;e.d(n,"a",function(){return a});e.d(n,"b",function(){return o})},nSAd:function(t,n,e){"use strict";e.r(n);var a=e("ewyI");var o=e("zl8B");for(var i in o)if(i!=="default")(function(t){e.d(n,t,function(){return o[t]})})(i);var s=e("NGUL");var r=e("KHd+");var l=Object(r["a"])(o["default"],a["a"],a["b"],false,null,"b006b14a",null);if(false){var c}l.options.__file="src/page/home/test.vue";n["default"]=l.exports},pCSS:function(t,n,e){n=t.exports=e("JPst")(false);n.push([t.i,"body[data-v-b006b14a] {\n  margin: 0;\n}\n.home[data-v-b006b14a] {\n  color: green;\n}\n.home-one[data-v-b006b14a] {\n  color: red;\n}\n.home .text[data-v-b006b14a] {\n  font-size: 16px;\n}\n.home .text[data-v-b006b14a]:last-child {\n  font-size: 30px;\n  transform: scale(1.5);\n}\n.home .content[data-v-b006b14a] {\n  margin-top: 20px;\n  display: flex;\n  color: black;\n}\n.home .content-a[data-v-b006b14a] {\n  background: red;\n  width: 100px;\n}\n.home .content-b[data-v-b006b14a] {\n  text-align: center;\n  background: yellow;\n  flex: 1;\n}\n.home .content-c[data-v-b006b14a] {\n  width: 100px;\n  text-align: right;\n  background: green;\n}\n.home .canvas-wrapper[data-v-b006b14a] {\n  text-align: center;\n}\n.home .home-block3 .left[data-v-b006b14a] {\n  float: left;\n  height: 40px;\n  width: 80px;\n  background: yellow;\n}\n.home .home-block3 .right[data-v-b006b14a] {\n  overflow: hidden;\n  height: 50px;\n  background: #ccc;\n}\n",""])},tJEq:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:true});n.default={name:"home",data:function t(){var n=function t(){return"yemao"};return{name:n()}},mounted:function t(){console.log(window.appData);this.drawCanvas()},methods:{goPageOne:function t(){this.$router.push("/app/page/one")},drawCanvas:function t(){var n=document.getElementById("test-canvas");n.width=596;n.height=842;n.style.width="200px";n.style.height="283px";var e=n.getContext("2d");e.fillStyle="#F9BE00";e.fillRect(0,0,596,842);e.fillStyle="blue";e.fillRect(0,0,596,172);this.assetRules.forEach(function(t,n){e.textAlign="end";e.font="40px sans-serif";e.fillStyle="#040000";e.fillText("充"+t.deposit+"元",288,232+n*50);e.textAlign="start";e.font="40px sans-serif";e.fillStyle="#ff5527";e.fillText("送"+t.grant+"元",308,232+n*50)});window.img.onload=function(){e.drawImage(document.getElementById("img"),76,48)};window.imgFooter.onload=function(){e.drawImage(document.getElementById("imgFooter"),117,657)}}},computed:{assetRules:function t(){return[{deposit:100,grant:10},{deposit:1e3,grant:99},{deposit:99,grant:1},{deposit:897,grant:13}]}}}},zl8B:function(t,n,e){"use strict";e.r(n);var a=e("tJEq");var o=e.n(a);for(var i in a)if(i!=="default")(function(t){e.d(n,t,function(){return a[t]})})(i);n["default"]=o.a}}]);
//# sourceMappingURL=test.b7763b8375a143c57ac4.js.map