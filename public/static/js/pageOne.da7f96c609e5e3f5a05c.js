/*! hey,xc-cli */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"G/X9":function(t,e,a){"use strict";a.r(e);var n=a("LI92");var r=a.n(n);for(var u in n)if(u!=="default")(function(t){a.d(e,t,function(){return n[t]})})(u);e["default"]=r.a},LI92:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:true});var n=a("24Ii");var r=u(n);function u(t){return t&&t.__esModule?t:{default:t}}e.default={data:function t(){return{testData:""}},created:function t(){console.log(window.appData);this.getData()},methods:{getData:function t(){var n=this;r.default.post("/api/getdata",{name:"ym",age:67}).end(function(t,e){var a=e&&e.body;if(a.code===200){n.testData=a.data}})}}}},i4cE:function(t,e,a){"use strict";var n=function(){var t=this;var e=t.$createElement;var a=t._self._c||e;return a("div",[t._v("page one\n  "),a("div",[t._v(t._s(t.testData))])])};var r=[];n._withStripped=true;a.d(e,"a",function(){return n});a.d(e,"b",function(){return r})},rKPs:function(t,e,a){"use strict";a.r(e);var n=a("i4cE");var r=a("G/X9");for(var u in r)if(u!=="default")(function(t){a.d(e,t,function(){return r[t]})})(u);var i=a("KHd+");var o=Object(i["a"])(r["default"],n["a"],n["b"],false,null,null,null);if(false){var f}o.options.__file="src/page/home/pageOne.vue";e["default"]=o.exports}}]);
//# sourceMappingURL=pageOne.da7f96c609e5e3f5a05c.js.map