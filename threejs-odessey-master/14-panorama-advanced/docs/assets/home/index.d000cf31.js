import{e as C,f as z,g as x,q as Ze,r as it,c as at,o as st,v as rt,k as lt,F as ne,x as ie,u as he,y as ct,z as fe,A as ge,t as ae,B as se,C as mt,D as dt}from"../@vue/@vue.f63a2794.js";import{V as r,T as pt,E as ut,M as G,a as K,Q as ze,S as Ue,b as A,c as ce,R as ht,d as ye,W as ft,P as gt,O as yt,e as bt,f as be,g as je,D as ve,h as Ie,i as Ne,L as re,j as vt,k as wt}from"../three/three.5ddeb18c.js";import{g as le}from"../vendor/vendor.0d6479a5.js";import{_ as We}from"../index-06f1b4d5.js";const Ye=f=>new Promise(o=>{setTimeout(o,f)}),Rt=(f,o)=>{var s=document.createElement("div");s.style.position="fixed",s.style.maxWidth="80%",s.style.color="white",s.style.fontSize="14px",s.style.boxSizing="border-box",s.style.background="rgba(0,0,0,0.76)",s.style.padding="0.8em 2.618em",s.style.top="40%",s.style.left="50%",s.style.zIndex=999999999,s.style.borderRadius="3px",s.style.opacity="0",s.innerText=f,document.body.appendChild(s),s.style.marginLeft=-(s.offsetWidth/2)+"px",s.style.marginTop=-s.offsetHeight/2+"px",setTimeout(function(){s.style.marginLeft=-(s.offsetWidth/2)+"px",s.style.marginTop=-s.offsetHeight+"px",s.style.transition="all 0.3s",s.style.opacity="1",setTimeout(function(){s.style.opacity="0",s.style.marginTop=-s.offsetHeight/2+"px",setTimeout(function(){document.body.removeChild(s)},300)},parseInt(o)||1618)},0)},W=[{name:"客厅过道",key:"living-room-out",map:new URL(""+new URL("../map_living_room_out-7720bdad.jpg",import.meta.url).href,self.location).href,showSwitch:!1,tinyMapPosition:{top:80,left:50}},{name:"客厅",key:"living-room",map:new URL(""+new URL("../map_living_room-10de3e48.jpg",import.meta.url).href,self.location).href,showSwitch:!0,tinyMapPosition:{top:100,left:50},interactivePoints:[{key:"tv",value:"电视",description:"智能电视",cover:new URL(""+new URL("../cover_living_room_tv-006788a0.png",import.meta.url).href,self.location).href,position:new r(-8,2,-15)},{key:"art",value:"艺术品",description:"BE@RBRICK",cover:new URL(""+new URL("../cover_living_room_art-4b89a8ed.png",import.meta.url).href,self.location).href,position:new r(10.5,0,-15)},{key:"plant",value:"绿植",description:"自由呼吸",cover:new URL(""+new URL("../cover_living_room_plant-698f4c0e.png",import.meta.url).href,self.location).href,position:new r(-15,5,-15)},{key:"sofa",value:"沙发",description:"现在家居",cover:new URL(""+new URL("../cover_living_room_sofa-9e8c5ebd.png",import.meta.url).href,self.location).href,position:new r(-10,-4,15)}]},{name:"卧室",key:"bed-room",map:new URL(""+new URL("../map_bed_room-b9705d91.jpg",import.meta.url).href,self.location).href,showSwitch:!0,tinyMapPosition:{top:30,left:110},interactivePoints:[{key:"bed",value:"床",description:"温暖的床",cover:new URL(""+new URL("../cover_bed_room_bed-d0671d54.png",import.meta.url).href,self.location).href,position:new r(-5,-2,-15)}]},{name:"厨房",key:"kitchen",map:new URL(""+new URL("../map_kitchen-e785c84d.jpg",import.meta.url).href,self.location).href,showSwitch:!0,tinyMapPosition:{top:75,left:110},interactivePoints:[{key:"fridge",value:"冰箱",description:"智能家电",cover:new URL(""+new URL("../cover_kitchen_fridge-159b4123.png",import.meta.url).href,self.location).href,position:new r(15,4,5)},{key:"fruit",value:"水果",description:"美味食物",cover:new URL(""+new URL("../cover_kitchen_fruit-6986ca0b.png",import.meta.url).href,self.location).href,position:new r(2,-2,-15)}]},{name:"卫生间",key:"bath-room",map:new URL(""+new URL("../map_bath_room-18a35fbb.jpg",import.meta.url).href,self.location).href,showSwitch:!0,tinyMapPosition:{top:20,left:50}},{name:"走廊",key:"hall",map:new URL(""+new URL("../map_hall-b0578ddb.jpg",import.meta.url).href,self.location).href,showSwitch:!0,tinyMapPosition:{top:30,left:75}}],_t=W.map(f=>({key:f.key,map:new pt().load(f.map)})),y=f=>_t.filter(o=>o.key===f)[0].map||"",q=[{currentRoom:"hall",destinationRoom:"bath-room",origin:y("hall"),destination:y("bath-room"),position:new r(-13,-2,-10)},{currentRoom:"hall",destinationRoom:"bed-room",origin:y("hall"),destination:y("bed-room"),position:new r(13,-2,6)},{currentRoom:"hall",destinationRoom:"living-room-out",origin:y("hall"),destination:y("living-room-out"),position:new r(-12,-6,15)},{currentRoom:"bath-room",destinationRoom:"hall",origin:y("bath-room"),destination:y("hall"),position:new r(13,-2,-4)},{currentRoom:"bed-room",destinationRoom:"hall",origin:y("bed-room"),destination:y("hall"),position:new r(-15,-5,3)},{currentRoom:"living-room-out",destinationRoom:"living-room",origin:y("living-room-out"),destination:y("living-room"),position:new r(-4,-4,15)},{currentRoom:"living-room-out",destinationRoom:"hall",origin:y("living-room-out"),destination:y("hall"),position:new r(15,-5,-5)},{currentRoom:"living-room-out",destinationRoom:"kitchen",origin:y("living-room-out"),destination:y("kitchen"),position:new r(15,-3,5)},{currentRoom:"living-room",destinationRoom:"hall",origin:y("living-room"),destination:y("hall"),position:new r(15,-3,-12)},{currentRoom:"living-room",destinationRoom:"living-room-out",origin:y("living-room"),destination:y("living-room-out"),position:new r(13,-6,-14)},{currentRoom:"living-room",destinationRoom:"kitchen",origin:y("living-room"),destination:y("kitchen"),position:new r(13,-3,0)},{currentRoom:"kitchen",destinationRoom:"living-room",origin:y("kitchen"),destination:y("living-room"),position:new r(-12,-3.5,-15)}],Fe=[{key:"kitchen",name:"厨房",visible:!0,visibleRooms:[{key:"living-room",position:new r(13,2,0)},{key:"living-room-out",position:new r(15,2,4)}]},{key:"bath-room",name:"卫生间",visible:!0,visibleRooms:[{key:"hall",position:new r(-13,4,-10)}]},{key:"bed-room",name:"卧室",visible:!0,visibleRooms:[{key:"hall",position:new r(13,4,6)}]},{key:"living-room",name:"客厅",visible:!0,visibleRooms:[{key:"hall",position:new r(-12,2,15)},{key:"kitchen",position:new r(-12,2,-15)}]},{key:"hall",name:"走廊",visible:!0,visibleRooms:[{key:"bed-room",position:new r(-15,3,3)},{key:"living-room",position:new r(15,3,-12)},{key:"living-room-out",position:new r(15,3,-5)},{key:"bath-room",position:new r(13,4,-4)}]}],He={type:"change"},we={type:"start"},$e={type:"end"};class xt extends ut{constructor(o,s){super(),s===void 0&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),s===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=o,this.domElement=s,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new r,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:G.ROTATE,MIDDLE:G.DOLLY,RIGHT:G.PAN},this.touches={ONE:K.ROTATE,TWO:K.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return u.phi},this.getAzimuthalAngle=function(){return u.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",Oe),this._domElementKeyEvents=t},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(He),e.update(),p=d.NONE},this.update=function(){const t=new r,n=new ze().setFromUnitVectors(o.up,new r(0,1,0)),R=n.clone().invert(),_=new r,D=new ze,V=2*Math.PI;return function(){const Ce=e.object.position;t.copy(Ce).sub(e.target),t.applyQuaternion(n),u.setFromVector3(t),e.autoRotate&&p===d.NONE&&F(te()),e.enableDamping?(u.theta+=L.theta*e.dampingFactor,u.phi+=L.phi*e.dampingFactor):(u.theta+=L.theta,u.phi+=L.phi);let I=e.minAzimuthAngle,N=e.maxAzimuthAngle;return isFinite(I)&&isFinite(N)&&(I<-Math.PI?I+=V:I>Math.PI&&(I-=V),N<-Math.PI?N+=V:N>Math.PI&&(N-=V),I<=N?u.theta=Math.max(I,Math.min(N,u.theta)):u.theta=u.theta>(I+N)/2?Math.max(I,u.theta):Math.min(N,u.theta)),u.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,u.phi)),u.makeSafe(),u.radius*=B,u.radius=Math.max(e.minDistance,Math.min(e.maxDistance,u.radius)),e.enableDamping===!0?e.target.addScaledVector(i,e.dampingFactor):e.target.add(i),t.setFromSpherical(u),t.applyQuaternion(R),Ce.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(L.theta*=1-e.dampingFactor,L.phi*=1-e.dampingFactor,i.multiplyScalar(1-e.dampingFactor)):(L.set(0,0,0),i.set(0,0,0)),B=1,b||_.distanceToSquared(e.object.position)>S||8*(1-D.dot(e.object.quaternion))>S?(e.dispatchEvent(He),_.copy(e.object.position),D.copy(e.object.quaternion),b=!1,!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",De),e.domElement.removeEventListener("pointerdown",Te),e.domElement.removeEventListener("pointercancel",Le),e.domElement.removeEventListener("wheel",Me),e.domElement.removeEventListener("pointermove",de),e.domElement.removeEventListener("pointerup",pe),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",Oe)};const e=this,d={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let p=d.NONE;const S=1e-6,u=new Ue,L=new Ue;let B=1;const i=new r;let b=!1;const l=new A,c=new A,T=new A,v=new A,h=new A,M=new A,Y=new A,w=new A,U=new A,m=[],H={};function te(){return 2*Math.PI/60/60*e.autoRotateSpeed}function $(){return Math.pow(.95,e.zoomSpeed)}function F(t){L.theta+=t}function Q(t){L.phi+=t}const J=function(){const t=new r;return function(R,_){t.setFromMatrixColumn(_,0),t.multiplyScalar(-R),i.add(t)}}(),ee=function(){const t=new r;return function(R,_){e.screenSpacePanning===!0?t.setFromMatrixColumn(_,1):(t.setFromMatrixColumn(_,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(R),i.add(t)}}(),j=function(){const t=new r;return function(R,_){const D=e.domElement;if(e.object.isPerspectiveCamera){const V=e.object.position;t.copy(V).sub(e.target);let oe=t.length();oe*=Math.tan(e.object.fov/2*Math.PI/180),J(2*R*oe/D.clientHeight,e.object.matrix),ee(2*_*oe/D.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(J(R*(e.object.right-e.object.left)/e.object.zoom/D.clientWidth,e.object.matrix),ee(_*(e.object.top-e.object.bottom)/e.object.zoom/D.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function a(t){e.object.isPerspectiveCamera?B/=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),b=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function g(t){e.object.isPerspectiveCamera?B*=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),b=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function k(t){l.set(t.clientX,t.clientY)}function P(t){Y.set(t.clientX,t.clientY)}function O(t){v.set(t.clientX,t.clientY)}function X(t){c.set(t.clientX,t.clientY),T.subVectors(c,l).multiplyScalar(e.rotateSpeed);const n=e.domElement;F(2*Math.PI*T.x/n.clientHeight),Q(2*Math.PI*T.y/n.clientHeight),l.copy(c),e.update()}function Z(t){w.set(t.clientX,t.clientY),U.subVectors(w,Y),U.y>0?a($()):U.y<0&&g($()),Y.copy(w),e.update()}function E(t){h.set(t.clientX,t.clientY),M.subVectors(h,v).multiplyScalar(e.panSpeed),j(M.x,M.y),v.copy(h),e.update()}function me(t){t.deltaY<0?g($()):t.deltaY>0&&a($()),e.update()}function Ve(t){let n=!1;switch(t.code){case e.keys.UP:j(0,e.keyPanSpeed),n=!0;break;case e.keys.BOTTOM:j(0,-e.keyPanSpeed),n=!0;break;case e.keys.LEFT:j(e.keyPanSpeed,0),n=!0;break;case e.keys.RIGHT:j(-e.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),e.update())}function Re(){if(m.length===1)l.set(m[0].pageX,m[0].pageY);else{const t=.5*(m[0].pageX+m[1].pageX),n=.5*(m[0].pageY+m[1].pageY);l.set(t,n)}}function _e(){if(m.length===1)v.set(m[0].pageX,m[0].pageY);else{const t=.5*(m[0].pageX+m[1].pageX),n=.5*(m[0].pageY+m[1].pageY);v.set(t,n)}}function xe(){const t=m[0].pageX-m[1].pageX,n=m[0].pageY-m[1].pageY,R=Math.sqrt(t*t+n*n);Y.set(0,R)}function Ge(){e.enableZoom&&xe(),e.enablePan&&_e()}function Ke(){e.enableZoom&&xe(),e.enableRotate&&Re()}function ke(t){if(m.length==1)c.set(t.pageX,t.pageY);else{const R=ue(t),_=.5*(t.pageX+R.x),D=.5*(t.pageY+R.y);c.set(_,D)}T.subVectors(c,l).multiplyScalar(e.rotateSpeed);const n=e.domElement;F(2*Math.PI*T.x/n.clientHeight),Q(2*Math.PI*T.y/n.clientHeight),l.copy(c)}function Pe(t){if(m.length===1)h.set(t.pageX,t.pageY);else{const n=ue(t),R=.5*(t.pageX+n.x),_=.5*(t.pageY+n.y);h.set(R,_)}M.subVectors(h,v).multiplyScalar(e.panSpeed),j(M.x,M.y),v.copy(h)}function Ee(t){const n=ue(t),R=t.pageX-n.x,_=t.pageY-n.y,D=Math.sqrt(R*R+_*_);w.set(0,D),U.set(0,Math.pow(w.y/Y.y,e.zoomSpeed)),a(U.y),Y.copy(w)}function qe(t){e.enableZoom&&Ee(t),e.enablePan&&Pe(t)}function Qe(t){e.enableZoom&&Ee(t),e.enableRotate&&ke(t)}function Te(t){e.enabled!==!1&&(m.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",de),e.domElement.addEventListener("pointerup",pe)),nt(t),t.pointerType==="touch"?tt(t):Je(t))}function de(t){e.enabled!==!1&&(t.pointerType==="touch"?ot(t):et(t))}function pe(t){Se(t),m.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",de),e.domElement.removeEventListener("pointerup",pe)),e.dispatchEvent($e),p=d.NONE}function Le(t){Se(t)}function Je(t){let n;switch(t.button){case 0:n=e.mouseButtons.LEFT;break;case 1:n=e.mouseButtons.MIDDLE;break;case 2:n=e.mouseButtons.RIGHT;break;default:n=-1}switch(n){case G.DOLLY:if(e.enableZoom===!1)return;P(t),p=d.DOLLY;break;case G.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;O(t),p=d.PAN}else{if(e.enableRotate===!1)return;k(t),p=d.ROTATE}break;case G.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;k(t),p=d.ROTATE}else{if(e.enablePan===!1)return;O(t),p=d.PAN}break;default:p=d.NONE}p!==d.NONE&&e.dispatchEvent(we)}function et(t){if(e.enabled!==!1)switch(p){case d.ROTATE:if(e.enableRotate===!1)return;X(t);break;case d.DOLLY:if(e.enableZoom===!1)return;Z(t);break;case d.PAN:if(e.enablePan===!1)return;E(t);break}}function Me(t){e.enabled===!1||e.enableZoom===!1||p!==d.NONE||(t.preventDefault(),e.dispatchEvent(we),me(t),e.dispatchEvent($e))}function Oe(t){e.enabled===!1||e.enablePan===!1||Ve(t)}function tt(t){switch(Ae(t),m.length){case 1:switch(e.touches.ONE){case K.ROTATE:if(e.enableRotate===!1)return;Re(),p=d.TOUCH_ROTATE;break;case K.PAN:if(e.enablePan===!1)return;_e(),p=d.TOUCH_PAN;break;default:p=d.NONE}break;case 2:switch(e.touches.TWO){case K.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ge(),p=d.TOUCH_DOLLY_PAN;break;case K.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ke(),p=d.TOUCH_DOLLY_ROTATE;break;default:p=d.NONE}break;default:p=d.NONE}p!==d.NONE&&e.dispatchEvent(we)}function ot(t){switch(Ae(t),p){case d.TOUCH_ROTATE:if(e.enableRotate===!1)return;ke(t),e.update();break;case d.TOUCH_PAN:if(e.enablePan===!1)return;Pe(t),e.update();break;case d.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;qe(t),e.update();break;case d.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Qe(t),e.update();break;default:p=d.NONE}}function De(t){e.enabled!==!1&&t.preventDefault()}function nt(t){m.push(t)}function Se(t){delete H[t.pointerId];for(let n=0;n<m.length;n++)if(m[n].pointerId==t.pointerId){m.splice(n,1);return}}function Ae(t){let n=H[t.pointerId];n===void 0&&(n=new A,H[t.pointerId]=n),n.set(t.pageX,t.pageY)}function ue(t){const n=t.pointerId===m[0].pointerId?m[1]:m[0];return H[n.pointerId]}e.domElement.addEventListener("contextmenu",De),e.domElement.addEventListener("pointerdown",Te),e.domElement.addEventListener("pointercancel",Le),e.domElement.addEventListener("wheel",Me,{passive:!1}),this.update()}}const kt=`
  uniform float time;
  uniform float progress;
  uniform sampler2D sceneDestination;
  uniform sampler2D sceneOrigin;
  uniform sampler2D texture1;
  uniform vec4 resolution;
  varying vec2 vUv;
  varying vec3 vPosition;
  float PI = 3.141592653589793238;

  vec2 distort(vec2 olduv, float pr, float expo) {
  vec2 p0 = 2.*olduv - 1.;
  vec2 p1 = p0/(1. - pr*length(p0)*expo);
  return (p1 + 1.)*0.5;
  }

  void main(){

    float progress1 = smoothstep(0.10, 1.0, progress);

    // 有穿梭效果
    // vec2 uv1 = distort(vUv, -90.*progress, progress*4.);
    // vec4 sPlanet = texture2D(sceneOrigin, uv1);
    // vec4 s360 = texture2D(sceneDestination, vUv);

    // float mixer = progress1;
    // gl_FragColor = s360;
    // vec4 finalTexture = mix(sPlanet, s360, mixer);
    // gl_FragColor = finalTexture;


    // 没有穿梭效果
    vec4 sPlanet = texture2D(sceneOrigin, vUv);
    vec4 s360 = texture2D(sceneDestination, vUv);

    float mixer = progress1;
    gl_FragColor = s360;
    vec4 finalTexture = mix(sPlanet, s360, mixer);
    gl_FragColor = finalTexture;
  }
`,Pt=`
  uniform float time;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform vec2 pixels;
  float PI = 3.141592653589793238;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`,Xe={animateCamera:(f,o,s,e,d=2e3,p)=>{const S=new ce.Tween({x1:f.position.x,y1:f.position.y,z1:f.position.z,x2:o.target.x,y2:o.target.y,z2:o.target.z});S.to({x1:s.x,y1:s.y,z1:s.z,x2:e.x,y2:e.y,z2:e.z},d),S.onUpdate(function(u){f.position.x=u.x1,f.position.y=u.y1,f.position.z=u.z1,o.target.x=u.x2,o.target.y=u.y2,o.target.z=u.z2,o.update()}),S.onComplete(function(){o.enabled=!0,o.update(),p()}),S.easing(ce.Easing.Cubic.InOut),S.start()}};const Et={class:"tiny-map"},Tt={class:"map"},Lt={__name:"TinyMap",props:{rotate:{type:Number,default:0},position:{type:Object,default:()=>({left:0,top:0})}},setup(f){return(o,s)=>(C(),z("div",Et,[x("div",Tt,[x("i",{class:"rotate",style:Ze({transform:`rotate(${f.rotate}deg)`,left:`${f.position.left}px`,top:`${f.position.top}px`})},null,4)])]))}},Mt=We(Lt,[["__scopeId","data-v-103d16e5"]]);const Be=f=>(mt("data-v-d1d7b7f8"),f=f(),dt(),f),Ot={class:"home"},Dt=ct('<canvas class="webgl" data-v-d1d7b7f8></canvas><div class="vr" data-v-d1d7b7f8><span class="box" data-v-d1d7b7f8><i class="icon" data-v-d1d7b7f8></i><b class="text" data-v-d1d7b7f8>全景漫游</b></span></div>',2),St={class:"switch"},At=["onClick"],Ct={class:"text"},zt=Be(()=>x("i",{class:"icon"},null,-1)),Ut=["onClick"],jt={class:"label-tips"},It={class:"cover"},Nt={class:"info"},Yt={class:"p1"},Ft={class:"p2"},Ht=["onClick"],$t=["onClick"],Xt={class:"room-label-box"},Zt=Be(()=>x("a",{class:"github",href:"https://github.com/dragonir/threejs-odessey",target:"_blank",rel:"noreferrer"},[x("svg",{height:"40","aria-hidden":"true",viewBox:"0 0 16 16",version:"1.1",width:"40","data-view-component":"true"},[x("path",{fill:"#000000",fillRule:"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})]),x("span",{class:"author"},"three.js odessey")],-1)),Wt={__name:"index",setup(f){const o=it({sceneOrigin:null,sceneDestination:null,sceneTransition:null,camera:null,controls:null,progress:0,cameraZAxis:2,currentRoom:"living-room",sliders:W[0].sliders,filtederRooms:W.filter(i=>i.showSwitch===!0),rotate:0,tinyMapPosition:{left:0,top:0}}),s=at(()=>{const i=[];return W.forEach(b=>{b.interactivePoints&&b.interactivePoints.length>0&&b.interactivePoints.forEach(l=>{l={room:b.key,...l},i.push(l)})}),i}),e=q.filter(i=>i.currentRoom===o.currentRoom)[0].origin,d=q.filter(i=>i.currentRoom===o.currentRoom)[0].destination,p=new ht,S=()=>{const i={width:window.innerWidth,height:window.innerHeight},b=new ye,l=new ye,c=new ye,T=document.querySelector("canvas.webgl"),v=new ft({canvas:T});v.setSize(i.width,i.height),v.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.renderer=v;const h=new gt(55,window.innerWidth/window.innerHeight,.001,1e3);h.position.set(0,16,16),h.lookAt(new r(0,0,0)),o.camera=h;let M=1;const Y=new yt(M/-2,M/2,M/2,M/-2,-1e3,1e3),w=new xt(h,v.domElement);w.enableDamping=!0,w.enablePan=!1,w.maxDistance=6,w.minPolarAngle=Math.PI/2,w.maxPolarAngle=Math.PI/2,o.controls=w,window.addEventListener("resize",()=>{i.width=window.innerWidth,i.height=window.innerHeight,v.setSize(i.width,i.height),v.setPixelRatio(Math.min(window.devicePixelRatio,2)),h.aspect=i.width/i.height,h.updateProjectionMatrix()});const U=new bt(16,128,128);U.scale(1,1,-1);const m=new be(U,new je({map:e,side:ve}));m.rotation.y=Math.PI/2,l.add(m),o.sceneOrigin=l;const H=new be(U,new je({map:d,side:ve}));H.rotation.y=Math.PI/2,b.add(H),o.sceneDestination=b;const te=new Ie(i.width,i.height,{format:Ne,minFilter:re,magFilter:re}),$=new Ie(i.width,i.height,{format:Ne,minFilter:re,magFilter:re}),F=new be(new vt(1,1),new wt({extensions:{derivatives:"#extension GL_OES_standard_derivatives : enable"},side:ve,uniforms:{progress:{value:0},sceneOrigin:{value:null},sceneDestination:{value:null}},vertexShader:Pt,fragmentShader:kt}));c.add(F);const Q=q.map((a,g)=>({...a,element:document.querySelector(`.marker-${g}`)})),J=Fe.map((a,g)=>({...a,element:document.querySelector(`.room-label-${g}`)})),ee=s.value.map((a,g)=>({...a,element:document.querySelector(`.point-${g}`)})),j=()=>{if(ee)for(const a of ee){const g=a.position.clone(),k=g.project(h);p.setFromCamera(g,h);const P=p.intersectObjects(c.children,!0);if(P.length===0)a.element.classList.add("visible");else{const Z=P[0].distance,E=a.position.distanceTo(h.position);Z<E?a.element.classList.remove("visible"):a.element.classList.add("visible")}k.z>1?a.element.classList.remove("visible"):a.element.classList.add("visible");const O=g.x*i.width*.5,X=-g.y*i.height*.5;a.element.style.transform=`translateX(${O}px) translateY(${X}px)`}if(Q)for(const a of Q){const g=a.position.clone(),k=g.project(h);p.setFromCamera(g,h);const P=p.intersectObjects(c.children,!0);if(P.length===0)a.element.classList.add("visible");else{const Z=P[0].distance,E=a.position.distanceTo(h.position);Z<E?a.element.classList.remove("visible"):a.element.classList.add("visible")}k.z>1?a.element.classList.remove("visible"):a.element.classList.add("visible");const O=g.x*i.width*.5,X=-g.y*i.height*.5;a.element.style.transform=`translateX(${O}px) translateY(${X}px)`}if(o.filtederRooms.forEach(a=>a.visible=!0),J)for(const a of J){const g=a.visibleRooms.filter(k=>k.key===o.currentRoom)[0];if(g){const k=g.position.clone(),P=k.project(h);p.setFromCamera(k,h);const O=p.intersectObjects(c.children,!0);if(O.length===0)a.element.classList.add("visible");else{const E=O[0].distance,me=g.position.distanceTo(h.position);E<me?a.element.classList.remove("visible"):a.element.classList.add("visible")}P.z>1?a.element.classList.remove("visible"):a.element.classList.add("visible"),Math.abs(P.x)<1.2&&P.z<1?o.filtederRooms.forEach(E=>{E.key===a.key&&(E.visible=!1)}):o.filtederRooms.forEach(E=>{E.key===a.key&&(E.visible=!0)});const X=k.x*i.width*.5,Z=-k.y*i.height*.5;a.element.style.transform=`translateX(${X}px) translateY(${Z}px)`}else a.element.classList.remove("visible")}if(h&&w){const a=h.position.x-w.target.x,g=h.position.z-w.target.z,k=Math.atan2(a,g)*180/Math.PI;o.tinyMapRotate=-k;const P=W.filter(O=>O.key===o.currentRoom)[0];o.tinyMapPosition=P.tinyMapPosition}w&&w.update(),ce&&ce.update(),v.setRenderTarget(te),v.render(b,h),v.setRenderTarget($),v.render(l,h),F.material.uniforms.sceneDestination.value=te.texture,F.material.uniforms.sceneOrigin.value=$.texture,F.material.uniforms.progress.value=o.progress,v.setRenderTarget(null),v.render(c,Y),requestAnimationFrame(j)};j()},u=async i=>{const b=q.filter(c=>c.currentRoom===o.currentRoom)[0],l=q.filter(c=>c.currentRoom===i)[0];o.sceneOrigin.children[0].material.map=b.origin,o.sceneDestination.children[0].material.map=l.origin,o.progress=0,le.killTweensOf(o,"progress"),le.to(o,{duration:2,progress:1}),await Ye(500),o.currentRoom=l.currentRoom,o.sliders=W.filter(c=>c.key===o.currentRoom)[0].sliders||[],o.showMascot=o.filtederRooms.some(c=>c.key===o.currentRoom&&c.sliders)},L=async i=>{o.sceneOrigin.children[0].material.map=i.origin,o.sceneDestination.children[0].material.map=i.destination,o.progress=0,le.killTweensOf(o,"progress"),le.to(o,{duration:2,progress:1}),await Ye(500),o.currentRoom=i.destinationRoom,o.sliders=W.filter(b=>b.key===o.currentRoom)[0].sliders||[],o.showMascot=o.filtederRooms.some(b=>b.key===o.currentRoom&&b.sliders),o.currentRoom==="hall-0"&&Xe.animateCamera(o.camera,o.controls,{x:0,y:0,z:o.cameraZAxis},{x:0,y:0,z:0},3200,()=>{})},B=i=>{Rt(`您点击了${i.value}`)};return st(()=>{S(),Xe.animateCamera(o.camera,o.controls,{x:0,y:0,z:o.cameraZAxis},{x:0,y:0,z:0},1600,()=>{})}),rt(()=>{o.keyframeTimeout&&clearTimeout(o.keyframeTimeout)}),(i,b)=>(C(),z("div",Ot,[Dt,lt(Mt,{class:"tiny-map",rotate:o.tinyMapRotate,position:o.tinyMapPosition},null,8,["rotate","position"]),x("div",St,[(C(!0),z(ne,null,ie(o.filtederRooms,(l,c)=>fe((C(),z("span",{class:"button",key:c,onClick:T=>u(l.key)},[x("b",Ct,ae(l.name),1),zt],8,At)),[[ge,l.key!==o.currentRoom&&l.visible===!0]])),128))]),(C(!0),z(ne,null,ie(he(s),(l,c)=>fe((C(),z("div",{class:se(["point",[`point-${c}`,`point-${l.key}`]]),key:c,onClick:T=>B(l)},[x("div",{class:se(["label",[`label-${c}`,`label-${l.key}`]])},[x("label",jt,[x("div",It,[x("i",{class:"icon",style:Ze({background:`url(${l.cover}) no-repeat center`,"background-size":"contain"})},null,4)]),x("div",Nt,[x("p",Yt,ae(l.value),1),x("p",Ft,ae(l.description),1)])])],2)],10,Ut)),[[ge,l.room===o.currentRoom]])),128)),(C(!0),z(ne,null,ie(he(q),(l,c)=>fe((C(),z("div",{class:se(["marker",`marker-${c}`]),key:c,onClick:T=>L(l)},null,10,Ht)),[[ge,o.currentRoom===l.currentRoom]])),128)),(C(!0),z(ne,null,ie(he(Fe),(l,c)=>(C(),z("div",{class:se(["room-label",`room-label-${c}`]),key:c,onClick:T=>u(l.key)},[x("div",Xt,ae(l.name),1)],10,$t))),128)),Zt]))}},qt=We(Wt,[["__scopeId","data-v-d1d7b7f8"]]);export{qt as default};