(function(){const L=document.createElement("link").relList;if(L&&L.supports&&L.supports("modulepreload"))return;for(const $ of document.querySelectorAll('link[rel="modulepreload"]'))H($);new MutationObserver($=>{for(const U of $)if(U.type==="childList")for(const q of U.addedNodes)q.tagName==="LINK"&&q.rel==="modulepreload"&&H(q)}).observe(document,{childList:!0,subtree:!0});function c($){const U={};return $.integrity&&(U.integrity=$.integrity),$.referrerPolicy&&(U.referrerPolicy=$.referrerPolicy),$.crossOrigin==="use-credentials"?U.credentials="include":$.crossOrigin==="anonymous"?U.credentials="omit":U.credentials="same-origin",U}function H($){if($.ep)return;$.ep=!0;const U=c($);fetch($.href,U)}})();function Hf(v){return v&&v.__esModule&&Object.prototype.hasOwnProperty.call(v,"default")?v.default:v}var zi={exports:{}},xr={},Pi={exports:{}},A={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ls;function Wf(){if(Ls)return A;Ls=1;var v=Symbol.for("react.element"),L=Symbol.for("react.portal"),c=Symbol.for("react.fragment"),H=Symbol.for("react.strict_mode"),$=Symbol.for("react.profiler"),U=Symbol.for("react.provider"),q=Symbol.for("react.context"),se=Symbol.for("react.forward_ref"),Y=Symbol.for("react.suspense"),me=Symbol.for("react.memo"),ce=Symbol.for("react.lazy"),b=Symbol.iterator;function G(f){return f===null||typeof f!="object"?null:(f=b&&f[b]||f["@@iterator"],typeof f=="function"?f:null)}var Me={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ne=Object.assign,Q={};function X(f,y,h){this.props=f,this.context=y,this.refs=Q,this.updater=h||Me}X.prototype.isReactComponent={},X.prototype.setState=function(f,y){if(typeof f!="object"&&typeof f!="function"&&f!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,f,y,"setState")},X.prototype.forceUpdate=function(f){this.updater.enqueueForceUpdate(this,f,"forceUpdate")};function Se(){}Se.prototype=X.prototype;function ze(f,y,h){this.props=f,this.context=y,this.refs=Q,this.updater=h||Me}var $e=ze.prototype=new Se;$e.constructor=ze,Ne($e,X.prototype),$e.isPureReactComponent=!0;var fe=Array.isArray,Ye=Object.prototype.hasOwnProperty,Pe={current:null},ge={key:!0,ref:!0,__self:!0,__source:!0};function Ee(f,y,h){var S,M={},I=null,B=null;if(y!=null)for(S in y.ref!==void 0&&(B=y.ref),y.key!==void 0&&(I=""+y.key),y)Ye.call(y,S)&&!ge.hasOwnProperty(S)&&(M[S]=y[S]);var V=arguments.length-2;if(V===1)M.children=h;else if(1<V){for(var re=Array(V),qe=0;qe<V;qe++)re[qe]=arguments[qe+2];M.children=re}if(f&&f.defaultProps)for(S in V=f.defaultProps,V)M[S]===void 0&&(M[S]=V[S]);return{$$typeof:v,type:f,key:I,ref:B,props:M,_owner:Pe.current}}function Ae(f,y){return{$$typeof:v,type:f.type,key:y,ref:f.ref,props:f.props,_owner:f._owner}}function Xe(f){return typeof f=="object"&&f!==null&&f.$$typeof===v}function ht(f){var y={"=":"=0",":":"=2"};return"$"+f.replace(/[=:]/g,function(h){return y[h]})}var Ge=/\/+/g;function Ie(f,y){return typeof f=="object"&&f!==null&&f.key!=null?ht(""+f.key):y.toString(36)}function Je(f,y,h,S,M){var I=typeof f;(I==="undefined"||I==="boolean")&&(f=null);var B=!1;if(f===null)B=!0;else switch(I){case"string":case"number":B=!0;break;case"object":switch(f.$$typeof){case v:case L:B=!0}}if(B)return B=f,M=M(B),f=S===""?"."+Ie(B,0):S,fe(M)?(h="",f!=null&&(h=f.replace(Ge,"$&/")+"/"),Je(M,y,h,"",function(qe){return qe})):M!=null&&(Xe(M)&&(M=Ae(M,h+(!M.key||B&&B.key===M.key?"":(""+M.key).replace(Ge,"$&/")+"/")+f)),y.push(M)),1;if(B=0,S=S===""?".":S+":",fe(f))for(var V=0;V<f.length;V++){I=f[V];var re=S+Ie(I,V);B+=Je(I,y,h,re,M)}else if(re=G(f),typeof re=="function")for(f=re.call(f),V=0;!(I=f.next()).done;)I=I.value,re=S+Ie(I,V++),B+=Je(I,y,h,re,M);else if(I==="object")throw y=String(f),Error("Objects are not valid as a React child (found: "+(y==="[object Object]"?"object with keys {"+Object.keys(f).join(", ")+"}":y)+"). If you meant to render a collection of children, use an array instead.");return B}function Le(f,y,h){if(f==null)return f;var S=[],M=0;return Je(f,S,"","",function(I){return y.call(h,I,M++)}),S}function Te(f){if(f._status===-1){var y=f._result;y=y(),y.then(function(h){(f._status===0||f._status===-1)&&(f._status=1,f._result=h)},function(h){(f._status===0||f._status===-1)&&(f._status=2,f._result=h)}),f._status===-1&&(f._status=0,f._result=y)}if(f._status===1)return f._result.default;throw f._result}var ne={current:null},E={transition:null},R={ReactCurrentDispatcher:ne,ReactCurrentBatchConfig:E,ReactCurrentOwner:Pe};function N(){throw Error("act(...) is not supported in production builds of React.")}return A.Children={map:Le,forEach:function(f,y,h){Le(f,function(){y.apply(this,arguments)},h)},count:function(f){var y=0;return Le(f,function(){y++}),y},toArray:function(f){return Le(f,function(y){return y})||[]},only:function(f){if(!Xe(f))throw Error("React.Children.only expected to receive a single React element child.");return f}},A.Component=X,A.Fragment=c,A.Profiler=$,A.PureComponent=ze,A.StrictMode=H,A.Suspense=Y,A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=R,A.act=N,A.cloneElement=function(f,y,h){if(f==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+f+".");var S=Ne({},f.props),M=f.key,I=f.ref,B=f._owner;if(y!=null){if(y.ref!==void 0&&(I=y.ref,B=Pe.current),y.key!==void 0&&(M=""+y.key),f.type&&f.type.defaultProps)var V=f.type.defaultProps;for(re in y)Ye.call(y,re)&&!ge.hasOwnProperty(re)&&(S[re]=y[re]===void 0&&V!==void 0?V[re]:y[re])}var re=arguments.length-2;if(re===1)S.children=h;else if(1<re){V=Array(re);for(var qe=0;qe<re;qe++)V[qe]=arguments[qe+2];S.children=V}return{$$typeof:v,type:f.type,key:M,ref:I,props:S,_owner:B}},A.createContext=function(f){return f={$$typeof:q,_currentValue:f,_currentValue2:f,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},f.Provider={$$typeof:U,_context:f},f.Consumer=f},A.createElement=Ee,A.createFactory=function(f){var y=Ee.bind(null,f);return y.type=f,y},A.createRef=function(){return{current:null}},A.forwardRef=function(f){return{$$typeof:se,render:f}},A.isValidElement=Xe,A.lazy=function(f){return{$$typeof:ce,_payload:{_status:-1,_result:f},_init:Te}},A.memo=function(f,y){return{$$typeof:me,type:f,compare:y===void 0?null:y}},A.startTransition=function(f){var y=E.transition;E.transition={};try{f()}finally{E.transition=y}},A.unstable_act=N,A.useCallback=function(f,y){return ne.current.useCallback(f,y)},A.useContext=function(f){return ne.current.useContext(f)},A.useDebugValue=function(){},A.useDeferredValue=function(f){return ne.current.useDeferredValue(f)},A.useEffect=function(f,y){return ne.current.useEffect(f,y)},A.useId=function(){return ne.current.useId()},A.useImperativeHandle=function(f,y,h){return ne.current.useImperativeHandle(f,y,h)},A.useInsertionEffect=function(f,y){return ne.current.useInsertionEffect(f,y)},A.useLayoutEffect=function(f,y){return ne.current.useLayoutEffect(f,y)},A.useMemo=function(f,y){return ne.current.useMemo(f,y)},A.useReducer=function(f,y,h){return ne.current.useReducer(f,y,h)},A.useRef=function(f){return ne.current.useRef(f)},A.useState=function(f){return ne.current.useState(f)},A.useSyncExternalStore=function(f,y,h){return ne.current.useSyncExternalStore(f,y,h)},A.useTransition=function(){return ne.current.useTransition()},A.version="18.3.1",A}var Ts;function Oi(){return Ts||(Ts=1,Pi.exports=Wf()),Pi.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var js;function Qf(){if(js)return xr;js=1;var v=Oi(),L=Symbol.for("react.element"),c=Symbol.for("react.fragment"),H=Object.prototype.hasOwnProperty,$=v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,U={key:!0,ref:!0,__self:!0,__source:!0};function q(se,Y,me){var ce,b={},G=null,Me=null;me!==void 0&&(G=""+me),Y.key!==void 0&&(G=""+Y.key),Y.ref!==void 0&&(Me=Y.ref);for(ce in Y)H.call(Y,ce)&&!U.hasOwnProperty(ce)&&(b[ce]=Y[ce]);if(se&&se.defaultProps)for(ce in Y=se.defaultProps,Y)b[ce]===void 0&&(b[ce]=Y[ce]);return{$$typeof:L,type:se,key:G,ref:Me,props:b,_owner:$.current}}return xr.Fragment=c,xr.jsx=q,xr.jsxs=q,xr}var Rs;function Kf(){return Rs||(Rs=1,zi.exports=Qf()),zi.exports}var C=Kf(),ue=Oi();const Yf=Hf(ue);var Tl={},Li={exports:{}},Ke={},Ti={exports:{}},ji={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ds;function Xf(){return Ds||(Ds=1,(function(v){function L(E,R){var N=E.length;E.push(R);e:for(;0<N;){var f=N-1>>>1,y=E[f];if(0<$(y,R))E[f]=R,E[N]=y,N=f;else break e}}function c(E){return E.length===0?null:E[0]}function H(E){if(E.length===0)return null;var R=E[0],N=E.pop();if(N!==R){E[0]=N;e:for(var f=0,y=E.length,h=y>>>1;f<h;){var S=2*(f+1)-1,M=E[S],I=S+1,B=E[I];if(0>$(M,N))I<y&&0>$(B,M)?(E[f]=B,E[I]=N,f=I):(E[f]=M,E[S]=N,f=S);else if(I<y&&0>$(B,N))E[f]=B,E[I]=N,f=I;else break e}}return R}function $(E,R){var N=E.sortIndex-R.sortIndex;return N!==0?N:E.id-R.id}if(typeof performance=="object"&&typeof performance.now=="function"){var U=performance;v.unstable_now=function(){return U.now()}}else{var q=Date,se=q.now();v.unstable_now=function(){return q.now()-se}}var Y=[],me=[],ce=1,b=null,G=3,Me=!1,Ne=!1,Q=!1,X=typeof setTimeout=="function"?setTimeout:null,Se=typeof clearTimeout=="function"?clearTimeout:null,ze=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function $e(E){for(var R=c(me);R!==null;){if(R.callback===null)H(me);else if(R.startTime<=E)H(me),R.sortIndex=R.expirationTime,L(Y,R);else break;R=c(me)}}function fe(E){if(Q=!1,$e(E),!Ne)if(c(Y)!==null)Ne=!0,Te(Ye);else{var R=c(me);R!==null&&ne(fe,R.startTime-E)}}function Ye(E,R){Ne=!1,Q&&(Q=!1,Se(Ee),Ee=-1),Me=!0;var N=G;try{for($e(R),b=c(Y);b!==null&&(!(b.expirationTime>R)||E&&!ht());){var f=b.callback;if(typeof f=="function"){b.callback=null,G=b.priorityLevel;var y=f(b.expirationTime<=R);R=v.unstable_now(),typeof y=="function"?b.callback=y:b===c(Y)&&H(Y),$e(R)}else H(Y);b=c(Y)}if(b!==null)var h=!0;else{var S=c(me);S!==null&&ne(fe,S.startTime-R),h=!1}return h}finally{b=null,G=N,Me=!1}}var Pe=!1,ge=null,Ee=-1,Ae=5,Xe=-1;function ht(){return!(v.unstable_now()-Xe<Ae)}function Ge(){if(ge!==null){var E=v.unstable_now();Xe=E;var R=!0;try{R=ge(!0,E)}finally{R?Ie():(Pe=!1,ge=null)}}else Pe=!1}var Ie;if(typeof ze=="function")Ie=function(){ze(Ge)};else if(typeof MessageChannel<"u"){var Je=new MessageChannel,Le=Je.port2;Je.port1.onmessage=Ge,Ie=function(){Le.postMessage(null)}}else Ie=function(){X(Ge,0)};function Te(E){ge=E,Pe||(Pe=!0,Ie())}function ne(E,R){Ee=X(function(){E(v.unstable_now())},R)}v.unstable_IdlePriority=5,v.unstable_ImmediatePriority=1,v.unstable_LowPriority=4,v.unstable_NormalPriority=3,v.unstable_Profiling=null,v.unstable_UserBlockingPriority=2,v.unstable_cancelCallback=function(E){E.callback=null},v.unstable_continueExecution=function(){Ne||Me||(Ne=!0,Te(Ye))},v.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ae=0<E?Math.floor(1e3/E):5},v.unstable_getCurrentPriorityLevel=function(){return G},v.unstable_getFirstCallbackNode=function(){return c(Y)},v.unstable_next=function(E){switch(G){case 1:case 2:case 3:var R=3;break;default:R=G}var N=G;G=R;try{return E()}finally{G=N}},v.unstable_pauseExecution=function(){},v.unstable_requestPaint=function(){},v.unstable_runWithPriority=function(E,R){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var N=G;G=E;try{return R()}finally{G=N}},v.unstable_scheduleCallback=function(E,R,N){var f=v.unstable_now();switch(typeof N=="object"&&N!==null?(N=N.delay,N=typeof N=="number"&&0<N?f+N:f):N=f,E){case 1:var y=-1;break;case 2:y=250;break;case 5:y=1073741823;break;case 4:y=1e4;break;default:y=5e3}return y=N+y,E={id:ce++,callback:R,priorityLevel:E,startTime:N,expirationTime:y,sortIndex:-1},N>f?(E.sortIndex=N,L(me,E),c(Y)===null&&E===c(me)&&(Q?(Se(Ee),Ee=-1):Q=!0,ne(fe,N-f))):(E.sortIndex=y,L(Y,E),Ne||Me||(Ne=!0,Te(Ye))),E},v.unstable_shouldYield=ht,v.unstable_wrapCallback=function(E){var R=G;return function(){var N=G;G=R;try{return E.apply(this,arguments)}finally{G=N}}}})(ji)),ji}var Os;function Gf(){return Os||(Os=1,Ti.exports=Xf()),Ti.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ms;function Jf(){if(Ms)return Ke;Ms=1;var v=Oi(),L=Gf();function c(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var H=new Set,$={};function U(e,t){q(e,t),q(e+"Capture",t)}function q(e,t){for($[e]=t,e=0;e<t.length;e++)H.add(t[e])}var se=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Y=Object.prototype.hasOwnProperty,me=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ce={},b={};function G(e){return Y.call(b,e)?!0:Y.call(ce,e)?!1:me.test(e)?b[e]=!0:(ce[e]=!0,!1)}function Me(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ne(e,t,n,r){if(t===null||typeof t>"u"||Me(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Q(e,t,n,r,l,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var X={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){X[e]=new Q(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];X[t]=new Q(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){X[e]=new Q(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){X[e]=new Q(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){X[e]=new Q(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){X[e]=new Q(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){X[e]=new Q(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){X[e]=new Q(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){X[e]=new Q(e,5,!1,e.toLowerCase(),null,!1,!1)});var Se=/[\-:]([a-z])/g;function ze(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Se,ze);X[t]=new Q(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Se,ze);X[t]=new Q(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Se,ze);X[t]=new Q(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){X[e]=new Q(e,1,!1,e.toLowerCase(),null,!1,!1)}),X.xlinkHref=new Q("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){X[e]=new Q(e,1,!1,e.toLowerCase(),null,!0,!0)});function $e(e,t,n,r){var l=X.hasOwnProperty(t)?X[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ne(t,n,l,r)&&(n=null),r||l===null?G(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var fe=v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ye=Symbol.for("react.element"),Pe=Symbol.for("react.portal"),ge=Symbol.for("react.fragment"),Ee=Symbol.for("react.strict_mode"),Ae=Symbol.for("react.profiler"),Xe=Symbol.for("react.provider"),ht=Symbol.for("react.context"),Ge=Symbol.for("react.forward_ref"),Ie=Symbol.for("react.suspense"),Je=Symbol.for("react.suspense_list"),Le=Symbol.for("react.memo"),Te=Symbol.for("react.lazy"),ne=Symbol.for("react.offscreen"),E=Symbol.iterator;function R(e){return e===null||typeof e!="object"?null:(e=E&&e[E]||e["@@iterator"],typeof e=="function"?e:null)}var N=Object.assign,f;function y(e){if(f===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);f=t&&t[1]||""}return`
`+f+e}var h=!1;function S(e,t){if(!e||h)return"";h=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(m){var r=m}Reflect.construct(e,[],t)}else{try{t.call()}catch(m){r=m}e.call(t.prototype)}else{try{throw Error()}catch(m){r=m}e()}}catch(m){if(m&&r&&typeof m.stack=="string"){for(var l=m.stack.split(`
`),o=r.stack.split(`
`),i=l.length-1,u=o.length-1;1<=i&&0<=u&&l[i]!==o[u];)u--;for(;1<=i&&0<=u;i--,u--)if(l[i]!==o[u]){if(i!==1||u!==1)do if(i--,u--,0>u||l[i]!==o[u]){var a=`
`+l[i].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=i&&0<=u);break}}}finally{h=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?y(e):""}function M(e){switch(e.tag){case 5:return y(e.type);case 16:return y("Lazy");case 13:return y("Suspense");case 19:return y("SuspenseList");case 0:case 2:case 15:return e=S(e.type,!1),e;case 11:return e=S(e.type.render,!1),e;case 1:return e=S(e.type,!0),e;default:return""}}function I(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ge:return"Fragment";case Pe:return"Portal";case Ae:return"Profiler";case Ee:return"StrictMode";case Ie:return"Suspense";case Je:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ht:return(e.displayName||"Context")+".Consumer";case Xe:return(e._context.displayName||"Context")+".Provider";case Ge:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Le:return t=e.displayName||null,t!==null?t:I(e.type)||"Memo";case Te:t=e._payload,e=e._init;try{return I(e(t))}catch{}}return null}function B(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return I(t);case 8:return t===Ee?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function V(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function re(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function qe(e){var t=re(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function wr(e){e._valueTracker||(e._valueTracker=qe(e))}function Mi(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=re(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function kr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Dl(e,t){var n=t.checked;return N({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ii(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=V(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Fi(e,t){t=t.checked,t!=null&&$e(e,"checked",t,!1)}function Ol(e,t){Fi(e,t);var n=V(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ml(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ml(e,t.type,V(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ui(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ml(e,t,n){(t!=="number"||kr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var On=Array.isArray;function an(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+V(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Il(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(c(91));return N({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function $i(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(c(92));if(On(n)){if(1<n.length)throw Error(c(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:V(n)}}function Ai(e,t){var n=V(t.value),r=V(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Bi(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Vi(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Fl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Vi(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Sr,Hi=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Sr=Sr||document.createElement("div"),Sr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Sr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Mn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var In={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ks=["Webkit","ms","Moz","O"];Object.keys(In).forEach(function(e){Ks.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),In[t]=In[e]})});function Wi(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||In.hasOwnProperty(e)&&In[e]?(""+t).trim():t+"px"}function Qi(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Wi(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var Ys=N({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ul(e,t){if(t){if(Ys[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(c(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(c(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(c(61))}if(t.style!=null&&typeof t.style!="object")throw Error(c(62))}}function $l(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Al=null;function Bl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Vl=null,sn=null,cn=null;function Ki(e){if(e=lr(e)){if(typeof Vl!="function")throw Error(c(280));var t=e.stateNode;t&&(t=Qr(t),Vl(e.stateNode,e.type,t))}}function Yi(e){sn?cn?cn.push(e):cn=[e]:sn=e}function Xi(){if(sn){var e=sn,t=cn;if(cn=sn=null,Ki(e),t)for(e=0;e<t.length;e++)Ki(t[e])}}function Gi(e,t){return e(t)}function Ji(){}var Hl=!1;function qi(e,t,n){if(Hl)return e(t,n);Hl=!0;try{return Gi(e,t,n)}finally{Hl=!1,(sn!==null||cn!==null)&&(Ji(),Xi())}}function Fn(e,t){var n=e.stateNode;if(n===null)return null;var r=Qr(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(c(231,t,typeof n));return n}var Wl=!1;if(se)try{var Un={};Object.defineProperty(Un,"passive",{get:function(){Wl=!0}}),window.addEventListener("test",Un,Un),window.removeEventListener("test",Un,Un)}catch{Wl=!1}function Xs(e,t,n,r,l,o,i,u,a){var m=Array.prototype.slice.call(arguments,3);try{t.apply(n,m)}catch(x){this.onError(x)}}var $n=!1,Er=null,Cr=!1,Ql=null,Gs={onError:function(e){$n=!0,Er=e}};function Js(e,t,n,r,l,o,i,u,a){$n=!1,Er=null,Xs.apply(Gs,arguments)}function qs(e,t,n,r,l,o,i,u,a){if(Js.apply(this,arguments),$n){if($n){var m=Er;$n=!1,Er=null}else throw Error(c(198));Cr||(Cr=!0,Ql=m)}}function Xt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Zi(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function bi(e){if(Xt(e)!==e)throw Error(c(188))}function Zs(e){var t=e.alternate;if(!t){if(t=Xt(e),t===null)throw Error(c(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return bi(l),e;if(o===r)return bi(l),t;o=o.sibling}throw Error(c(188))}if(n.return!==r.return)n=l,r=o;else{for(var i=!1,u=l.child;u;){if(u===n){i=!0,n=l,r=o;break}if(u===r){i=!0,r=l,n=o;break}u=u.sibling}if(!i){for(u=o.child;u;){if(u===n){i=!0,n=o,r=l;break}if(u===r){i=!0,r=o,n=l;break}u=u.sibling}if(!i)throw Error(c(189))}}if(n.alternate!==r)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?e:t}function eu(e){return e=Zs(e),e!==null?tu(e):null}function tu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=tu(e);if(t!==null)return t;e=e.sibling}return null}var nu=L.unstable_scheduleCallback,ru=L.unstable_cancelCallback,bs=L.unstable_shouldYield,ec=L.unstable_requestPaint,de=L.unstable_now,tc=L.unstable_getCurrentPriorityLevel,Kl=L.unstable_ImmediatePriority,lu=L.unstable_UserBlockingPriority,_r=L.unstable_NormalPriority,nc=L.unstable_LowPriority,ou=L.unstable_IdlePriority,Nr=null,vt=null;function rc(e){if(vt&&typeof vt.onCommitFiberRoot=="function")try{vt.onCommitFiberRoot(Nr,e,void 0,(e.current.flags&128)===128)}catch{}}var at=Math.clz32?Math.clz32:ic,lc=Math.log,oc=Math.LN2;function ic(e){return e>>>=0,e===0?32:31-(lc(e)/oc|0)|0}var zr=64,Pr=4194304;function An(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Lr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var u=i&~l;u!==0?r=An(u):(o&=i,o!==0&&(r=An(o)))}else i=n&~l,i!==0?r=An(i):o!==0&&(r=An(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-at(t),l=1<<n,r|=e[n],t&=~l;return r}function uc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ac(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-at(o),u=1<<i,a=l[i];a===-1?((u&n)===0||(u&r)!==0)&&(l[i]=uc(u,t)):a<=t&&(e.expiredLanes|=u),o&=~u}}function Yl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function iu(){var e=zr;return zr<<=1,(zr&4194240)===0&&(zr=64),e}function Xl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Bn(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-at(t),e[t]=n}function sc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-at(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function Gl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-at(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var J=0;function uu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var au,Jl,su,cu,fu,ql=!1,Tr=[],Lt=null,Tt=null,jt=null,Vn=new Map,Hn=new Map,Rt=[],cc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function du(e,t){switch(e){case"focusin":case"focusout":Lt=null;break;case"dragenter":case"dragleave":Tt=null;break;case"mouseover":case"mouseout":jt=null;break;case"pointerover":case"pointerout":Vn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Hn.delete(t.pointerId)}}function Wn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=lr(t),t!==null&&Jl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function fc(e,t,n,r,l){switch(t){case"focusin":return Lt=Wn(Lt,e,t,n,r,l),!0;case"dragenter":return Tt=Wn(Tt,e,t,n,r,l),!0;case"mouseover":return jt=Wn(jt,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return Vn.set(o,Wn(Vn.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,Hn.set(o,Wn(Hn.get(o)||null,e,t,n,r,l)),!0}return!1}function pu(e){var t=Gt(e.target);if(t!==null){var n=Xt(t);if(n!==null){if(t=n.tag,t===13){if(t=Zi(n),t!==null){e.blockedOn=t,fu(e.priority,function(){su(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function jr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Al=r,n.target.dispatchEvent(r),Al=null}else return t=lr(n),t!==null&&Jl(t),e.blockedOn=n,!1;t.shift()}return!0}function mu(e,t,n){jr(e)&&n.delete(t)}function dc(){ql=!1,Lt!==null&&jr(Lt)&&(Lt=null),Tt!==null&&jr(Tt)&&(Tt=null),jt!==null&&jr(jt)&&(jt=null),Vn.forEach(mu),Hn.forEach(mu)}function Qn(e,t){e.blockedOn===t&&(e.blockedOn=null,ql||(ql=!0,L.unstable_scheduleCallback(L.unstable_NormalPriority,dc)))}function Kn(e){function t(l){return Qn(l,e)}if(0<Tr.length){Qn(Tr[0],e);for(var n=1;n<Tr.length;n++){var r=Tr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Lt!==null&&Qn(Lt,e),Tt!==null&&Qn(Tt,e),jt!==null&&Qn(jt,e),Vn.forEach(t),Hn.forEach(t),n=0;n<Rt.length;n++)r=Rt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Rt.length&&(n=Rt[0],n.blockedOn===null);)pu(n),n.blockedOn===null&&Rt.shift()}var fn=fe.ReactCurrentBatchConfig,Rr=!0;function pc(e,t,n,r){var l=J,o=fn.transition;fn.transition=null;try{J=1,Zl(e,t,n,r)}finally{J=l,fn.transition=o}}function mc(e,t,n,r){var l=J,o=fn.transition;fn.transition=null;try{J=4,Zl(e,t,n,r)}finally{J=l,fn.transition=o}}function Zl(e,t,n,r){if(Rr){var l=bl(e,t,n,r);if(l===null)yo(e,t,r,Dr,n),du(e,r);else if(fc(l,e,t,n,r))r.stopPropagation();else if(du(e,r),t&4&&-1<cc.indexOf(e)){for(;l!==null;){var o=lr(l);if(o!==null&&au(o),o=bl(e,t,n,r),o===null&&yo(e,t,r,Dr,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else yo(e,t,r,null,n)}}var Dr=null;function bl(e,t,n,r){if(Dr=null,e=Bl(r),e=Gt(e),e!==null)if(t=Xt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Zi(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Dr=e,null}function hu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(tc()){case Kl:return 1;case lu:return 4;case _r:case nc:return 16;case ou:return 536870912;default:return 16}default:return 16}}var Dt=null,eo=null,Or=null;function vu(){if(Or)return Or;var e,t=eo,n=t.length,r,l="value"in Dt?Dt.value:Dt.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===l[o-r];r++);return Or=l.slice(e,1<r?1-r:void 0)}function Mr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ir(){return!0}function yu(){return!1}function Ze(e){function t(n,r,l,o,i){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(o):o[u]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Ir:yu,this.isPropagationStopped=yu,this}return N(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ir)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ir)},persist:function(){},isPersistent:Ir}),t}var dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},to=Ze(dn),Yn=N({},dn,{view:0,detail:0}),hc=Ze(Yn),no,ro,Xn,Fr=N({},Yn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:oo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Xn&&(Xn&&e.type==="mousemove"?(no=e.screenX-Xn.screenX,ro=e.screenY-Xn.screenY):ro=no=0,Xn=e),no)},movementY:function(e){return"movementY"in e?e.movementY:ro}}),gu=Ze(Fr),vc=N({},Fr,{dataTransfer:0}),yc=Ze(vc),gc=N({},Yn,{relatedTarget:0}),lo=Ze(gc),xc=N({},dn,{animationName:0,elapsedTime:0,pseudoElement:0}),wc=Ze(xc),kc=N({},dn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Sc=Ze(kc),Ec=N({},dn,{data:0}),xu=Ze(Ec),Cc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_c={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Nc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function zc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Nc[e])?!!t[e]:!1}function oo(){return zc}var Pc=N({},Yn,{key:function(e){if(e.key){var t=Cc[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Mr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_c[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:oo,charCode:function(e){return e.type==="keypress"?Mr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Mr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Lc=Ze(Pc),Tc=N({},Fr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wu=Ze(Tc),jc=N({},Yn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:oo}),Rc=Ze(jc),Dc=N({},dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Oc=Ze(Dc),Mc=N({},Fr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ic=Ze(Mc),Fc=[9,13,27,32],io=se&&"CompositionEvent"in window,Gn=null;se&&"documentMode"in document&&(Gn=document.documentMode);var Uc=se&&"TextEvent"in window&&!Gn,ku=se&&(!io||Gn&&8<Gn&&11>=Gn),Su=" ",Eu=!1;function Cu(e,t){switch(e){case"keyup":return Fc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _u(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var pn=!1;function $c(e,t){switch(e){case"compositionend":return _u(t);case"keypress":return t.which!==32?null:(Eu=!0,Su);case"textInput":return e=t.data,e===Su&&Eu?null:e;default:return null}}function Ac(e,t){if(pn)return e==="compositionend"||!io&&Cu(e,t)?(e=vu(),Or=eo=Dt=null,pn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ku&&t.locale!=="ko"?null:t.data;default:return null}}var Bc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Bc[e.type]:t==="textarea"}function zu(e,t,n,r){Yi(r),t=Vr(t,"onChange"),0<t.length&&(n=new to("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Jn=null,qn=null;function Vc(e){Qu(e,0)}function Ur(e){var t=gn(e);if(Mi(t))return e}function Hc(e,t){if(e==="change")return t}var Pu=!1;if(se){var uo;if(se){var ao="oninput"in document;if(!ao){var Lu=document.createElement("div");Lu.setAttribute("oninput","return;"),ao=typeof Lu.oninput=="function"}uo=ao}else uo=!1;Pu=uo&&(!document.documentMode||9<document.documentMode)}function Tu(){Jn&&(Jn.detachEvent("onpropertychange",ju),qn=Jn=null)}function ju(e){if(e.propertyName==="value"&&Ur(qn)){var t=[];zu(t,qn,e,Bl(e)),qi(Vc,t)}}function Wc(e,t,n){e==="focusin"?(Tu(),Jn=t,qn=n,Jn.attachEvent("onpropertychange",ju)):e==="focusout"&&Tu()}function Qc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ur(qn)}function Kc(e,t){if(e==="click")return Ur(t)}function Yc(e,t){if(e==="input"||e==="change")return Ur(t)}function Xc(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var st=typeof Object.is=="function"?Object.is:Xc;function Zn(e,t){if(st(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Y.call(t,l)||!st(e[l],t[l]))return!1}return!0}function Ru(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Du(e,t){var n=Ru(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ru(n)}}function Ou(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ou(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Mu(){for(var e=window,t=kr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=kr(e.document)}return t}function so(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Gc(e){var t=Mu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ou(n.ownerDocument.documentElement,n)){if(r!==null&&so(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=Du(n,o);var i=Du(n,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Jc=se&&"documentMode"in document&&11>=document.documentMode,mn=null,co=null,bn=null,fo=!1;function Iu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;fo||mn==null||mn!==kr(r)||(r=mn,"selectionStart"in r&&so(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),bn&&Zn(bn,r)||(bn=r,r=Vr(co,"onSelect"),0<r.length&&(t=new to("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=mn)))}function $r(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var hn={animationend:$r("Animation","AnimationEnd"),animationiteration:$r("Animation","AnimationIteration"),animationstart:$r("Animation","AnimationStart"),transitionend:$r("Transition","TransitionEnd")},po={},Fu={};se&&(Fu=document.createElement("div").style,"AnimationEvent"in window||(delete hn.animationend.animation,delete hn.animationiteration.animation,delete hn.animationstart.animation),"TransitionEvent"in window||delete hn.transitionend.transition);function Ar(e){if(po[e])return po[e];if(!hn[e])return e;var t=hn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Fu)return po[e]=t[n];return e}var Uu=Ar("animationend"),$u=Ar("animationiteration"),Au=Ar("animationstart"),Bu=Ar("transitionend"),Vu=new Map,Hu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ot(e,t){Vu.set(e,t),U(t,[e])}for(var mo=0;mo<Hu.length;mo++){var ho=Hu[mo],qc=ho.toLowerCase(),Zc=ho[0].toUpperCase()+ho.slice(1);Ot(qc,"on"+Zc)}Ot(Uu,"onAnimationEnd"),Ot($u,"onAnimationIteration"),Ot(Au,"onAnimationStart"),Ot("dblclick","onDoubleClick"),Ot("focusin","onFocus"),Ot("focusout","onBlur"),Ot(Bu,"onTransitionEnd"),q("onMouseEnter",["mouseout","mouseover"]),q("onMouseLeave",["mouseout","mouseover"]),q("onPointerEnter",["pointerout","pointerover"]),q("onPointerLeave",["pointerout","pointerover"]),U("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),U("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),U("onBeforeInput",["compositionend","keypress","textInput","paste"]),U("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),U("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),U("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bc=new Set("cancel close invalid load scroll toggle".split(" ").concat(er));function Wu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,qs(r,t,void 0,e),e.currentTarget=null}function Qu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var u=r[i],a=u.instance,m=u.currentTarget;if(u=u.listener,a!==o&&l.isPropagationStopped())break e;Wu(l,u,m),o=a}else for(i=0;i<r.length;i++){if(u=r[i],a=u.instance,m=u.currentTarget,u=u.listener,a!==o&&l.isPropagationStopped())break e;Wu(l,u,m),o=a}}}if(Cr)throw e=Ql,Cr=!1,Ql=null,e}function ee(e,t){var n=t[Eo];n===void 0&&(n=t[Eo]=new Set);var r=e+"__bubble";n.has(r)||(Ku(t,e,2,!1),n.add(r))}function vo(e,t,n){var r=0;t&&(r|=4),Ku(n,e,r,t)}var Br="_reactListening"+Math.random().toString(36).slice(2);function tr(e){if(!e[Br]){e[Br]=!0,H.forEach(function(n){n!=="selectionchange"&&(bc.has(n)||vo(n,!1,e),vo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Br]||(t[Br]=!0,vo("selectionchange",!1,t))}}function Ku(e,t,n,r){switch(hu(t)){case 1:var l=pc;break;case 4:l=mc;break;default:l=Zl}n=l.bind(null,t,n,e),l=void 0,!Wl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function yo(e,t,n,r,l){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var u=r.stateNode.containerInfo;if(u===l||u.nodeType===8&&u.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var a=i.tag;if((a===3||a===4)&&(a=i.stateNode.containerInfo,a===l||a.nodeType===8&&a.parentNode===l))return;i=i.return}for(;u!==null;){if(i=Gt(u),i===null)return;if(a=i.tag,a===5||a===6){r=o=i;continue e}u=u.parentNode}}r=r.return}qi(function(){var m=o,x=Bl(n),w=[];e:{var g=Vu.get(e);if(g!==void 0){var _=to,P=e;switch(e){case"keypress":if(Mr(n)===0)break e;case"keydown":case"keyup":_=Lc;break;case"focusin":P="focus",_=lo;break;case"focusout":P="blur",_=lo;break;case"beforeblur":case"afterblur":_=lo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=gu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=yc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=Rc;break;case Uu:case $u:case Au:_=wc;break;case Bu:_=Oc;break;case"scroll":_=hc;break;case"wheel":_=Ic;break;case"copy":case"cut":case"paste":_=Sc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=wu}var T=(t&4)!==0,pe=!T&&e==="scroll",d=T?g!==null?g+"Capture":null:g;T=[];for(var s=m,p;s!==null;){p=s;var k=p.stateNode;if(p.tag===5&&k!==null&&(p=k,d!==null&&(k=Fn(s,d),k!=null&&T.push(nr(s,k,p)))),pe)break;s=s.return}0<T.length&&(g=new _(g,P,null,n,x),w.push({event:g,listeners:T}))}}if((t&7)===0){e:{if(g=e==="mouseover"||e==="pointerover",_=e==="mouseout"||e==="pointerout",g&&n!==Al&&(P=n.relatedTarget||n.fromElement)&&(Gt(P)||P[kt]))break e;if((_||g)&&(g=x.window===x?x:(g=x.ownerDocument)?g.defaultView||g.parentWindow:window,_?(P=n.relatedTarget||n.toElement,_=m,P=P?Gt(P):null,P!==null&&(pe=Xt(P),P!==pe||P.tag!==5&&P.tag!==6)&&(P=null)):(_=null,P=m),_!==P)){if(T=gu,k="onMouseLeave",d="onMouseEnter",s="mouse",(e==="pointerout"||e==="pointerover")&&(T=wu,k="onPointerLeave",d="onPointerEnter",s="pointer"),pe=_==null?g:gn(_),p=P==null?g:gn(P),g=new T(k,s+"leave",_,n,x),g.target=pe,g.relatedTarget=p,k=null,Gt(x)===m&&(T=new T(d,s+"enter",P,n,x),T.target=p,T.relatedTarget=pe,k=T),pe=k,_&&P)t:{for(T=_,d=P,s=0,p=T;p;p=vn(p))s++;for(p=0,k=d;k;k=vn(k))p++;for(;0<s-p;)T=vn(T),s--;for(;0<p-s;)d=vn(d),p--;for(;s--;){if(T===d||d!==null&&T===d.alternate)break t;T=vn(T),d=vn(d)}T=null}else T=null;_!==null&&Yu(w,g,_,T,!1),P!==null&&pe!==null&&Yu(w,pe,P,T,!0)}}e:{if(g=m?gn(m):window,_=g.nodeName&&g.nodeName.toLowerCase(),_==="select"||_==="input"&&g.type==="file")var j=Hc;else if(Nu(g))if(Pu)j=Yc;else{j=Qc;var D=Wc}else(_=g.nodeName)&&_.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(j=Kc);if(j&&(j=j(e,m))){zu(w,j,n,x);break e}D&&D(e,g,m),e==="focusout"&&(D=g._wrapperState)&&D.controlled&&g.type==="number"&&Ml(g,"number",g.value)}switch(D=m?gn(m):window,e){case"focusin":(Nu(D)||D.contentEditable==="true")&&(mn=D,co=m,bn=null);break;case"focusout":bn=co=mn=null;break;case"mousedown":fo=!0;break;case"contextmenu":case"mouseup":case"dragend":fo=!1,Iu(w,n,x);break;case"selectionchange":if(Jc)break;case"keydown":case"keyup":Iu(w,n,x)}var O;if(io)e:{switch(e){case"compositionstart":var F="onCompositionStart";break e;case"compositionend":F="onCompositionEnd";break e;case"compositionupdate":F="onCompositionUpdate";break e}F=void 0}else pn?Cu(e,n)&&(F="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(F="onCompositionStart");F&&(ku&&n.locale!=="ko"&&(pn||F!=="onCompositionStart"?F==="onCompositionEnd"&&pn&&(O=vu()):(Dt=x,eo="value"in Dt?Dt.value:Dt.textContent,pn=!0)),D=Vr(m,F),0<D.length&&(F=new xu(F,e,null,n,x),w.push({event:F,listeners:D}),O?F.data=O:(O=_u(n),O!==null&&(F.data=O)))),(O=Uc?$c(e,n):Ac(e,n))&&(m=Vr(m,"onBeforeInput"),0<m.length&&(x=new xu("onBeforeInput","beforeinput",null,n,x),w.push({event:x,listeners:m}),x.data=O))}Qu(w,t)})}function nr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Vr(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=Fn(e,n),o!=null&&r.unshift(nr(e,o,l)),o=Fn(e,t),o!=null&&r.push(nr(e,o,l))),e=e.return}return r}function vn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Yu(e,t,n,r,l){for(var o=t._reactName,i=[];n!==null&&n!==r;){var u=n,a=u.alternate,m=u.stateNode;if(a!==null&&a===r)break;u.tag===5&&m!==null&&(u=m,l?(a=Fn(n,o),a!=null&&i.unshift(nr(n,a,u))):l||(a=Fn(n,o),a!=null&&i.push(nr(n,a,u)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var ef=/\r\n?/g,tf=/\u0000|\uFFFD/g;function Xu(e){return(typeof e=="string"?e:""+e).replace(ef,`
`).replace(tf,"")}function Hr(e,t,n){if(t=Xu(t),Xu(e)!==t&&n)throw Error(c(425))}function Wr(){}var go=null,xo=null;function wo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ko=typeof setTimeout=="function"?setTimeout:void 0,nf=typeof clearTimeout=="function"?clearTimeout:void 0,Gu=typeof Promise=="function"?Promise:void 0,rf=typeof queueMicrotask=="function"?queueMicrotask:typeof Gu<"u"?function(e){return Gu.resolve(null).then(e).catch(lf)}:ko;function lf(e){setTimeout(function(){throw e})}function So(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Kn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Kn(t)}function Mt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ju(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var yn=Math.random().toString(36).slice(2),yt="__reactFiber$"+yn,rr="__reactProps$"+yn,kt="__reactContainer$"+yn,Eo="__reactEvents$"+yn,of="__reactListeners$"+yn,uf="__reactHandles$"+yn;function Gt(e){var t=e[yt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[kt]||n[yt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ju(e);e!==null;){if(n=e[yt])return n;e=Ju(e)}return t}e=n,n=e.parentNode}return null}function lr(e){return e=e[yt]||e[kt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function gn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(c(33))}function Qr(e){return e[rr]||null}var Co=[],xn=-1;function It(e){return{current:e}}function te(e){0>xn||(e.current=Co[xn],Co[xn]=null,xn--)}function Z(e,t){xn++,Co[xn]=e.current,e.current=t}var Ft={},je=It(Ft),Be=It(!1),Jt=Ft;function wn(e,t){var n=e.type.contextTypes;if(!n)return Ft;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Ve(e){return e=e.childContextTypes,e!=null}function Kr(){te(Be),te(je)}function qu(e,t,n){if(je.current!==Ft)throw Error(c(168));Z(je,t),Z(Be,n)}function Zu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(c(108,B(e)||"Unknown",l));return N({},n,r)}function Yr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ft,Jt=je.current,Z(je,e),Z(Be,Be.current),!0}function bu(e,t,n){var r=e.stateNode;if(!r)throw Error(c(169));n?(e=Zu(e,t,Jt),r.__reactInternalMemoizedMergedChildContext=e,te(Be),te(je),Z(je,e)):te(Be),Z(Be,n)}var St=null,Xr=!1,_o=!1;function ea(e){St===null?St=[e]:St.push(e)}function af(e){Xr=!0,ea(e)}function Ut(){if(!_o&&St!==null){_o=!0;var e=0,t=J;try{var n=St;for(J=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}St=null,Xr=!1}catch(l){throw St!==null&&(St=St.slice(e+1)),nu(Kl,Ut),l}finally{J=t,_o=!1}}return null}var kn=[],Sn=0,Gr=null,Jr=0,nt=[],rt=0,qt=null,Et=1,Ct="";function Zt(e,t){kn[Sn++]=Jr,kn[Sn++]=Gr,Gr=e,Jr=t}function ta(e,t,n){nt[rt++]=Et,nt[rt++]=Ct,nt[rt++]=qt,qt=e;var r=Et;e=Ct;var l=32-at(r)-1;r&=~(1<<l),n+=1;var o=32-at(t)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,Et=1<<32-at(t)+l|n<<l|r,Ct=o+e}else Et=1<<o|n<<l|r,Ct=e}function No(e){e.return!==null&&(Zt(e,1),ta(e,1,0))}function zo(e){for(;e===Gr;)Gr=kn[--Sn],kn[Sn]=null,Jr=kn[--Sn],kn[Sn]=null;for(;e===qt;)qt=nt[--rt],nt[rt]=null,Ct=nt[--rt],nt[rt]=null,Et=nt[--rt],nt[rt]=null}var be=null,et=null,le=!1,ct=null;function na(e,t){var n=ut(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ra(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,be=e,et=Mt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,be=e,et=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=qt!==null?{id:Et,overflow:Ct}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ut(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,be=e,et=null,!0):!1;default:return!1}}function Po(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Lo(e){if(le){var t=et;if(t){var n=t;if(!ra(e,t)){if(Po(e))throw Error(c(418));t=Mt(n.nextSibling);var r=be;t&&ra(e,t)?na(r,n):(e.flags=e.flags&-4097|2,le=!1,be=e)}}else{if(Po(e))throw Error(c(418));e.flags=e.flags&-4097|2,le=!1,be=e}}}function la(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;be=e}function qr(e){if(e!==be)return!1;if(!le)return la(e),le=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!wo(e.type,e.memoizedProps)),t&&(t=et)){if(Po(e))throw oa(),Error(c(418));for(;t;)na(e,t),t=Mt(t.nextSibling)}if(la(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){et=Mt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}et=null}}else et=be?Mt(e.stateNode.nextSibling):null;return!0}function oa(){for(var e=et;e;)e=Mt(e.nextSibling)}function En(){et=be=null,le=!1}function To(e){ct===null?ct=[e]:ct.push(e)}var sf=fe.ReactCurrentBatchConfig;function or(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(c(309));var r=n.stateNode}if(!r)throw Error(c(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var u=l.refs;i===null?delete u[o]:u[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(c(284));if(!n._owner)throw Error(c(290,e))}return e}function Zr(e,t){throw e=Object.prototype.toString.call(t),Error(c(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ia(e){var t=e._init;return t(e._payload)}function ua(e){function t(d,s){if(e){var p=d.deletions;p===null?(d.deletions=[s],d.flags|=16):p.push(s)}}function n(d,s){if(!e)return null;for(;s!==null;)t(d,s),s=s.sibling;return null}function r(d,s){for(d=new Map;s!==null;)s.key!==null?d.set(s.key,s):d.set(s.index,s),s=s.sibling;return d}function l(d,s){return d=Kt(d,s),d.index=0,d.sibling=null,d}function o(d,s,p){return d.index=p,e?(p=d.alternate,p!==null?(p=p.index,p<s?(d.flags|=2,s):p):(d.flags|=2,s)):(d.flags|=1048576,s)}function i(d){return e&&d.alternate===null&&(d.flags|=2),d}function u(d,s,p,k){return s===null||s.tag!==6?(s=ki(p,d.mode,k),s.return=d,s):(s=l(s,p),s.return=d,s)}function a(d,s,p,k){var j=p.type;return j===ge?x(d,s,p.props.children,k,p.key):s!==null&&(s.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Te&&ia(j)===s.type)?(k=l(s,p.props),k.ref=or(d,s,p),k.return=d,k):(k=Sl(p.type,p.key,p.props,null,d.mode,k),k.ref=or(d,s,p),k.return=d,k)}function m(d,s,p,k){return s===null||s.tag!==4||s.stateNode.containerInfo!==p.containerInfo||s.stateNode.implementation!==p.implementation?(s=Si(p,d.mode,k),s.return=d,s):(s=l(s,p.children||[]),s.return=d,s)}function x(d,s,p,k,j){return s===null||s.tag!==7?(s=un(p,d.mode,k,j),s.return=d,s):(s=l(s,p),s.return=d,s)}function w(d,s,p){if(typeof s=="string"&&s!==""||typeof s=="number")return s=ki(""+s,d.mode,p),s.return=d,s;if(typeof s=="object"&&s!==null){switch(s.$$typeof){case Ye:return p=Sl(s.type,s.key,s.props,null,d.mode,p),p.ref=or(d,null,s),p.return=d,p;case Pe:return s=Si(s,d.mode,p),s.return=d,s;case Te:var k=s._init;return w(d,k(s._payload),p)}if(On(s)||R(s))return s=un(s,d.mode,p,null),s.return=d,s;Zr(d,s)}return null}function g(d,s,p,k){var j=s!==null?s.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return j!==null?null:u(d,s,""+p,k);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Ye:return p.key===j?a(d,s,p,k):null;case Pe:return p.key===j?m(d,s,p,k):null;case Te:return j=p._init,g(d,s,j(p._payload),k)}if(On(p)||R(p))return j!==null?null:x(d,s,p,k,null);Zr(d,p)}return null}function _(d,s,p,k,j){if(typeof k=="string"&&k!==""||typeof k=="number")return d=d.get(p)||null,u(s,d,""+k,j);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Ye:return d=d.get(k.key===null?p:k.key)||null,a(s,d,k,j);case Pe:return d=d.get(k.key===null?p:k.key)||null,m(s,d,k,j);case Te:var D=k._init;return _(d,s,p,D(k._payload),j)}if(On(k)||R(k))return d=d.get(p)||null,x(s,d,k,j,null);Zr(s,k)}return null}function P(d,s,p,k){for(var j=null,D=null,O=s,F=s=0,ke=null;O!==null&&F<p.length;F++){O.index>F?(ke=O,O=null):ke=O.sibling;var K=g(d,O,p[F],k);if(K===null){O===null&&(O=ke);break}e&&O&&K.alternate===null&&t(d,O),s=o(K,s,F),D===null?j=K:D.sibling=K,D=K,O=ke}if(F===p.length)return n(d,O),le&&Zt(d,F),j;if(O===null){for(;F<p.length;F++)O=w(d,p[F],k),O!==null&&(s=o(O,s,F),D===null?j=O:D.sibling=O,D=O);return le&&Zt(d,F),j}for(O=r(d,O);F<p.length;F++)ke=_(O,d,F,p[F],k),ke!==null&&(e&&ke.alternate!==null&&O.delete(ke.key===null?F:ke.key),s=o(ke,s,F),D===null?j=ke:D.sibling=ke,D=ke);return e&&O.forEach(function(Yt){return t(d,Yt)}),le&&Zt(d,F),j}function T(d,s,p,k){var j=R(p);if(typeof j!="function")throw Error(c(150));if(p=j.call(p),p==null)throw Error(c(151));for(var D=j=null,O=s,F=s=0,ke=null,K=p.next();O!==null&&!K.done;F++,K=p.next()){O.index>F?(ke=O,O=null):ke=O.sibling;var Yt=g(d,O,K.value,k);if(Yt===null){O===null&&(O=ke);break}e&&O&&Yt.alternate===null&&t(d,O),s=o(Yt,s,F),D===null?j=Yt:D.sibling=Yt,D=Yt,O=ke}if(K.done)return n(d,O),le&&Zt(d,F),j;if(O===null){for(;!K.done;F++,K=p.next())K=w(d,K.value,k),K!==null&&(s=o(K,s,F),D===null?j=K:D.sibling=K,D=K);return le&&Zt(d,F),j}for(O=r(d,O);!K.done;F++,K=p.next())K=_(O,d,F,K.value,k),K!==null&&(e&&K.alternate!==null&&O.delete(K.key===null?F:K.key),s=o(K,s,F),D===null?j=K:D.sibling=K,D=K);return e&&O.forEach(function(Vf){return t(d,Vf)}),le&&Zt(d,F),j}function pe(d,s,p,k){if(typeof p=="object"&&p!==null&&p.type===ge&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Ye:e:{for(var j=p.key,D=s;D!==null;){if(D.key===j){if(j=p.type,j===ge){if(D.tag===7){n(d,D.sibling),s=l(D,p.props.children),s.return=d,d=s;break e}}else if(D.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Te&&ia(j)===D.type){n(d,D.sibling),s=l(D,p.props),s.ref=or(d,D,p),s.return=d,d=s;break e}n(d,D);break}else t(d,D);D=D.sibling}p.type===ge?(s=un(p.props.children,d.mode,k,p.key),s.return=d,d=s):(k=Sl(p.type,p.key,p.props,null,d.mode,k),k.ref=or(d,s,p),k.return=d,d=k)}return i(d);case Pe:e:{for(D=p.key;s!==null;){if(s.key===D)if(s.tag===4&&s.stateNode.containerInfo===p.containerInfo&&s.stateNode.implementation===p.implementation){n(d,s.sibling),s=l(s,p.children||[]),s.return=d,d=s;break e}else{n(d,s);break}else t(d,s);s=s.sibling}s=Si(p,d.mode,k),s.return=d,d=s}return i(d);case Te:return D=p._init,pe(d,s,D(p._payload),k)}if(On(p))return P(d,s,p,k);if(R(p))return T(d,s,p,k);Zr(d,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,s!==null&&s.tag===6?(n(d,s.sibling),s=l(s,p),s.return=d,d=s):(n(d,s),s=ki(p,d.mode,k),s.return=d,d=s),i(d)):n(d,s)}return pe}var Cn=ua(!0),aa=ua(!1),br=It(null),el=null,_n=null,jo=null;function Ro(){jo=_n=el=null}function Do(e){var t=br.current;te(br),e._currentValue=t}function Oo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Nn(e,t){el=e,jo=_n=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(He=!0),e.firstContext=null)}function lt(e){var t=e._currentValue;if(jo!==e)if(e={context:e,memoizedValue:t,next:null},_n===null){if(el===null)throw Error(c(308));_n=e,el.dependencies={lanes:0,firstContext:e}}else _n=_n.next=e;return t}var bt=null;function Mo(e){bt===null?bt=[e]:bt.push(e)}function sa(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Mo(t)):(n.next=l.next,l.next=n),t.interleaved=n,_t(e,r)}function _t(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var $t=!1;function Io(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ca(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Nt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function At(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(W&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,_t(e,n)}return l=r.interleaved,l===null?(t.next=t,Mo(r)):(t.next=l.next,l.next=t),r.interleaved=t,_t(e,n)}function tl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Gl(e,n)}}function fa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function nl(e,t,n,r){var l=e.updateQueue;$t=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var a=u,m=a.next;a.next=null,i===null?o=m:i.next=m,i=a;var x=e.alternate;x!==null&&(x=x.updateQueue,u=x.lastBaseUpdate,u!==i&&(u===null?x.firstBaseUpdate=m:u.next=m,x.lastBaseUpdate=a))}if(o!==null){var w=l.baseState;i=0,x=m=a=null,u=o;do{var g=u.lane,_=u.eventTime;if((r&g)===g){x!==null&&(x=x.next={eventTime:_,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var P=e,T=u;switch(g=t,_=n,T.tag){case 1:if(P=T.payload,typeof P=="function"){w=P.call(_,w,g);break e}w=P;break e;case 3:P.flags=P.flags&-65537|128;case 0:if(P=T.payload,g=typeof P=="function"?P.call(_,w,g):P,g==null)break e;w=N({},w,g);break e;case 2:$t=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,g=l.effects,g===null?l.effects=[u]:g.push(u))}else _={eventTime:_,lane:g,tag:u.tag,payload:u.payload,callback:u.callback,next:null},x===null?(m=x=_,a=w):x=x.next=_,i|=g;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;g=u,u=g.next,g.next=null,l.lastBaseUpdate=g,l.shared.pending=null}}while(!0);if(x===null&&(a=w),l.baseState=a,l.firstBaseUpdate=m,l.lastBaseUpdate=x,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);nn|=i,e.lanes=i,e.memoizedState=w}}function da(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(c(191,l));l.call(r)}}}var ir={},gt=It(ir),ur=It(ir),ar=It(ir);function en(e){if(e===ir)throw Error(c(174));return e}function Fo(e,t){switch(Z(ar,t),Z(ur,e),Z(gt,ir),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Fl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Fl(t,e)}te(gt),Z(gt,t)}function zn(){te(gt),te(ur),te(ar)}function pa(e){en(ar.current);var t=en(gt.current),n=Fl(t,e.type);t!==n&&(Z(ur,e),Z(gt,n))}function Uo(e){ur.current===e&&(te(gt),te(ur))}var oe=It(0);function rl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var $o=[];function Ao(){for(var e=0;e<$o.length;e++)$o[e]._workInProgressVersionPrimary=null;$o.length=0}var ll=fe.ReactCurrentDispatcher,Bo=fe.ReactCurrentBatchConfig,tn=0,ie=null,ve=null,xe=null,ol=!1,sr=!1,cr=0,cf=0;function Re(){throw Error(c(321))}function Vo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!st(e[n],t[n]))return!1;return!0}function Ho(e,t,n,r,l,o){if(tn=o,ie=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ll.current=e===null||e.memoizedState===null?mf:hf,e=n(r,l),sr){o=0;do{if(sr=!1,cr=0,25<=o)throw Error(c(301));o+=1,xe=ve=null,t.updateQueue=null,ll.current=vf,e=n(r,l)}while(sr)}if(ll.current=al,t=ve!==null&&ve.next!==null,tn=0,xe=ve=ie=null,ol=!1,t)throw Error(c(300));return e}function Wo(){var e=cr!==0;return cr=0,e}function xt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return xe===null?ie.memoizedState=xe=e:xe=xe.next=e,xe}function ot(){if(ve===null){var e=ie.alternate;e=e!==null?e.memoizedState:null}else e=ve.next;var t=xe===null?ie.memoizedState:xe.next;if(t!==null)xe=t,ve=e;else{if(e===null)throw Error(c(310));ve=e,e={memoizedState:ve.memoizedState,baseState:ve.baseState,baseQueue:ve.baseQueue,queue:ve.queue,next:null},xe===null?ie.memoizedState=xe=e:xe=xe.next=e}return xe}function fr(e,t){return typeof t=="function"?t(e):t}function Qo(e){var t=ot(),n=t.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=e;var r=ve,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var u=i=null,a=null,m=o;do{var x=m.lane;if((tn&x)===x)a!==null&&(a=a.next={lane:0,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null}),r=m.hasEagerState?m.eagerState:e(r,m.action);else{var w={lane:x,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null};a===null?(u=a=w,i=r):a=a.next=w,ie.lanes|=x,nn|=x}m=m.next}while(m!==null&&m!==o);a===null?i=r:a.next=u,st(r,t.memoizedState)||(He=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,ie.lanes|=o,nn|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ko(e){var t=ot(),n=t.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);st(o,t.memoizedState)||(He=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ma(){}function ha(e,t){var n=ie,r=ot(),l=t(),o=!st(r.memoizedState,l);if(o&&(r.memoizedState=l,He=!0),r=r.queue,Yo(ga.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||xe!==null&&xe.memoizedState.tag&1){if(n.flags|=2048,dr(9,ya.bind(null,n,r,l,t),void 0,null),we===null)throw Error(c(349));(tn&30)!==0||va(n,t,l)}return l}function va(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ya(e,t,n,r){t.value=n,t.getSnapshot=r,xa(t)&&wa(e)}function ga(e,t,n){return n(function(){xa(t)&&wa(e)})}function xa(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!st(e,n)}catch{return!0}}function wa(e){var t=_t(e,1);t!==null&&mt(t,e,1,-1)}function ka(e){var t=xt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:fr,lastRenderedState:e},t.queue=e,e=e.dispatch=pf.bind(null,ie,e),[t.memoizedState,e]}function dr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Sa(){return ot().memoizedState}function il(e,t,n,r){var l=xt();ie.flags|=e,l.memoizedState=dr(1|t,n,void 0,r===void 0?null:r)}function ul(e,t,n,r){var l=ot();r=r===void 0?null:r;var o=void 0;if(ve!==null){var i=ve.memoizedState;if(o=i.destroy,r!==null&&Vo(r,i.deps)){l.memoizedState=dr(t,n,o,r);return}}ie.flags|=e,l.memoizedState=dr(1|t,n,o,r)}function Ea(e,t){return il(8390656,8,e,t)}function Yo(e,t){return ul(2048,8,e,t)}function Ca(e,t){return ul(4,2,e,t)}function _a(e,t){return ul(4,4,e,t)}function Na(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function za(e,t,n){return n=n!=null?n.concat([e]):null,ul(4,4,Na.bind(null,t,e),n)}function Xo(){}function Pa(e,t){var n=ot();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Vo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function La(e,t){var n=ot();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Vo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ta(e,t,n){return(tn&21)===0?(e.baseState&&(e.baseState=!1,He=!0),e.memoizedState=n):(st(n,t)||(n=iu(),ie.lanes|=n,nn|=n,e.baseState=!0),t)}function ff(e,t){var n=J;J=n!==0&&4>n?n:4,e(!0);var r=Bo.transition;Bo.transition={};try{e(!1),t()}finally{J=n,Bo.transition=r}}function ja(){return ot().memoizedState}function df(e,t,n){var r=Wt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ra(e))Da(t,n);else if(n=sa(e,t,n,r),n!==null){var l=Ue();mt(n,e,r,l),Oa(n,t,r)}}function pf(e,t,n){var r=Wt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ra(e))Da(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,u=o(i,n);if(l.hasEagerState=!0,l.eagerState=u,st(u,i)){var a=t.interleaved;a===null?(l.next=l,Mo(t)):(l.next=a.next,a.next=l),t.interleaved=l;return}}catch{}finally{}n=sa(e,t,l,r),n!==null&&(l=Ue(),mt(n,e,r,l),Oa(n,t,r))}}function Ra(e){var t=e.alternate;return e===ie||t!==null&&t===ie}function Da(e,t){sr=ol=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Oa(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Gl(e,n)}}var al={readContext:lt,useCallback:Re,useContext:Re,useEffect:Re,useImperativeHandle:Re,useInsertionEffect:Re,useLayoutEffect:Re,useMemo:Re,useReducer:Re,useRef:Re,useState:Re,useDebugValue:Re,useDeferredValue:Re,useTransition:Re,useMutableSource:Re,useSyncExternalStore:Re,useId:Re,unstable_isNewReconciler:!1},mf={readContext:lt,useCallback:function(e,t){return xt().memoizedState=[e,t===void 0?null:t],e},useContext:lt,useEffect:Ea,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,il(4194308,4,Na.bind(null,t,e),n)},useLayoutEffect:function(e,t){return il(4194308,4,e,t)},useInsertionEffect:function(e,t){return il(4,2,e,t)},useMemo:function(e,t){var n=xt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=xt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=df.bind(null,ie,e),[r.memoizedState,e]},useRef:function(e){var t=xt();return e={current:e},t.memoizedState=e},useState:ka,useDebugValue:Xo,useDeferredValue:function(e){return xt().memoizedState=e},useTransition:function(){var e=ka(!1),t=e[0];return e=ff.bind(null,e[1]),xt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ie,l=xt();if(le){if(n===void 0)throw Error(c(407));n=n()}else{if(n=t(),we===null)throw Error(c(349));(tn&30)!==0||va(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Ea(ga.bind(null,r,o,e),[e]),r.flags|=2048,dr(9,ya.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=xt(),t=we.identifierPrefix;if(le){var n=Ct,r=Et;n=(r&~(1<<32-at(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=cr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=cf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},hf={readContext:lt,useCallback:Pa,useContext:lt,useEffect:Yo,useImperativeHandle:za,useInsertionEffect:Ca,useLayoutEffect:_a,useMemo:La,useReducer:Qo,useRef:Sa,useState:function(){return Qo(fr)},useDebugValue:Xo,useDeferredValue:function(e){var t=ot();return Ta(t,ve.memoizedState,e)},useTransition:function(){var e=Qo(fr)[0],t=ot().memoizedState;return[e,t]},useMutableSource:ma,useSyncExternalStore:ha,useId:ja,unstable_isNewReconciler:!1},vf={readContext:lt,useCallback:Pa,useContext:lt,useEffect:Yo,useImperativeHandle:za,useInsertionEffect:Ca,useLayoutEffect:_a,useMemo:La,useReducer:Ko,useRef:Sa,useState:function(){return Ko(fr)},useDebugValue:Xo,useDeferredValue:function(e){var t=ot();return ve===null?t.memoizedState=e:Ta(t,ve.memoizedState,e)},useTransition:function(){var e=Ko(fr)[0],t=ot().memoizedState;return[e,t]},useMutableSource:ma,useSyncExternalStore:ha,useId:ja,unstable_isNewReconciler:!1};function ft(e,t){if(e&&e.defaultProps){t=N({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Go(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:N({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var sl={isMounted:function(e){return(e=e._reactInternals)?Xt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ue(),l=Wt(e),o=Nt(r,l);o.payload=t,n!=null&&(o.callback=n),t=At(e,o,l),t!==null&&(mt(t,e,l,r),tl(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ue(),l=Wt(e),o=Nt(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=At(e,o,l),t!==null&&(mt(t,e,l,r),tl(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ue(),r=Wt(e),l=Nt(n,r);l.tag=2,t!=null&&(l.callback=t),t=At(e,l,r),t!==null&&(mt(t,e,r,n),tl(t,e,r))}};function Ma(e,t,n,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!Zn(n,r)||!Zn(l,o):!0}function Ia(e,t,n){var r=!1,l=Ft,o=t.contextType;return typeof o=="object"&&o!==null?o=lt(o):(l=Ve(t)?Jt:je.current,r=t.contextTypes,o=(r=r!=null)?wn(e,l):Ft),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=sl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Fa(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&sl.enqueueReplaceState(t,t.state,null)}function Jo(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Io(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=lt(o):(o=Ve(t)?Jt:je.current,l.context=wn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Go(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&sl.enqueueReplaceState(l,l.state,null),nl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Pn(e,t){try{var n="",r=t;do n+=M(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function qo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Zo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var yf=typeof WeakMap=="function"?WeakMap:Map;function Ua(e,t,n){n=Nt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){vl||(vl=!0,pi=r),Zo(e,t)},n}function $a(e,t,n){n=Nt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){Zo(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Zo(e,t),typeof r!="function"&&(Vt===null?Vt=new Set([this]):Vt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Aa(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new yf;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=jf.bind(null,e,t,n),t.then(e,e))}function Ba(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Va(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Nt(-1,1),t.tag=2,At(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var gf=fe.ReactCurrentOwner,He=!1;function Fe(e,t,n,r){t.child=e===null?aa(t,null,n,r):Cn(t,e.child,n,r)}function Ha(e,t,n,r,l){n=n.render;var o=t.ref;return Nn(t,l),r=Ho(e,t,n,r,o,l),n=Wo(),e!==null&&!He?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,zt(e,t,l)):(le&&n&&No(t),t.flags|=1,Fe(e,t,r,l),t.child)}function Wa(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!wi(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Qa(e,t,o,r,l)):(e=Sl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&l)===0){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:Zn,n(i,r)&&e.ref===t.ref)return zt(e,t,l)}return t.flags|=1,e=Kt(o,r),e.ref=t.ref,e.return=t,t.child=e}function Qa(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(Zn(o,r)&&e.ref===t.ref)if(He=!1,t.pendingProps=r=o,(e.lanes&l)!==0)(e.flags&131072)!==0&&(He=!0);else return t.lanes=e.lanes,zt(e,t,l)}return bo(e,t,n,r,l)}function Ka(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Z(Tn,tt),tt|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Z(Tn,tt),tt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,Z(Tn,tt),tt|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,Z(Tn,tt),tt|=r;return Fe(e,t,l,n),t.child}function Ya(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function bo(e,t,n,r,l){var o=Ve(n)?Jt:je.current;return o=wn(t,o),Nn(t,l),n=Ho(e,t,n,r,o,l),r=Wo(),e!==null&&!He?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,zt(e,t,l)):(le&&r&&No(t),t.flags|=1,Fe(e,t,n,l),t.child)}function Xa(e,t,n,r,l){if(Ve(n)){var o=!0;Yr(t)}else o=!1;if(Nn(t,l),t.stateNode===null)fl(e,t),Ia(t,n,r),Jo(t,n,r,l),r=!0;else if(e===null){var i=t.stateNode,u=t.memoizedProps;i.props=u;var a=i.context,m=n.contextType;typeof m=="object"&&m!==null?m=lt(m):(m=Ve(n)?Jt:je.current,m=wn(t,m));var x=n.getDerivedStateFromProps,w=typeof x=="function"||typeof i.getSnapshotBeforeUpdate=="function";w||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==r||a!==m)&&Fa(t,i,r,m),$t=!1;var g=t.memoizedState;i.state=g,nl(t,r,i,l),a=t.memoizedState,u!==r||g!==a||Be.current||$t?(typeof x=="function"&&(Go(t,n,x,r),a=t.memoizedState),(u=$t||Ma(t,n,u,r,g,a,m))?(w||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),i.props=r,i.state=a,i.context=m,r=u):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,ca(e,t),u=t.memoizedProps,m=t.type===t.elementType?u:ft(t.type,u),i.props=m,w=t.pendingProps,g=i.context,a=n.contextType,typeof a=="object"&&a!==null?a=lt(a):(a=Ve(n)?Jt:je.current,a=wn(t,a));var _=n.getDerivedStateFromProps;(x=typeof _=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==w||g!==a)&&Fa(t,i,r,a),$t=!1,g=t.memoizedState,i.state=g,nl(t,r,i,l);var P=t.memoizedState;u!==w||g!==P||Be.current||$t?(typeof _=="function"&&(Go(t,n,_,r),P=t.memoizedState),(m=$t||Ma(t,n,m,r,g,P,a)||!1)?(x||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,P,a),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,P,a)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=P),i.props=r,i.state=P,i.context=a,r=m):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return ei(e,t,n,r,o,l)}function ei(e,t,n,r,l,o){Ya(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return l&&bu(t,n,!1),zt(e,t,o);r=t.stateNode,gf.current=t;var u=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=Cn(t,e.child,null,o),t.child=Cn(t,null,u,o)):Fe(e,t,u,o),t.memoizedState=r.state,l&&bu(t,n,!0),t.child}function Ga(e){var t=e.stateNode;t.pendingContext?qu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&qu(e,t.context,!1),Fo(e,t.containerInfo)}function Ja(e,t,n,r,l){return En(),To(l),t.flags|=256,Fe(e,t,n,r),t.child}var ti={dehydrated:null,treeContext:null,retryLane:0};function ni(e){return{baseLanes:e,cachePool:null,transitions:null}}function qa(e,t,n){var r=t.pendingProps,l=oe.current,o=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(l&2)!==0),u?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),Z(oe,l&1),e===null)return Lo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=i):o=El(i,r,0,null),e=un(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=ni(n),t.memoizedState=ti,e):ri(t,i));if(l=e.memoizedState,l!==null&&(u=l.dehydrated,u!==null))return xf(e,t,i,r,u,l,n);if(o){o=r.fallback,i=t.mode,l=e.child,u=l.sibling;var a={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=Kt(l,a),r.subtreeFlags=l.subtreeFlags&14680064),u!==null?o=Kt(u,o):(o=un(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?ni(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=ti,r}return o=e.child,e=o.sibling,r=Kt(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ri(e,t){return t=El({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function cl(e,t,n,r){return r!==null&&To(r),Cn(t,e.child,null,n),e=ri(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xf(e,t,n,r,l,o,i){if(n)return t.flags&256?(t.flags&=-257,r=qo(Error(c(422))),cl(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=El({mode:"visible",children:r.children},l,0,null),o=un(o,l,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&Cn(t,e.child,null,i),t.child.memoizedState=ni(i),t.memoizedState=ti,o);if((t.mode&1)===0)return cl(e,t,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var u=r.dgst;return r=u,o=Error(c(419)),r=qo(o,r,void 0),cl(e,t,i,r)}if(u=(i&e.childLanes)!==0,He||u){if(r=we,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|i))!==0?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,_t(e,l),mt(r,e,l,-1))}return xi(),r=qo(Error(c(421))),cl(e,t,i,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Rf.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,et=Mt(l.nextSibling),be=t,le=!0,ct=null,e!==null&&(nt[rt++]=Et,nt[rt++]=Ct,nt[rt++]=qt,Et=e.id,Ct=e.overflow,qt=t),t=ri(t,r.children),t.flags|=4096,t)}function Za(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Oo(e.return,t,n)}function li(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function ba(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(Fe(e,t,r.children,n),r=oe.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Za(e,n,t);else if(e.tag===19)Za(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Z(oe,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&rl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),li(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&rl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}li(t,!0,n,null,o);break;case"together":li(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function fl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function zt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),nn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(c(153));if(t.child!==null){for(e=t.child,n=Kt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Kt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function wf(e,t,n){switch(t.tag){case 3:Ga(t),En();break;case 5:pa(t);break;case 1:Ve(t.type)&&Yr(t);break;case 4:Fo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;Z(br,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Z(oe,oe.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?qa(e,t,n):(Z(oe,oe.current&1),e=zt(e,t,n),e!==null?e.sibling:null);Z(oe,oe.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return ba(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Z(oe,oe.current),r)break;return null;case 22:case 23:return t.lanes=0,Ka(e,t,n)}return zt(e,t,n)}var es,oi,ts,ns;es=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},oi=function(){},ts=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,en(gt.current);var o=null;switch(n){case"input":l=Dl(e,l),r=Dl(e,r),o=[];break;case"select":l=N({},l,{value:void 0}),r=N({},r,{value:void 0}),o=[];break;case"textarea":l=Il(e,l),r=Il(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Wr)}Ul(n,r);var i;n=null;for(m in l)if(!r.hasOwnProperty(m)&&l.hasOwnProperty(m)&&l[m]!=null)if(m==="style"){var u=l[m];for(i in u)u.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else m!=="dangerouslySetInnerHTML"&&m!=="children"&&m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&($.hasOwnProperty(m)?o||(o=[]):(o=o||[]).push(m,null));for(m in r){var a=r[m];if(u=l!=null?l[m]:void 0,r.hasOwnProperty(m)&&a!==u&&(a!=null||u!=null))if(m==="style")if(u){for(i in u)!u.hasOwnProperty(i)||a&&a.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in a)a.hasOwnProperty(i)&&u[i]!==a[i]&&(n||(n={}),n[i]=a[i])}else n||(o||(o=[]),o.push(m,n)),n=a;else m==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,u=u?u.__html:void 0,a!=null&&u!==a&&(o=o||[]).push(m,a)):m==="children"?typeof a!="string"&&typeof a!="number"||(o=o||[]).push(m,""+a):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&($.hasOwnProperty(m)?(a!=null&&m==="onScroll"&&ee("scroll",e),o||u===a||(o=[])):(o=o||[]).push(m,a))}n&&(o=o||[]).push("style",n);var m=o;(t.updateQueue=m)&&(t.flags|=4)}},ns=function(e,t,n,r){n!==r&&(t.flags|=4)};function pr(e,t){if(!le)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function De(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function kf(e,t,n){var r=t.pendingProps;switch(zo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return De(t),null;case 1:return Ve(t.type)&&Kr(),De(t),null;case 3:return r=t.stateNode,zn(),te(Be),te(je),Ao(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(qr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ct!==null&&(vi(ct),ct=null))),oi(e,t),De(t),null;case 5:Uo(t);var l=en(ar.current);if(n=t.type,e!==null&&t.stateNode!=null)ts(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(c(166));return De(t),null}if(e=en(gt.current),qr(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[yt]=t,r[rr]=o,e=(t.mode&1)!==0,n){case"dialog":ee("cancel",r),ee("close",r);break;case"iframe":case"object":case"embed":ee("load",r);break;case"video":case"audio":for(l=0;l<er.length;l++)ee(er[l],r);break;case"source":ee("error",r);break;case"img":case"image":case"link":ee("error",r),ee("load",r);break;case"details":ee("toggle",r);break;case"input":Ii(r,o),ee("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},ee("invalid",r);break;case"textarea":$i(r,o),ee("invalid",r)}Ul(n,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var u=o[i];i==="children"?typeof u=="string"?r.textContent!==u&&(o.suppressHydrationWarning!==!0&&Hr(r.textContent,u,e),l=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(o.suppressHydrationWarning!==!0&&Hr(r.textContent,u,e),l=["children",""+u]):$.hasOwnProperty(i)&&u!=null&&i==="onScroll"&&ee("scroll",r)}switch(n){case"input":wr(r),Ui(r,o,!0);break;case"textarea":wr(r),Bi(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Wr)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Vi(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[yt]=t,e[rr]=r,es(e,t,!1,!1),t.stateNode=e;e:{switch(i=$l(n,r),n){case"dialog":ee("cancel",e),ee("close",e),l=r;break;case"iframe":case"object":case"embed":ee("load",e),l=r;break;case"video":case"audio":for(l=0;l<er.length;l++)ee(er[l],e);l=r;break;case"source":ee("error",e),l=r;break;case"img":case"image":case"link":ee("error",e),ee("load",e),l=r;break;case"details":ee("toggle",e),l=r;break;case"input":Ii(e,r),l=Dl(e,r),ee("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=N({},r,{value:void 0}),ee("invalid",e);break;case"textarea":$i(e,r),l=Il(e,r),ee("invalid",e);break;default:l=r}Ul(n,l),u=l;for(o in u)if(u.hasOwnProperty(o)){var a=u[o];o==="style"?Qi(e,a):o==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&Hi(e,a)):o==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&Mn(e,a):typeof a=="number"&&Mn(e,""+a):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&($.hasOwnProperty(o)?a!=null&&o==="onScroll"&&ee("scroll",e):a!=null&&$e(e,o,a,i))}switch(n){case"input":wr(e),Ui(e,r,!1);break;case"textarea":wr(e),Bi(e);break;case"option":r.value!=null&&e.setAttribute("value",""+V(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?an(e,!!r.multiple,o,!1):r.defaultValue!=null&&an(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Wr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return De(t),null;case 6:if(e&&t.stateNode!=null)ns(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(c(166));if(n=en(ar.current),en(gt.current),qr(t)){if(r=t.stateNode,n=t.memoizedProps,r[yt]=t,(o=r.nodeValue!==n)&&(e=be,e!==null))switch(e.tag){case 3:Hr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Hr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[yt]=t,t.stateNode=r}return De(t),null;case 13:if(te(oe),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(le&&et!==null&&(t.mode&1)!==0&&(t.flags&128)===0)oa(),En(),t.flags|=98560,o=!1;else if(o=qr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(c(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(c(317));o[yt]=t}else En(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;De(t),o=!1}else ct!==null&&(vi(ct),ct=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(oe.current&1)!==0?ye===0&&(ye=3):xi())),t.updateQueue!==null&&(t.flags|=4),De(t),null);case 4:return zn(),oi(e,t),e===null&&tr(t.stateNode.containerInfo),De(t),null;case 10:return Do(t.type._context),De(t),null;case 17:return Ve(t.type)&&Kr(),De(t),null;case 19:if(te(oe),o=t.memoizedState,o===null)return De(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)pr(o,!1);else{if(ye!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=rl(e),i!==null){for(t.flags|=128,pr(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Z(oe,oe.current&1|2),t.child}e=e.sibling}o.tail!==null&&de()>jn&&(t.flags|=128,r=!0,pr(o,!1),t.lanes=4194304)}else{if(!r)if(e=rl(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),pr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!le)return De(t),null}else 2*de()-o.renderingStartTime>jn&&n!==1073741824&&(t.flags|=128,r=!0,pr(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=de(),t.sibling=null,n=oe.current,Z(oe,r?n&1|2:n&1),t):(De(t),null);case 22:case 23:return gi(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(tt&1073741824)!==0&&(De(t),t.subtreeFlags&6&&(t.flags|=8192)):De(t),null;case 24:return null;case 25:return null}throw Error(c(156,t.tag))}function Sf(e,t){switch(zo(t),t.tag){case 1:return Ve(t.type)&&Kr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return zn(),te(Be),te(je),Ao(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Uo(t),null;case 13:if(te(oe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(c(340));En()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return te(oe),null;case 4:return zn(),null;case 10:return Do(t.type._context),null;case 22:case 23:return gi(),null;case 24:return null;default:return null}}var dl=!1,Oe=!1,Ef=typeof WeakSet=="function"?WeakSet:Set,z=null;function Ln(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ae(e,t,r)}else n.current=null}function ii(e,t,n){try{n()}catch(r){ae(e,t,r)}}var rs=!1;function Cf(e,t){if(go=Rr,e=Mu(),so(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,u=-1,a=-1,m=0,x=0,w=e,g=null;t:for(;;){for(var _;w!==n||l!==0&&w.nodeType!==3||(u=i+l),w!==o||r!==0&&w.nodeType!==3||(a=i+r),w.nodeType===3&&(i+=w.nodeValue.length),(_=w.firstChild)!==null;)g=w,w=_;for(;;){if(w===e)break t;if(g===n&&++m===l&&(u=i),g===o&&++x===r&&(a=i),(_=w.nextSibling)!==null)break;w=g,g=w.parentNode}w=_}n=u===-1||a===-1?null:{start:u,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(xo={focusedElem:e,selectionRange:n},Rr=!1,z=t;z!==null;)if(t=z,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,z=e;else for(;z!==null;){t=z;try{var P=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(P!==null){var T=P.memoizedProps,pe=P.memoizedState,d=t.stateNode,s=d.getSnapshotBeforeUpdate(t.elementType===t.type?T:ft(t.type,T),pe);d.__reactInternalSnapshotBeforeUpdate=s}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(c(163))}}catch(k){ae(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,z=e;break}z=t.return}return P=rs,rs=!1,P}function mr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&ii(t,n,o)}l=l.next}while(l!==r)}}function pl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ui(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function ls(e){var t=e.alternate;t!==null&&(e.alternate=null,ls(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[yt],delete t[rr],delete t[Eo],delete t[of],delete t[uf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function os(e){return e.tag===5||e.tag===3||e.tag===4}function is(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||os(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ai(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Wr));else if(r!==4&&(e=e.child,e!==null))for(ai(e,t,n),e=e.sibling;e!==null;)ai(e,t,n),e=e.sibling}function si(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(si(e,t,n),e=e.sibling;e!==null;)si(e,t,n),e=e.sibling}var Ce=null,dt=!1;function Bt(e,t,n){for(n=n.child;n!==null;)us(e,t,n),n=n.sibling}function us(e,t,n){if(vt&&typeof vt.onCommitFiberUnmount=="function")try{vt.onCommitFiberUnmount(Nr,n)}catch{}switch(n.tag){case 5:Oe||Ln(n,t);case 6:var r=Ce,l=dt;Ce=null,Bt(e,t,n),Ce=r,dt=l,Ce!==null&&(dt?(e=Ce,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ce.removeChild(n.stateNode));break;case 18:Ce!==null&&(dt?(e=Ce,n=n.stateNode,e.nodeType===8?So(e.parentNode,n):e.nodeType===1&&So(e,n),Kn(e)):So(Ce,n.stateNode));break;case 4:r=Ce,l=dt,Ce=n.stateNode.containerInfo,dt=!0,Bt(e,t,n),Ce=r,dt=l;break;case 0:case 11:case 14:case 15:if(!Oe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&((o&2)!==0||(o&4)!==0)&&ii(n,t,i),l=l.next}while(l!==r)}Bt(e,t,n);break;case 1:if(!Oe&&(Ln(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){ae(n,t,u)}Bt(e,t,n);break;case 21:Bt(e,t,n);break;case 22:n.mode&1?(Oe=(r=Oe)||n.memoizedState!==null,Bt(e,t,n),Oe=r):Bt(e,t,n);break;default:Bt(e,t,n)}}function as(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Ef),t.forEach(function(r){var l=Df.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function pt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,i=t,u=i;e:for(;u!==null;){switch(u.tag){case 5:Ce=u.stateNode,dt=!1;break e;case 3:Ce=u.stateNode.containerInfo,dt=!0;break e;case 4:Ce=u.stateNode.containerInfo,dt=!0;break e}u=u.return}if(Ce===null)throw Error(c(160));us(o,i,l),Ce=null,dt=!1;var a=l.alternate;a!==null&&(a.return=null),l.return=null}catch(m){ae(l,t,m)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)ss(t,e),t=t.sibling}function ss(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(pt(t,e),wt(e),r&4){try{mr(3,e,e.return),pl(3,e)}catch(T){ae(e,e.return,T)}try{mr(5,e,e.return)}catch(T){ae(e,e.return,T)}}break;case 1:pt(t,e),wt(e),r&512&&n!==null&&Ln(n,n.return);break;case 5:if(pt(t,e),wt(e),r&512&&n!==null&&Ln(n,n.return),e.flags&32){var l=e.stateNode;try{Mn(l,"")}catch(T){ae(e,e.return,T)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,u=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{u==="input"&&o.type==="radio"&&o.name!=null&&Fi(l,o),$l(u,i);var m=$l(u,o);for(i=0;i<a.length;i+=2){var x=a[i],w=a[i+1];x==="style"?Qi(l,w):x==="dangerouslySetInnerHTML"?Hi(l,w):x==="children"?Mn(l,w):$e(l,x,w,m)}switch(u){case"input":Ol(l,o);break;case"textarea":Ai(l,o);break;case"select":var g=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var _=o.value;_!=null?an(l,!!o.multiple,_,!1):g!==!!o.multiple&&(o.defaultValue!=null?an(l,!!o.multiple,o.defaultValue,!0):an(l,!!o.multiple,o.multiple?[]:"",!1))}l[rr]=o}catch(T){ae(e,e.return,T)}}break;case 6:if(pt(t,e),wt(e),r&4){if(e.stateNode===null)throw Error(c(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(T){ae(e,e.return,T)}}break;case 3:if(pt(t,e),wt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Kn(t.containerInfo)}catch(T){ae(e,e.return,T)}break;case 4:pt(t,e),wt(e);break;case 13:pt(t,e),wt(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(di=de())),r&4&&as(e);break;case 22:if(x=n!==null&&n.memoizedState!==null,e.mode&1?(Oe=(m=Oe)||x,pt(t,e),Oe=m):pt(t,e),wt(e),r&8192){if(m=e.memoizedState!==null,(e.stateNode.isHidden=m)&&!x&&(e.mode&1)!==0)for(z=e,x=e.child;x!==null;){for(w=z=x;z!==null;){switch(g=z,_=g.child,g.tag){case 0:case 11:case 14:case 15:mr(4,g,g.return);break;case 1:Ln(g,g.return);var P=g.stateNode;if(typeof P.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,P.props=t.memoizedProps,P.state=t.memoizedState,P.componentWillUnmount()}catch(T){ae(r,n,T)}}break;case 5:Ln(g,g.return);break;case 22:if(g.memoizedState!==null){ds(w);continue}}_!==null?(_.return=g,z=_):ds(w)}x=x.sibling}e:for(x=null,w=e;;){if(w.tag===5){if(x===null){x=w;try{l=w.stateNode,m?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(u=w.stateNode,a=w.memoizedProps.style,i=a!=null&&a.hasOwnProperty("display")?a.display:null,u.style.display=Wi("display",i))}catch(T){ae(e,e.return,T)}}}else if(w.tag===6){if(x===null)try{w.stateNode.nodeValue=m?"":w.memoizedProps}catch(T){ae(e,e.return,T)}}else if((w.tag!==22&&w.tag!==23||w.memoizedState===null||w===e)&&w.child!==null){w.child.return=w,w=w.child;continue}if(w===e)break e;for(;w.sibling===null;){if(w.return===null||w.return===e)break e;x===w&&(x=null),w=w.return}x===w&&(x=null),w.sibling.return=w.return,w=w.sibling}}break;case 19:pt(t,e),wt(e),r&4&&as(e);break;case 21:break;default:pt(t,e),wt(e)}}function wt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(os(n)){var r=n;break e}n=n.return}throw Error(c(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Mn(l,""),r.flags&=-33);var o=is(e);si(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,u=is(e);ai(e,u,i);break;default:throw Error(c(161))}}catch(a){ae(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function _f(e,t,n){z=e,cs(e)}function cs(e,t,n){for(var r=(e.mode&1)!==0;z!==null;){var l=z,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||dl;if(!i){var u=l.alternate,a=u!==null&&u.memoizedState!==null||Oe;u=dl;var m=Oe;if(dl=i,(Oe=a)&&!m)for(z=l;z!==null;)i=z,a=i.child,i.tag===22&&i.memoizedState!==null?ps(l):a!==null?(a.return=i,z=a):ps(l);for(;o!==null;)z=o,cs(o),o=o.sibling;z=l,dl=u,Oe=m}fs(e)}else(l.subtreeFlags&8772)!==0&&o!==null?(o.return=l,z=o):fs(e)}}function fs(e){for(;z!==null;){var t=z;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Oe||pl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Oe)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:ft(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&da(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}da(t,i,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var m=t.alternate;if(m!==null){var x=m.memoizedState;if(x!==null){var w=x.dehydrated;w!==null&&Kn(w)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(c(163))}Oe||t.flags&512&&ui(t)}catch(g){ae(t,t.return,g)}}if(t===e){z=null;break}if(n=t.sibling,n!==null){n.return=t.return,z=n;break}z=t.return}}function ds(e){for(;z!==null;){var t=z;if(t===e){z=null;break}var n=t.sibling;if(n!==null){n.return=t.return,z=n;break}z=t.return}}function ps(e){for(;z!==null;){var t=z;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{pl(4,t)}catch(a){ae(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(a){ae(t,l,a)}}var o=t.return;try{ui(t)}catch(a){ae(t,o,a)}break;case 5:var i=t.return;try{ui(t)}catch(a){ae(t,i,a)}}}catch(a){ae(t,t.return,a)}if(t===e){z=null;break}var u=t.sibling;if(u!==null){u.return=t.return,z=u;break}z=t.return}}var Nf=Math.ceil,ml=fe.ReactCurrentDispatcher,ci=fe.ReactCurrentOwner,it=fe.ReactCurrentBatchConfig,W=0,we=null,he=null,_e=0,tt=0,Tn=It(0),ye=0,hr=null,nn=0,hl=0,fi=0,vr=null,We=null,di=0,jn=1/0,Pt=null,vl=!1,pi=null,Vt=null,yl=!1,Ht=null,gl=0,yr=0,mi=null,xl=-1,wl=0;function Ue(){return(W&6)!==0?de():xl!==-1?xl:xl=de()}function Wt(e){return(e.mode&1)===0?1:(W&2)!==0&&_e!==0?_e&-_e:sf.transition!==null?(wl===0&&(wl=iu()),wl):(e=J,e!==0||(e=window.event,e=e===void 0?16:hu(e.type)),e)}function mt(e,t,n,r){if(50<yr)throw yr=0,mi=null,Error(c(185));Bn(e,n,r),((W&2)===0||e!==we)&&(e===we&&((W&2)===0&&(hl|=n),ye===4&&Qt(e,_e)),Qe(e,r),n===1&&W===0&&(t.mode&1)===0&&(jn=de()+500,Xr&&Ut()))}function Qe(e,t){var n=e.callbackNode;ac(e,t);var r=Lr(e,e===we?_e:0);if(r===0)n!==null&&ru(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ru(n),t===1)e.tag===0?af(hs.bind(null,e)):ea(hs.bind(null,e)),rf(function(){(W&6)===0&&Ut()}),n=null;else{switch(uu(r)){case 1:n=Kl;break;case 4:n=lu;break;case 16:n=_r;break;case 536870912:n=ou;break;default:n=_r}n=Es(n,ms.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ms(e,t){if(xl=-1,wl=0,(W&6)!==0)throw Error(c(327));var n=e.callbackNode;if(Rn()&&e.callbackNode!==n)return null;var r=Lr(e,e===we?_e:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=kl(e,r);else{t=r;var l=W;W|=2;var o=ys();(we!==e||_e!==t)&&(Pt=null,jn=de()+500,ln(e,t));do try{Lf();break}catch(u){vs(e,u)}while(!0);Ro(),ml.current=o,W=l,he!==null?t=0:(we=null,_e=0,t=ye)}if(t!==0){if(t===2&&(l=Yl(e),l!==0&&(r=l,t=hi(e,l))),t===1)throw n=hr,ln(e,0),Qt(e,r),Qe(e,de()),n;if(t===6)Qt(e,r);else{if(l=e.current.alternate,(r&30)===0&&!zf(l)&&(t=kl(e,r),t===2&&(o=Yl(e),o!==0&&(r=o,t=hi(e,o))),t===1))throw n=hr,ln(e,0),Qt(e,r),Qe(e,de()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(c(345));case 2:on(e,We,Pt);break;case 3:if(Qt(e,r),(r&130023424)===r&&(t=di+500-de(),10<t)){if(Lr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){Ue(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=ko(on.bind(null,e,We,Pt),t);break}on(e,We,Pt);break;case 4:if(Qt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var i=31-at(r);o=1<<i,i=t[i],i>l&&(l=i),r&=~o}if(r=l,r=de()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Nf(r/1960))-r,10<r){e.timeoutHandle=ko(on.bind(null,e,We,Pt),r);break}on(e,We,Pt);break;case 5:on(e,We,Pt);break;default:throw Error(c(329))}}}return Qe(e,de()),e.callbackNode===n?ms.bind(null,e):null}function hi(e,t){var n=vr;return e.current.memoizedState.isDehydrated&&(ln(e,t).flags|=256),e=kl(e,t),e!==2&&(t=We,We=n,t!==null&&vi(t)),e}function vi(e){We===null?We=e:We.push.apply(We,e)}function zf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!st(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Qt(e,t){for(t&=~fi,t&=~hl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-at(t),r=1<<n;e[n]=-1,t&=~r}}function hs(e){if((W&6)!==0)throw Error(c(327));Rn();var t=Lr(e,0);if((t&1)===0)return Qe(e,de()),null;var n=kl(e,t);if(e.tag!==0&&n===2){var r=Yl(e);r!==0&&(t=r,n=hi(e,r))}if(n===1)throw n=hr,ln(e,0),Qt(e,t),Qe(e,de()),n;if(n===6)throw Error(c(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,on(e,We,Pt),Qe(e,de()),null}function yi(e,t){var n=W;W|=1;try{return e(t)}finally{W=n,W===0&&(jn=de()+500,Xr&&Ut())}}function rn(e){Ht!==null&&Ht.tag===0&&(W&6)===0&&Rn();var t=W;W|=1;var n=it.transition,r=J;try{if(it.transition=null,J=1,e)return e()}finally{J=r,it.transition=n,W=t,(W&6)===0&&Ut()}}function gi(){tt=Tn.current,te(Tn)}function ln(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,nf(n)),he!==null)for(n=he.return;n!==null;){var r=n;switch(zo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Kr();break;case 3:zn(),te(Be),te(je),Ao();break;case 5:Uo(r);break;case 4:zn();break;case 13:te(oe);break;case 19:te(oe);break;case 10:Do(r.type._context);break;case 22:case 23:gi()}n=n.return}if(we=e,he=e=Kt(e.current,null),_e=tt=t,ye=0,hr=null,fi=hl=nn=0,We=vr=null,bt!==null){for(t=0;t<bt.length;t++)if(n=bt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}n.pending=r}bt=null}return e}function vs(e,t){do{var n=he;try{if(Ro(),ll.current=al,ol){for(var r=ie.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}ol=!1}if(tn=0,xe=ve=ie=null,sr=!1,cr=0,ci.current=null,n===null||n.return===null){ye=1,hr=t,he=null;break}e:{var o=e,i=n.return,u=n,a=t;if(t=_e,u.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var m=a,x=u,w=x.tag;if((x.mode&1)===0&&(w===0||w===11||w===15)){var g=x.alternate;g?(x.updateQueue=g.updateQueue,x.memoizedState=g.memoizedState,x.lanes=g.lanes):(x.updateQueue=null,x.memoizedState=null)}var _=Ba(i);if(_!==null){_.flags&=-257,Va(_,i,u,o,t),_.mode&1&&Aa(o,m,t),t=_,a=m;var P=t.updateQueue;if(P===null){var T=new Set;T.add(a),t.updateQueue=T}else P.add(a);break e}else{if((t&1)===0){Aa(o,m,t),xi();break e}a=Error(c(426))}}else if(le&&u.mode&1){var pe=Ba(i);if(pe!==null){(pe.flags&65536)===0&&(pe.flags|=256),Va(pe,i,u,o,t),To(Pn(a,u));break e}}o=a=Pn(a,u),ye!==4&&(ye=2),vr===null?vr=[o]:vr.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var d=Ua(o,a,t);fa(o,d);break e;case 1:u=a;var s=o.type,p=o.stateNode;if((o.flags&128)===0&&(typeof s.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(Vt===null||!Vt.has(p)))){o.flags|=65536,t&=-t,o.lanes|=t;var k=$a(o,u,t);fa(o,k);break e}}o=o.return}while(o!==null)}xs(n)}catch(j){t=j,he===n&&n!==null&&(he=n=n.return);continue}break}while(!0)}function ys(){var e=ml.current;return ml.current=al,e===null?al:e}function xi(){(ye===0||ye===3||ye===2)&&(ye=4),we===null||(nn&268435455)===0&&(hl&268435455)===0||Qt(we,_e)}function kl(e,t){var n=W;W|=2;var r=ys();(we!==e||_e!==t)&&(Pt=null,ln(e,t));do try{Pf();break}catch(l){vs(e,l)}while(!0);if(Ro(),W=n,ml.current=r,he!==null)throw Error(c(261));return we=null,_e=0,ye}function Pf(){for(;he!==null;)gs(he)}function Lf(){for(;he!==null&&!bs();)gs(he)}function gs(e){var t=Ss(e.alternate,e,tt);e.memoizedProps=e.pendingProps,t===null?xs(e):he=t,ci.current=null}function xs(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=kf(n,t,tt),n!==null){he=n;return}}else{if(n=Sf(n,t),n!==null){n.flags&=32767,he=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ye=6,he=null;return}}if(t=t.sibling,t!==null){he=t;return}he=t=e}while(t!==null);ye===0&&(ye=5)}function on(e,t,n){var r=J,l=it.transition;try{it.transition=null,J=1,Tf(e,t,n,r)}finally{it.transition=l,J=r}return null}function Tf(e,t,n,r){do Rn();while(Ht!==null);if((W&6)!==0)throw Error(c(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(c(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(sc(e,o),e===we&&(he=we=null,_e=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||yl||(yl=!0,Es(_r,function(){return Rn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=it.transition,it.transition=null;var i=J;J=1;var u=W;W|=4,ci.current=null,Cf(e,n),ss(n,e),Gc(xo),Rr=!!go,xo=go=null,e.current=n,_f(n),ec(),W=u,J=i,it.transition=o}else e.current=n;if(yl&&(yl=!1,Ht=e,gl=l),o=e.pendingLanes,o===0&&(Vt=null),rc(n.stateNode),Qe(e,de()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(vl)throw vl=!1,e=pi,pi=null,e;return(gl&1)!==0&&e.tag!==0&&Rn(),o=e.pendingLanes,(o&1)!==0?e===mi?yr++:(yr=0,mi=e):yr=0,Ut(),null}function Rn(){if(Ht!==null){var e=uu(gl),t=it.transition,n=J;try{if(it.transition=null,J=16>e?16:e,Ht===null)var r=!1;else{if(e=Ht,Ht=null,gl=0,(W&6)!==0)throw Error(c(331));var l=W;for(W|=4,z=e.current;z!==null;){var o=z,i=o.child;if((z.flags&16)!==0){var u=o.deletions;if(u!==null){for(var a=0;a<u.length;a++){var m=u[a];for(z=m;z!==null;){var x=z;switch(x.tag){case 0:case 11:case 15:mr(8,x,o)}var w=x.child;if(w!==null)w.return=x,z=w;else for(;z!==null;){x=z;var g=x.sibling,_=x.return;if(ls(x),x===m){z=null;break}if(g!==null){g.return=_,z=g;break}z=_}}}var P=o.alternate;if(P!==null){var T=P.child;if(T!==null){P.child=null;do{var pe=T.sibling;T.sibling=null,T=pe}while(T!==null)}}z=o}}if((o.subtreeFlags&2064)!==0&&i!==null)i.return=o,z=i;else e:for(;z!==null;){if(o=z,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:mr(9,o,o.return)}var d=o.sibling;if(d!==null){d.return=o.return,z=d;break e}z=o.return}}var s=e.current;for(z=s;z!==null;){i=z;var p=i.child;if((i.subtreeFlags&2064)!==0&&p!==null)p.return=i,z=p;else e:for(i=s;z!==null;){if(u=z,(u.flags&2048)!==0)try{switch(u.tag){case 0:case 11:case 15:pl(9,u)}}catch(j){ae(u,u.return,j)}if(u===i){z=null;break e}var k=u.sibling;if(k!==null){k.return=u.return,z=k;break e}z=u.return}}if(W=l,Ut(),vt&&typeof vt.onPostCommitFiberRoot=="function")try{vt.onPostCommitFiberRoot(Nr,e)}catch{}r=!0}return r}finally{J=n,it.transition=t}}return!1}function ws(e,t,n){t=Pn(n,t),t=Ua(e,t,1),e=At(e,t,1),t=Ue(),e!==null&&(Bn(e,1,t),Qe(e,t))}function ae(e,t,n){if(e.tag===3)ws(e,e,n);else for(;t!==null;){if(t.tag===3){ws(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Vt===null||!Vt.has(r))){e=Pn(n,e),e=$a(t,e,1),t=At(t,e,1),e=Ue(),t!==null&&(Bn(t,1,e),Qe(t,e));break}}t=t.return}}function jf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ue(),e.pingedLanes|=e.suspendedLanes&n,we===e&&(_e&n)===n&&(ye===4||ye===3&&(_e&130023424)===_e&&500>de()-di?ln(e,0):fi|=n),Qe(e,t)}function ks(e,t){t===0&&((e.mode&1)===0?t=1:(t=Pr,Pr<<=1,(Pr&130023424)===0&&(Pr=4194304)));var n=Ue();e=_t(e,t),e!==null&&(Bn(e,t,n),Qe(e,n))}function Rf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ks(e,n)}function Df(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(c(314))}r!==null&&r.delete(t),ks(e,n)}var Ss;Ss=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Be.current)He=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return He=!1,wf(e,t,n);He=(e.flags&131072)!==0}else He=!1,le&&(t.flags&1048576)!==0&&ta(t,Jr,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;fl(e,t),e=t.pendingProps;var l=wn(t,je.current);Nn(t,n),l=Ho(null,t,r,e,l,n);var o=Wo();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ve(r)?(o=!0,Yr(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Io(t),l.updater=sl,t.stateNode=l,l._reactInternals=t,Jo(t,r,e,n),t=ei(null,t,r,!0,o,n)):(t.tag=0,le&&o&&No(t),Fe(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(fl(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Mf(r),e=ft(r,e),l){case 0:t=bo(null,t,r,e,n);break e;case 1:t=Xa(null,t,r,e,n);break e;case 11:t=Ha(null,t,r,e,n);break e;case 14:t=Wa(null,t,r,ft(r.type,e),n);break e}throw Error(c(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:ft(r,l),bo(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:ft(r,l),Xa(e,t,r,l,n);case 3:e:{if(Ga(t),e===null)throw Error(c(387));r=t.pendingProps,o=t.memoizedState,l=o.element,ca(e,t),nl(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=Pn(Error(c(423)),t),t=Ja(e,t,r,n,l);break e}else if(r!==l){l=Pn(Error(c(424)),t),t=Ja(e,t,r,n,l);break e}else for(et=Mt(t.stateNode.containerInfo.firstChild),be=t,le=!0,ct=null,n=aa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(En(),r===l){t=zt(e,t,n);break e}Fe(e,t,r,n)}t=t.child}return t;case 5:return pa(t),e===null&&Lo(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,wo(r,l)?i=null:o!==null&&wo(r,o)&&(t.flags|=32),Ya(e,t),Fe(e,t,i,n),t.child;case 6:return e===null&&Lo(t),null;case 13:return qa(e,t,n);case 4:return Fo(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Cn(t,null,r,n):Fe(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:ft(r,l),Ha(e,t,r,l,n);case 7:return Fe(e,t,t.pendingProps,n),t.child;case 8:return Fe(e,t,t.pendingProps.children,n),t.child;case 12:return Fe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,i=l.value,Z(br,r._currentValue),r._currentValue=i,o!==null)if(st(o.value,i)){if(o.children===l.children&&!Be.current){t=zt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var u=o.dependencies;if(u!==null){i=o.child;for(var a=u.firstContext;a!==null;){if(a.context===r){if(o.tag===1){a=Nt(-1,n&-n),a.tag=2;var m=o.updateQueue;if(m!==null){m=m.shared;var x=m.pending;x===null?a.next=a:(a.next=x.next,x.next=a),m.pending=a}}o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Oo(o.return,n,t),u.lanes|=n;break}a=a.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(c(341));i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Oo(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}Fe(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,Nn(t,n),l=lt(l),r=r(l),t.flags|=1,Fe(e,t,r,n),t.child;case 14:return r=t.type,l=ft(r,t.pendingProps),l=ft(r.type,l),Wa(e,t,r,l,n);case 15:return Qa(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:ft(r,l),fl(e,t),t.tag=1,Ve(r)?(e=!0,Yr(t)):e=!1,Nn(t,n),Ia(t,r,l),Jo(t,r,l,n),ei(null,t,r,!0,e,n);case 19:return ba(e,t,n);case 22:return Ka(e,t,n)}throw Error(c(156,t.tag))};function Es(e,t){return nu(e,t)}function Of(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ut(e,t,n,r){return new Of(e,t,n,r)}function wi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mf(e){if(typeof e=="function")return wi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ge)return 11;if(e===Le)return 14}return 2}function Kt(e,t){var n=e.alternate;return n===null?(n=ut(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Sl(e,t,n,r,l,o){var i=2;if(r=e,typeof e=="function")wi(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case ge:return un(n.children,l,o,t);case Ee:i=8,l|=8;break;case Ae:return e=ut(12,n,t,l|2),e.elementType=Ae,e.lanes=o,e;case Ie:return e=ut(13,n,t,l),e.elementType=Ie,e.lanes=o,e;case Je:return e=ut(19,n,t,l),e.elementType=Je,e.lanes=o,e;case ne:return El(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Xe:i=10;break e;case ht:i=9;break e;case Ge:i=11;break e;case Le:i=14;break e;case Te:i=16,r=null;break e}throw Error(c(130,e==null?e:typeof e,""))}return t=ut(i,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function un(e,t,n,r){return e=ut(7,e,r,t),e.lanes=n,e}function El(e,t,n,r){return e=ut(22,e,r,t),e.elementType=ne,e.lanes=n,e.stateNode={isHidden:!1},e}function ki(e,t,n){return e=ut(6,e,null,t),e.lanes=n,e}function Si(e,t,n){return t=ut(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function If(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xl(0),this.expirationTimes=Xl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Ei(e,t,n,r,l,o,i,u,a){return e=new If(e,t,n,u,a),t===1?(t=1,o===!0&&(t|=8)):t=0,o=ut(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Io(o),e}function Ff(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Pe,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Cs(e){if(!e)return Ft;e=e._reactInternals;e:{if(Xt(e)!==e||e.tag!==1)throw Error(c(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(c(171))}if(e.tag===1){var n=e.type;if(Ve(n))return Zu(e,n,t)}return t}function _s(e,t,n,r,l,o,i,u,a){return e=Ei(n,r,!0,e,l,o,i,u,a),e.context=Cs(null),n=e.current,r=Ue(),l=Wt(n),o=Nt(r,l),o.callback=t??null,At(n,o,l),e.current.lanes=l,Bn(e,l,r),Qe(e,r),e}function Cl(e,t,n,r){var l=t.current,o=Ue(),i=Wt(l);return n=Cs(n),t.context===null?t.context=n:t.pendingContext=n,t=Nt(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=At(l,t,i),e!==null&&(mt(e,l,i,o),tl(e,l,i)),i}function _l(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ns(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ci(e,t){Ns(e,t),(e=e.alternate)&&Ns(e,t)}function Uf(){return null}var zs=typeof reportError=="function"?reportError:function(e){console.error(e)};function _i(e){this._internalRoot=e}Nl.prototype.render=_i.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(c(409));Cl(e,t,null,null)},Nl.prototype.unmount=_i.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;rn(function(){Cl(null,e,null,null)}),t[kt]=null}};function Nl(e){this._internalRoot=e}Nl.prototype.unstable_scheduleHydration=function(e){if(e){var t=cu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rt.length&&t!==0&&t<Rt[n].priority;n++);Rt.splice(n,0,e),n===0&&pu(e)}};function Ni(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function zl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ps(){}function $f(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var m=_l(i);o.call(m)}}var i=_s(t,r,e,0,null,!1,!1,"",Ps);return e._reactRootContainer=i,e[kt]=i.current,tr(e.nodeType===8?e.parentNode:e),rn(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var u=r;r=function(){var m=_l(a);u.call(m)}}var a=Ei(e,0,!1,null,null,!1,!1,"",Ps);return e._reactRootContainer=a,e[kt]=a.current,tr(e.nodeType===8?e.parentNode:e),rn(function(){Cl(t,a,n,r)}),a}function Pl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var u=l;l=function(){var a=_l(i);u.call(a)}}Cl(t,i,e,l)}else i=$f(n,t,e,l,r);return _l(i)}au=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=An(t.pendingLanes);n!==0&&(Gl(t,n|1),Qe(t,de()),(W&6)===0&&(jn=de()+500,Ut()))}break;case 13:rn(function(){var r=_t(e,1);if(r!==null){var l=Ue();mt(r,e,1,l)}}),Ci(e,1)}},Jl=function(e){if(e.tag===13){var t=_t(e,134217728);if(t!==null){var n=Ue();mt(t,e,134217728,n)}Ci(e,134217728)}},su=function(e){if(e.tag===13){var t=Wt(e),n=_t(e,t);if(n!==null){var r=Ue();mt(n,e,t,r)}Ci(e,t)}},cu=function(){return J},fu=function(e,t){var n=J;try{return J=e,t()}finally{J=n}},Vl=function(e,t,n){switch(t){case"input":if(Ol(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Qr(r);if(!l)throw Error(c(90));Mi(r),Ol(r,l)}}}break;case"textarea":Ai(e,n);break;case"select":t=n.value,t!=null&&an(e,!!n.multiple,t,!1)}},Gi=yi,Ji=rn;var Af={usingClientEntryPoint:!1,Events:[lr,gn,Qr,Yi,Xi,yi]},gr={findFiberByHostInstance:Gt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Bf={bundleType:gr.bundleType,version:gr.version,rendererPackageName:gr.rendererPackageName,rendererConfig:gr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:fe.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=eu(e),e===null?null:e.stateNode},findFiberByHostInstance:gr.findFiberByHostInstance||Uf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ll=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ll.isDisabled&&Ll.supportsFiber)try{Nr=Ll.inject(Bf),vt=Ll}catch{}}return Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Af,Ke.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ni(t))throw Error(c(200));return Ff(e,t,null,n)},Ke.createRoot=function(e,t){if(!Ni(e))throw Error(c(299));var n=!1,r="",l=zs;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Ei(e,1,!1,null,null,n,!1,r,l),e[kt]=t.current,tr(e.nodeType===8?e.parentNode:e),new _i(t)},Ke.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(c(188)):(e=Object.keys(e).join(","),Error(c(268,e)));return e=eu(t),e=e===null?null:e.stateNode,e},Ke.flushSync=function(e){return rn(e)},Ke.hydrate=function(e,t,n){if(!zl(t))throw Error(c(200));return Pl(null,e,t,!0,n)},Ke.hydrateRoot=function(e,t,n){if(!Ni(e))throw Error(c(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",i=zs;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=_s(t,null,e,1,n??null,l,!1,o,i),e[kt]=t.current,tr(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Nl(t)},Ke.render=function(e,t,n){if(!zl(t))throw Error(c(200));return Pl(null,e,t,!1,n)},Ke.unmountComponentAtNode=function(e){if(!zl(e))throw Error(c(40));return e._reactRootContainer?(rn(function(){Pl(null,null,e,!1,function(){e._reactRootContainer=null,e[kt]=null})}),!0):!1},Ke.unstable_batchedUpdates=yi,Ke.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!zl(n))throw Error(c(200));if(e==null||e._reactInternals===void 0)throw Error(c(38));return Pl(e,t,n,!1,r)},Ke.version="18.3.1-next-f1338f8080-20240426",Ke}var Is;function qf(){if(Is)return Li.exports;Is=1;function v(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v)}catch(L){console.error(L)}}return v(),Li.exports=Jf(),Li.exports}var Fs;function Zf(){if(Fs)return Tl;Fs=1;var v=qf();return Tl.createRoot=v.createRoot,Tl.hydrateRoot=v.hydrateRoot,Tl}var bf=Zf();/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ed=v=>v.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Qs=(...v)=>v.filter((L,c,H)=>!!L&&L.trim()!==""&&H.indexOf(L)===c).join(" ").trim();/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var td={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nd=ue.forwardRef(({color:v="currentColor",size:L=24,strokeWidth:c=2,absoluteStrokeWidth:H,className:$="",children:U,iconNode:q,...se},Y)=>ue.createElement("svg",{ref:Y,...td,width:L,height:L,stroke:v,strokeWidth:H?Number(c)*24/Number(L):c,className:Qs("lucide",$),...se},[...q.map(([me,ce])=>ue.createElement(me,ce)),...Array.isArray(U)?U:[U]]));/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dn=(v,L)=>{const c=ue.forwardRef(({className:H,...$},U)=>ue.createElement(nd,{ref:U,iconNode:L,className:Qs(`lucide-${ed(v)}`,H),...$}));return c.displayName=`${v}`,c};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Us=Dn("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rd=Dn("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=Dn("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ld=Dn("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const od=Dn("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ri=Dn("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),As="leave-tracker-data",Bs="leave-tracker-lang",id=["full","am","pm"],jl={full:1,am:.5,pm:.5},Di={ko:{name:"한국어",weekdays:["일","월","화","수","목","금","토"],title:"연차 관리",subtitle:"올해 사용한 연차와 남은 연차를 한눈에",saving:"저장 중",saved:"자동 저장됨",saveError:"자동 저장 실패 · JSON으로 내보내 두세요",daysRemaining:"일 남음",stateRelaxed:"여유",stateCaution:"주의",stateLow:"빠듯함",daysUsed:v=>`${v}일 사용`,daysOfTotal:v=>`${v}일 중`,caption:(v,L)=>`${L}일 중 ${v}일 사용`,totalDaysLabel:v=>`총 연차 ${v}일`,totalDaysEditLabel:"총 연차 일수",settings:"설정",saveSettings:"저장",history:"사용 내역",empty:"아직 등록된 연차 사용 내역이 없습니다.",addEntry:"사용 내역 추가",noLeaveLeft:"남은 연차가 없습니다",date:"날짜",type:"종류",memo:"메모 (선택)",memoPlaceholder:"예: 감기, 몸살, 병원 진료",cancel:"취소",save:"추가",saveEdit:"수정 저장",editLabel:"수정",deleteLabel:"삭제",confirmDelete:"이 사용 내역을 삭제할까요?",exportBtn:"내보내기 (JSON)",importBtn:"불러오기 (JSON)",typeLabels:{full:"연차",am:"오전 반차",pm:"오후 반차"},fmtDate:(v,L)=>{const c=new Date(v+"T00:00:00");return`${c.getMonth()+1}월 ${c.getDate()}일 (${L[c.getDay()]})`}},en:{name:"English",weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],title:"Leave Tracker",subtitle:"See your used and remaining leave at a glance",saving:"Saving",saved:"Saved automatically",saveError:"Auto-save failed · export a JSON backup",daysRemaining:" days left",stateRelaxed:"Relaxed",stateCaution:"Caution",stateLow:"Tight",daysUsed:v=>`${v} days used`,daysOfTotal:v=>`of ${v}`,caption:(v,L)=>`${v} of ${L} days used`,totalDaysLabel:v=>`Total leave: ${v} days`,totalDaysEditLabel:"Total leave days",settings:"Settings",saveSettings:"Save",history:"History",empty:"No leave entries yet.",addEntry:"Add entry",noLeaveLeft:"No leave days left",date:"Date",type:"Type",memo:"Memo (optional)",memoPlaceholder:"e.g. Cold, fever, hospital visit",cancel:"Cancel",save:"Add",saveEdit:"Save changes",editLabel:"Edit",deleteLabel:"Delete",confirmDelete:"Delete this leave record?",exportBtn:"Export (JSON)",importBtn:"Import (JSON)",typeLabels:{full:"Full day",am:"Half day (AM)",pm:"Half day (PM)"},fmtDate:(v,L)=>{const c=new Date(v+"T00:00:00");return`${L[c.getDay()]}, ${c.toLocaleString("en-US",{month:"short"})} ${c.getDate()}`}},uz:{name:"O'zbekcha",weekdays:["Yak","Dush","Sesh","Chor","Pay","Jum","Shan"],title:"Ta'til boshqaruvi",subtitle:"Ta'tilingizning ishlatilgan va qolgan kunlarini bir qarashda ko'ring",saving:"Saqlanmoqda",saved:"Avtomatik saqlandi",saveError:"Avtomatik saqlash muvaffaqiyatsiz · JSON sifatida eksport qiling",daysRemaining:" kun qoldi",stateRelaxed:"Bepul",stateCaution:"Ehtiyot",stateLow:"Tor",daysUsed:v=>`${v} kun ishlatildi`,daysOfTotal:v=>`${v} kundan`,caption:(v,L)=>`${L} kundan ${v} kun ishlatildi`,totalDaysLabel:v=>`Jami ta'til: ${v} kun`,totalDaysEditLabel:"Jami ta'til kunlari",settings:"Sozlamalar",saveSettings:"Saqlash",history:"Tarix",empty:"Hozircha ta'til yozuvlari yo'q.",addEntry:"Yozuv qo'shish",noLeaveLeft:"Ta'til kuni qolmadi",date:"Sana",type:"Ta'til turi",memo:"Izoh (ixtiyoriy)",memoPlaceholder:"masalan: shamollash, isitma, shifokor ko'rigi",cancel:"Bekor qilish",save:"Qo'shish",saveEdit:"O'zgarishlarni saqlash",editLabel:"Tahrirlash",deleteLabel:"O'chirish",confirmDelete:"Bu yozuvni o'chirilsinmi?",exportBtn:"Eksport (JSON)",importBtn:"Import (JSON)",typeLabels:{full:"To'liq kun",am:"Yarim kun (ertalab)",pm:"Yarim kun (tushdan keyin)"},fmtDate:(v,L)=>{const c=new Date(v+"T00:00:00"),H=["yan","fev","mar","apr","may","iyn","iyl","avg","sen","okt","noy","dek"];return`${c.getDate()}-${H[c.getMonth()]}, ${L[c.getDay()]}`}}},Rl=()=>Math.random().toString(36).slice(2,9),Vs=()=>new Date().toISOString().slice(0,10);function ud(){const[v,L]=ue.useState("ko"),c=Di[v],[H,$]=ue.useState(15),[U,q]=ue.useState([{id:Rl(),date:"2026-03-10",type:"full",memo:"가족 여행"},{id:Rl(),date:"2026-05-06",type:"am",memo:"병원 진료"}]),[se,Y]=ue.useState(!1),[me,ce]=ue.useState(String(H)),[b,G]=ue.useState(!1),[Me,Ne]=ue.useState(!1),[Q,X]=ue.useState(null),[Se,ze]=ue.useState({date:Vs(),type:"full",memo:""}),$e=ue.useRef(null),[fe,Ye]=ue.useState(!1),[Pe,ge]=ue.useState("idle");ue.useEffect(()=>{let h=!1;return(async()=>{try{const S=await window.storage.get(As,!1);if(!h&&(S!=null&&S.value)){const M=JSON.parse(S.value);typeof M.totalDays=="number"&&$(M.totalDays),Array.isArray(M.entries)&&q(M.entries)}}catch{}try{const S=await window.storage.get(Bs,!1);!h&&(S!=null&&S.value)&&Di[S.value]&&L(S.value)}catch{}finally{h||Ye(!0)}})(),()=>{h=!0}},[]),ue.useEffect(()=>{if(!fe)return;ge("saving");const h=setTimeout(async()=>{try{const S=await window.storage.set(As,JSON.stringify({totalDays:H,entries:U}),!1);ge(S?"saved":"error")}catch{ge("error")}},400);return()=>clearTimeout(h)},[H,U,fe]),ue.useEffect(()=>{fe&&window.storage.set(Bs,v,!1).catch(()=>{})},[v,fe]);const Ee=ue.useMemo(()=>U.reduce((h,S)=>h+jl[S.type],0),[U]),Ae=H-Ee,Xe=H>0?Math.min(Ee/H,1):0,ht=Xe<.5?"relaxed":Xe<=.8?"caution":"low",Ge=ue.useMemo(()=>[...U].sort((h,S)=>h.date<S.date?1:-1),[U]);function Ie(){X(null),ze({date:Vs(),type:"full",memo:""}),Ne(!0)}function Je(h){X(h.id),ze({date:h.date,type:h.type,memo:h.memo}),Ne(!0)}function Le(){Ne(!1),X(null)}function Te(h){if(h.preventDefault(),!Se.date)return;const S=jl[Se.type]||0;(Q?U.filter(I=>I.id!==Q).reduce((I,B)=>I+jl[B.type],0):Ee)+S>H+1e-9||(q(Q?I=>I.map(B=>B.id===Q?{...B,...Se}:B):I=>[...I,{id:Rl(),...Se}]),Le())}function ne(h){window.confirm(c.confirmDelete)&&(q(S=>S.filter(M=>M.id!==h)),Q===h&&Le())}function E(){ce(String(H)),G(!0)}function R(){const h=parseFloat(me);!isNaN(h)&&h>=0&&$(h),Y(!1),G(!1)}function N(){const h={totalDays:H,entries:U},S=new Blob([JSON.stringify(h,null,2)],{type:"application/json"}),M=URL.createObjectURL(S),I=document.createElement("a");I.href=M,I.download=`leave-data-${new Date().getFullYear()}.json`,I.click(),URL.revokeObjectURL(M)}function f(){var h;(h=$e.current)==null||h.click()}function y(h){var I;const S=(I=h.target.files)==null?void 0:I[0];if(!S)return;const M=new FileReader;M.onload=()=>{try{const B=JSON.parse(M.result);typeof B.totalDays=="number"&&Array.isArray(B.entries)&&($(B.totalDays),q(B.entries.map(V=>({id:V.id||Rl(),date:V.date,type:jl[V.type]!==void 0?V.type:"full",memo:V.memo||""}))))}catch{}},M.readAsText(S),h.target.value=""}return C.jsxs("div",{className:"lt-root",children:[C.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .lt-root {
          --bg: #0d1117;
          --bg-soft: #10151c;
          --card: #161b22;
          --card-hover: #1c2128;

          --border: #30363d;
          --border-soft: #21262d;

          --text: #e6edf3;
          --text-soft: #8b949e;
          --text-muted: #6e7681;

          --accent: #58a6ff;
          --accent-hover: #79b8ff;

          --green: #3fb950;
          --red: #f85149;

          min-height: 100vh;

          background: var(--bg);

          font-family:
            'Noto Sans KR',
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          color: var(--text);

          padding: 32px 20px 56px;

          display: flex;
          justify-content: center;

          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .lt-page {
          width: 100%;
          max-width: 480px;
        }

        /* --------------------------------
           Language
        -------------------------------- */

        .lt-lang-row {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 26px;
        }

        .lt-lang-btn {
          appearance: none;

          background: transparent;

          border: 1px solid var(--border);

          border-radius: 6px;

          color: var(--text-soft);

          font-family: inherit;

          font-size: 12px;

          padding: 6px 11px;

          cursor: pointer;

          transition:
            color .15s ease,
            background .15s ease,
            border-color .15s ease;
        }

        .lt-lang-btn:hover {
          color: var(--text);
          background: var(--card);
          border-color: #484f58;
        }

        .lt-lang-btn.active {
          color: var(--text);
          background: var(--card);
          border-color: var(--accent);
        }

        /* --------------------------------
           Header
        -------------------------------- */

        .lt-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .lt-title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .lt-title {
          margin: 0;

          color: var(--text);

          font-size: 23px;
          font-weight: 700;

          letter-spacing: -0.035em;
          line-height: 1.4;
        }

        .lt-settings-btn {
          appearance: none;

          background: transparent;

          border: 1px solid var(--border);

          border-radius: 8px;

          color: var(--text-soft);

          cursor: pointer;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 32px;
          height: 32px;

          transition:
            color .15s ease,
            border-color .15s ease,
            background .15s ease;
        }

        .lt-settings-btn:hover {
          color: var(--text);

          border-color: #484f58;

          background: var(--card);
        }

        .lt-sub {
          margin: 6px 0 0;

          color: var(--text-soft);

          font-size: 13px;

          line-height: 1.5;
        }

        .lt-save-status {
          height: 17px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 5px;

          margin-top: 9px;

          color: var(--text-muted);

          font-size: 11px;
        }

        .lt-save-status.error {
          color: var(--red);
        }

        .lt-spin {
          animation: lt-spin .8s linear infinite;
        }

        @keyframes lt-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* --------------------------------
           Remaining days
        -------------------------------- */

        .lt-stamp-wrap {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;

          margin: 8px 0 24px;
        }

        .lt-stamp {
          width: 178px;
          height: 178px;

          border-radius: 50%;

          border: 1px solid var(--border);

          background:
            radial-gradient(
              circle at center,
              #1b222c 0%,
              #161b22 68%,
              #13181f 100%
            );

          box-shadow:
            0 0 0 7px rgba(88, 166, 255, 0.035),
            0 14px 35px rgba(0, 0, 0, .28);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          position: relative;
        }

        .lt-stamp::before {
          content: "";

          position: absolute;

          inset: 9px;

          border-radius: 50%;

          border: 1px solid var(--border-soft);
        }

        .lt-stamp-num {
          position: relative;

          color: var(--text);

          font-size: 46px;

          font-weight: 700;

          line-height: 1;

          letter-spacing: -0.045em;
        }

        .lt-stamp-label {
          position: relative;

          color: var(--text-soft);

          font-size: 13px;

          margin-top: 8px;

          font-weight: 500;
        }

        /* --------------------------------
           Ring progress (circular)
        -------------------------------- */

        .lt-ring {
          position: relative;

          width: 200px;
          height: 200px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lt-ring .lt-stamp {
          position: relative;

          z-index: 1;

          box-shadow: none;
        }

        .lt-ring-svg {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          transform: rotate(-90deg);
        }

        .lt-ring-track,
        .lt-ring-fill {
          fill: none;

          stroke-width: 12;
        }

        .lt-ring-track {
          stroke: #3c454f;

          opacity: .9;
        }

        .lt-ring-fill {
          stroke: var(--green);

          stroke-linecap: round;

          filter: drop-shadow(0 0 4px rgba(63, 185, 80, .55));

          transition: stroke-dashoffset .4s ease, stroke .2s ease;
        }

        .lt-ring-caption {
          text-align: center;

          color: var(--text-soft);

          font-size: 11px;

          margin-top: 8px;
        }

        /* 3단계 색상: 여유(초록) / 주의(노랑) / 빠듯함(빨강) */
        .lt-tier-relaxed { color: var(--green); }
        .lt-tier-caution { color: #f0b429; }
        .lt-tier-low { color: var(--red); }

        .lt-ring-fill.lt-tier-caution {
          stroke: #f0b429;

          filter: drop-shadow(0 0 4px rgba(240, 180, 41, .55));
        }
        .lt-ring-fill.lt-tier-low {
          stroke: var(--red);

          filter: drop-shadow(0 0 4px rgba(248, 81, 73, .55));
        }

        /* 스탬프 배경/링: 단계색 그라데이션 */
        .lt-stamp.lt-tier-relaxed {
          background:
            radial-gradient(
              circle at center,
              rgba(63, 185, 80, 0.18) 0%,
              #161b22 70%,
              #13181f 100%
            );
          box-shadow:
            0 0 0 7px rgba(63, 185, 80, 0.08),
            0 14px 35px rgba(0, 0, 0, .28);
        }

        .lt-stamp.lt-tier-caution {
          background:
            radial-gradient(
              circle at center,
              rgba(227, 179, 65, 0.20) 0%,
              #161b22 70%,
              #13181f 100%
            );
          box-shadow:
            0 0 0 7px rgba(227, 179, 65, 0.10),
            0 14px 35px rgba(0, 0, 0, .28);
        }

        .lt-stamp.lt-tier-low {
          background:
            radial-gradient(
              circle at center,
              rgba(248, 81, 73, 0.20) 0%,
              #161b22 70%,
              #13181f 100%
            );
          box-shadow:
            0 0 0 7px rgba(248, 81, 73, 0.10),
            0 14px 35px rgba(0, 0, 0, .28);
        }

        .lt-stamp.lt-tier-relaxed .lt-stamp-num,
        .lt-stamp.lt-tier-caution .lt-stamp-num,
        .lt-stamp.lt-tier-low .lt-stamp-num {
          color: inherit;
        }

        /* --------------------------------
           Total
        -------------------------------- */

        .lt-total-row {
          display: flex;

          justify-content: center;
          align-items: center;

          gap: 7px;

          color: var(--text-muted);

          font-size: 12px;

          margin-bottom: 30px;
        }

        .lt-total-edit-btn {
          appearance: none;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 3px;

          border: 0;

          background: transparent;

          color: var(--text-muted);

          cursor: pointer;

          border-radius: 4px;

          transition:
            color .15s ease,
            background .15s ease;
        }

        .lt-total-edit-btn:hover {
          color: var(--text);
          background: var(--card);
        }

        .lt-total-input {
          width: 58px;

          padding: 3px 4px;

          border: 0;

          border-bottom: 1px solid var(--accent);

          background: transparent;

          color: var(--text);

          font-family: inherit;

          font-size: 12px;

          text-align: center;
        }

        .lt-total-input:focus {
          outline: none;
        }

        /* --------------------------------
           History
        -------------------------------- */

        .lt-section-title {
          padding: 0 0 10px;

          border-bottom: 1px solid var(--border);

          color: var(--text-soft);

          font-size: 12px;

          font-weight: 600;

          letter-spacing: .01em;
        }

        .lt-entry {
          display: flex;

          justify-content: space-between;
          align-items: center;

          gap: 14px;

          min-height: 68px;

          padding: 13px 2px;

          border-bottom: 1px solid var(--border-soft);

          transition:
            background .15s ease;
        }

        .lt-entry:hover {
          background: rgba(255,255,255,.018);
        }

        .lt-entry-left {
          min-width: 0;

          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 4px 8px;
        }

        .lt-entry-date,
        .lt-entry-type,
        .lt-entry-memo {
          color: var(--text);

          font-size: 13px;

          font-weight: 500;

          line-height: 1.4;
        }

        .lt-entry-date {
          white-space: nowrap;
        }

        .lt-entry-type {
          color: var(--accent);
        }

        .lt-entry-memo {
          color: var(--text-soft);

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .lt-entry-actions {
          display: flex;

          gap: 2px;

          flex-shrink: 0;
        }

        .lt-icon-btn {
          appearance: none;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 30px;
          height: 30px;

          padding: 0;

          border: 0;

          border-radius: 6px;

          background: transparent;

          color: var(--text-muted);

          cursor: pointer;

          transition:
            color .15s ease,
            background .15s ease;
        }

        .lt-icon-btn:hover {
          color: var(--text);

          background: var(--card);
        }

        .lt-icon-btn:last-child:hover {
          color: var(--red);
        }

        .lt-entry-actions {
          display: flex;
          gap: 6px;
        }

        .lt-entry-btn {
          appearance: none;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 5px;

          padding: 5px 9px;

          border: 1px solid var(--border-soft);

          border-radius: 6px;

          background: transparent;

          color: var(--text-soft);

          font-family: inherit;

          font-size: 11px;

          font-weight: 500;

          cursor: pointer;

          white-space: nowrap;

          transition:
            color .15s ease,
            border-color .15s ease,
            background .15s ease;
        }

        .lt-entry-btn:hover {
          color: var(--text);

          border-color: #484f58;

          background: var(--card);
        }

        .lt-entry-btn.danger {
          color: var(--text-muted);
        }

        .lt-entry-btn.danger:hover {
          color: var(--red);

          border-color: rgba(248, 81, 73, .5);

          background: rgba(248, 81, 73, .08);
        }

        .lt-empty {
          padding: 30px 10px;

          color: var(--text-muted);

          font-size: 12px;

          text-align: center;
        }

        /* --------------------------------
           Add button
        -------------------------------- */

        .lt-add-btn {
          appearance: none;

          width: 100%;

          margin-top: 14px;

          padding: 12px 14px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          border: 1px solid #1f6feb;

          border-radius: 8px;

          background: linear-gradient(180deg, #2f81f7, #1f6feb);

          color: #fff;

          font-family: inherit;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;

          box-shadow:
            0 1px 0 rgba(255, 255, 255, .12) inset,
            0 4px 12px rgba(31, 111, 235, .28);

          transition:
            background .15s ease,
            box-shadow .1s ease,
            transform .1s ease;
        }

        .lt-add-btn:hover {
          background: linear-gradient(180deg, #388bfd, #1f6feb);

          box-shadow:
            0 1px 0 rgba(255, 255, 255, .12) inset,
            0 6px 16px rgba(31, 111, 235, .35);
        }

        .lt-add-btn:active {
          background: linear-gradient(180deg, #1f6feb, #1961c8);

          transform: translateY(1px);

          box-shadow:
            0 1px 0 rgba(255, 255, 255, .08) inset,
            0 2px 6px rgba(31, 111, 235, .25);
        }

        .lt-add-btn.disabled,
        .lt-add-btn:disabled {
          cursor: not-allowed;

          opacity: .5;

          border-color: var(--border-soft);

          background: var(--card);

          color: var(--text-muted);

          box-shadow: none;
        }

        .lt-add-btn.disabled:hover,
        .lt-add-btn:disabled:hover {
          color: var(--text-muted);

          border-color: var(--border-soft);

          background: var(--card);

          box-shadow: none;
        }

        /* --------------------------------
           Form
        -------------------------------- */

        .lt-form {
          margin-top: 14px;

          padding: 18px;

          border: 1px solid var(--border);

          border-radius: 9px;

          background: var(--card);

          box-shadow:
            0 12px 30px rgba(0, 0, 0, .18);
        }

        .lt-form-row {
          display: flex;

          flex-direction: column;

          gap: 6px;

          margin-bottom: 14px;
        }

        .lt-form-row label {
          color: var(--text-soft);

          font-size: 11px;

          font-weight: 500;
        }

        .lt-form-row input,
        .lt-form-row select {
          width: 100%;

          appearance: none;

          padding: 9px 10px;

          border: 1px solid var(--border);

          border-radius: 6px;

          background: var(--bg);

          color: var(--text);

          font-family: inherit;

          font-size: 13px;

          transition:
            border-color .15s ease,
            box-shadow .15s ease;
        }

        .lt-form-row input::placeholder {
          color: var(--text-muted);
        }

        .lt-form-row input:hover,
        .lt-form-row select:hover {
          border-color: #484f58;
        }

        .lt-form-row input:focus,
        .lt-form-row select:focus {
          outline: none;

          border-color: var(--accent);

          box-shadow:
            0 0 0 3px rgba(88, 166, 255, .12);
        }

        .lt-form-row input[type="date"] {
          color-scheme: dark;
        }

        /* --------------------------------
           Leave type
        -------------------------------- */

        .lt-type-group {
          display: flex;

          gap: 6px;
        }

        .lt-type-opt {
          flex: 1;

          padding: 9px 5px;

          border: 1px solid var(--border);

          border-radius: 6px;

          background: var(--bg);

          color: var(--text-soft);

          font-size: 12px;

          text-align: center;

          cursor: pointer;

          transition:
            color .15s ease,
            border-color .15s ease,
            background .15s ease;
        }

        .lt-type-opt:hover {
          color: var(--text);

          border-color: #484f58;
        }

        .lt-type-opt.active {
          border-color: var(--accent);

          background: rgba(88, 166, 255, .08);

          color: var(--accent);

          font-weight: 600;
        }

        /* --------------------------------
           Settings modal
        -------------------------------- */

        .lt-overlay {
          position: fixed;

          inset: 0;

          background: rgba(1, 4, 9, 0.7);

          display: flex;
          align-items: flex-end;
          justify-content: center;

          z-index: 50;

          padding: 0;
        }

        .lt-modal {
          width: 100%;
          max-width: 420px;
          max-height: 88vh;
          overflow-y: auto;

          background: var(--bg-soft);

          border: 1px solid var(--border);

          border-top-left-radius: 14px;
          border-top-right-radius: 14px;

          padding: 16px;
        }

        @media (min-width: 520px) {
          .lt-overlay {
            align-items: center;
            padding: 20px;
          }

          .lt-modal {
            border-radius: 14px;
          }
        }

        .lt-modal-title {
          display: flex;
          align-items: center;
          justify-content: space-between;

          font-size: 15px;
          font-weight: 600;

          margin-bottom: 14px;
        }

        /* --------------------------------
           Form buttons
        -------------------------------- */

        .lt-form-actions {
          display: flex;

          gap: 8px;

          margin-top: 4px;
        }

        .lt-btn {
          flex: 1;

          appearance: none;

          padding: 10px;

          border: 1px solid var(--accent);

          border-radius: 6px;

          background: var(--accent);

          color: #08111b;

          font-family: inherit;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          transition:
            background .15s ease,
            border-color .15s ease,
            transform .05s ease;
        }

        .lt-btn:hover {
          background: var(--accent-hover);
          border-color: var(--accent-hover);
        }

        .lt-btn:active {
          transform: translateY(1px);
        }

        .lt-btn.secondary {
          border-color: var(--border);

          background: transparent;

          color: var(--text-soft);
        }

        .lt-btn.secondary:hover {
          border-color: #484f58;

          background: var(--bg);

          color: var(--text);
        }

        /* --------------------------------
           Footer
        -------------------------------- */

        .lt-footer {
          display: flex;

          justify-content: center;

          gap: 18px;

          margin-top: 30px;

          padding-top: 16px;

          border-top: 1px solid var(--border-soft);
        }

        .lt-text-btn {
          appearance: none;

          display: inline-flex;

          align-items: center;

          gap: 6px;

          padding: 5px;

          border: 0;

          background: transparent;

          color: var(--text-muted);

          font-family: inherit;

          font-size: 11px;

          cursor: pointer;

          transition:
            color .15s ease;
        }

        .lt-text-btn:hover {
          color: var(--text);
        }

        /* --------------------------------
           Animation
        -------------------------------- */

        @media (prefers-reduced-motion: no-preference) {
          .lt-form {
            animation: lt-drop .16s ease-out;
          }
        }

        @keyframes lt-drop {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* --------------------------------
           Mobile
        -------------------------------- */

        @media (max-width: 480px) {
          .lt-root {
            padding: 24px 16px 44px;
          }

          .lt-title {
            font-size: 21px;
          }

          .lt-stamp {
            width: 164px;
            height: 164px;
          }

          .lt-stamp-num {
            font-size: 42px;
          }

          .lt-form {
            padding: 16px;
          }

          .lt-form-row input,
          .lt-form-row select {
            font-size: 16px;
          }

          .lt-entry-left {
            gap: 4px 8px;
          }

          .lt-entry-memo {
            flex-basis: 100%;
            white-space: normal;
            word-break: break-word;
          }
        }
      `}),C.jsxs("div",{className:"lt-page",children:[C.jsx("div",{className:"lt-lang-row",children:Object.entries(Di).sort(([h],[S])=>(S===v)-(h===v)).map(([h,S])=>C.jsxs("button",{className:`lt-lang-btn ${v===h?"active":""}`,onClick:()=>L(h),children:[v===h?"✓ ":"",S.name]},h))}),C.jsx("div",{className:"lt-header",children:C.jsxs("div",{className:"lt-title-row",children:[C.jsx("p",{className:"lt-title",children:c.title}),C.jsx("button",{className:"lt-settings-btn",onClick:E,"aria-label":c.settings,title:c.settings,children:C.jsx(ld,{size:17})})]})}),C.jsxs("div",{className:"lt-stamp-wrap",children:[C.jsxs("div",{className:`lt-ring lt-tier-${ht}`,children:[C.jsxs("svg",{className:"lt-ring-svg",viewBox:"0 0 200 200",children:[C.jsx("circle",{className:"lt-ring-track",cx:"100",cy:"100",r:"90"}),C.jsx("circle",{className:"lt-ring-fill",cx:"100",cy:"100",r:"90",style:{strokeDasharray:`${2*Math.PI*90}`,strokeDashoffset:`${2*Math.PI*90*(1-Xe)}`}})]}),C.jsxs("div",{className:`lt-stamp lt-tier-${ht}`,children:[C.jsx("span",{className:"lt-stamp-num",children:Ae}),C.jsx("span",{className:"lt-stamp-label",children:c.daysRemaining})]})]}),C.jsx("div",{className:"lt-ring-caption",children:c.caption(Ee,H)})]}),C.jsx("div",{className:"lt-section-title",children:c.history}),Ge.length===0&&C.jsx("div",{className:"lt-empty",children:c.empty}),Ge.map(h=>C.jsxs("div",{className:"lt-entry",children:[C.jsxs("div",{className:"lt-entry-left",children:[C.jsx("span",{className:"lt-entry-date",children:c.fmtDate(h.date,c.weekdays)}),C.jsx("span",{className:"lt-entry-type",children:c.typeLabels[h.type]}),h.memo&&C.jsx("span",{className:"lt-entry-memo",children:h.memo})]}),C.jsxs("div",{className:"lt-entry-actions",children:[C.jsxs("button",{className:"lt-entry-btn",onClick:S=>{S.stopPropagation(),Je(h)},"aria-label":c.editLabel,children:[C.jsx($s,{size:13}),c.editLabel]}),C.jsxs("button",{className:"lt-entry-btn danger",onClick:S=>{S.stopPropagation(),ne(h.id)},"aria-label":c.deleteLabel,children:[C.jsx(Ri,{size:13}),c.deleteLabel]})]})]},h.id)),!Me&&C.jsxs("button",{className:`lt-add-btn ${Ae<=0?"disabled":""}`,onClick:Ae>0?Ie:void 0,disabled:Ae<=0,children:[C.jsx($s,{size:15}),Ae>0?c.addEntry:c.noLeaveLeft]}),C.jsxs("div",{className:"lt-footer",children:[C.jsxs("button",{className:"lt-text-btn",onClick:N,children:[C.jsx(rd,{size:14}),c.exportBtn]}),C.jsxs("button",{className:"lt-text-btn",onClick:f,children:[C.jsx(od,{size:14}),c.importBtn]}),C.jsx("input",{ref:$e,type:"file",accept:"application/json",style:{display:"none"},onChange:y})]})]}),b&&C.jsx("div",{className:"lt-overlay",onClick:()=>G(!1),children:C.jsxs("div",{className:"lt-modal",onClick:h=>h.stopPropagation(),children:[C.jsxs("div",{className:"lt-modal-title",children:[c.settings,C.jsx("button",{type:"button",className:"lt-icon-btn",onClick:()=>G(!1),"aria-label":c.cancel,children:C.jsx(Ri,{size:16})})]}),C.jsxs("div",{className:"lt-form-row",children:[C.jsx("label",{children:c.totalDaysEditLabel}),C.jsx("input",{type:"number",step:"0.5",value:me,onChange:h=>ce(h.target.value),onKeyDown:h=>h.key==="Enter"&&R(),autoFocus:!0})]}),C.jsxs("div",{className:"lt-form-actions",children:[C.jsx("button",{type:"button",className:"lt-btn secondary",onClick:()=>G(!1),children:c.cancel}),C.jsxs("button",{type:"button",className:"lt-btn",onClick:R,children:[C.jsx(Us,{size:14}),c.saveSettings]})]})]})}),Me&&C.jsx("div",{className:"lt-overlay",onClick:Le,children:C.jsxs("form",{className:"lt-modal",onClick:h=>h.stopPropagation(),onSubmit:Te,children:[C.jsxs("div",{className:"lt-modal-title",children:[Q?c.saveEdit:c.addEntry,C.jsx("button",{type:"button",className:"lt-icon-btn",onClick:Le,"aria-label":c.cancel,children:C.jsx(Ri,{size:16})})]}),C.jsxs("div",{className:"lt-form-row",children:[C.jsx("label",{children:c.date}),C.jsx("input",{type:"date",value:Se.date,onChange:h=>ze(S=>({...S,date:h.target.value})),required:!0})]}),C.jsxs("div",{className:"lt-form-row",children:[C.jsx("label",{children:c.type}),C.jsx("div",{className:"lt-type-group",children:id.map(h=>C.jsx("div",{className:`lt-type-opt ${Se.type===h?"active":""}`,onClick:()=>ze(S=>({...S,type:h})),children:c.typeLabels[h]},h))})]}),C.jsxs("div",{className:"lt-form-row",children:[C.jsx("label",{children:c.memo}),C.jsx("input",{type:"text",placeholder:c.memoPlaceholder,value:Se.memo,onChange:h=>ze(S=>({...S,memo:h.target.value}))})]}),C.jsxs("div",{className:"lt-form-actions",children:[C.jsx("button",{type:"button",className:"lt-btn secondary",onClick:Le,children:c.cancel}),C.jsxs("button",{type:"submit",className:"lt-btn",children:[C.jsx(Us,{size:14}),Q?c.saveEdit:c.save]})]})]})})]})}const Hs="annualleave-build-hash",Ws="annualleave-reloaded";function ad(){try{const v=performance.getEntriesByType("resource")||[];for(const c of v)if(/\/assets\/index-[\w-]+\.js/.test(c.name))return c.name;const L=document.getElementsByTagName("script");for(const c of L)if(/\/assets\/index-[\w-]+\.js/.test(c.src||""))return c.src}catch{}return null}window.storage||(window.storage={async get(v){try{const L=localStorage.getItem(v);return{value:L===null?null:L}}catch{return{value:null}}},async set(v,L){try{return localStorage.setItem(v,L),!0}catch{return!1}}});(function(){try{const L=ad();if(!L)return;const c=localStorage.getItem(Hs);if(c&&c!==L&&!sessionStorage.getItem(Ws)){sessionStorage.setItem(Ws,"1"),location.reload();return}localStorage.setItem(Hs,L)}catch{}})();bf.createRoot(document.getElementById("root")).render(C.jsx(Yf.StrictMode,{children:C.jsx(ud,{})}));
