import{k as h,l as v,m as U}from"./Screen-ByIAW_fE.js";function D(){const e={cTFETC1:0,cTFETC2:1,cTFBC1:2,cTFBC3:3,cTFBC4:4,cTFBC5:5,cTFBC7:6,cTFPVRTC1_4_RGB:8,cTFPVRTC1_4_RGBA:9,cTFASTC_4x4:10,cTFATC_RGB:11,cTFATC_RGBA_INTERPOLATED_ALPHA:12,cTFRGBA32:13,cTFRGB565:14,cTFBGR565:15,cTFRGBA4444:16,cTFFXT1_RGB:17,cTFPVRTC2_4_RGB:18,cTFPVRTC2_4_RGBA:19,cTFETC2_EAC_R11:20,cTFETC2_EAC_RG11:21};let o=null;onmessage=s=>{if(s.data.action==="init"){if(s.data.url)try{importScripts(s.data.url)}catch(n){postMessage({action:"error",error:n})}o||(o=BASIS({wasmBinary:s.data.wasmBinary})),o!==null&&o.then(n=>{BASIS=n,n.initializeBasis(),postMessage({action:"init"})})}else if(s.data.action==="transcode"){const n=s.data.config,a=s.data.imageData,f=new BASIS.BasisFile(a),i=l(f);let d=s.data.ignoreSupportedFormats?null:t(s.data.config,i),T=!1;d===null&&(T=!0,d=i.hasAlpha?e.cTFBC3:e.cTFBC1);let g=!0;f.startTranscoding()||(g=!1);const p=[];for(let m=0;m<i.images.length&&g;m++){const F=i.images[m];if(n.loadSingleImage===void 0||n.loadSingleImage===m){let B=F.levels.length;n.loadMipmapLevels===!1&&(B=1);for(let C=0;C<B;C++){const G=F.levels[C],P=r(f,m,C,d,T);if(!P){g=!1;break}G.transcodedPixels=P,p.push(G.transcodedPixels.buffer)}}}f.close(),f.delete(),T&&(d=-1),g?postMessage({action:"transcode",success:g,id:s.data.id,fileInfo:i,format:d},p):postMessage({action:"transcode",success:g,id:s.data.id})}};function t(s,n){let a=null;return s.supportedCompressionFormats&&(s.supportedCompressionFormats.astc?a=e.cTFASTC_4x4:s.supportedCompressionFormats.bc7?a=e.cTFBC7:s.supportedCompressionFormats.s3tc?a=n.hasAlpha?e.cTFBC3:e.cTFBC1:s.supportedCompressionFormats.pvrtc?a=n.hasAlpha?e.cTFPVRTC1_4_RGBA:e.cTFPVRTC1_4_RGB:s.supportedCompressionFormats.etc2?a=e.cTFETC2:s.supportedCompressionFormats.etc1?a=e.cTFETC1:a=e.cTFRGB565),a}function l(s){const n=s.getHasAlpha(),a=s.getNumImages(),f=[];for(let d=0;d<a;d++){const T={levels:[]},g=s.getNumLevels(d);for(let p=0;p<g;p++){const m={width:s.getImageWidth(d,p),height:s.getImageHeight(d,p)};T.levels.push(m)}f.push(T)}return{hasAlpha:n,images:f}}function r(s,n,a,f,i){const d=s.getImageTranscodedSizeInBytes(n,a,f);let T=new Uint8Array(d);if(!s.transcodeImage(T,n,a,f,1,0))return null;if(i){const g=s.getImageWidth(n,a)+3&-4,p=s.getImageHeight(n,a)+3&-4;T=c(T,0,g,p)}return T}function c(s,n,a,f){const i=new Uint16Array(4),d=new Uint16Array(a*f),T=a/4,g=f/4;for(let p=0;p<g;p++)for(let m=0;m<T;m++){const F=n+8*(p*T+m);i[0]=s[F]|s[F+1]<<8,i[1]=s[F+2]|s[F+3]<<8,i[2]=(2*(i[0]&31)+1*(i[1]&31))/3|(2*(i[0]&2016)+1*(i[1]&2016))/3&2016|(2*(i[0]&63488)+1*(i[1]&63488))/3&63488,i[3]=(2*(i[1]&31)+1*(i[0]&31))/3|(2*(i[1]&2016)+1*(i[0]&2016))/3&2016|(2*(i[1]&63488)+1*(i[0]&63488))/3&63488;for(let B=0;B<4;B++){const C=s[F+4+B];let G=(p*4+B)*a+m*4;d[G++]=i[C&3],d[G++]=i[C>>2&3],d[G++]=i[C>>4&3],d[G++]=i[C>>6&3]}}return d}}function W(e,o,t){return new Promise((l,r)=>{const c=s=>{s.data.action==="init"?(e.removeEventListener("message",c),l(e)):s.data.action==="error"&&r(s.data.error||"error initializing worker")};e.addEventListener("message",c),e.postMessage({action:"init",url:t?h.GetBabylonScriptURL(t):void 0,wasmBinary:o},[o])})}class N{}class z{}var u;(function(e){e[e.cTFETC1=0]="cTFETC1",e[e.cTFETC2=1]="cTFETC2",e[e.cTFBC1=2]="cTFBC1",e[e.cTFBC3=3]="cTFBC3",e[e.cTFBC4=4]="cTFBC4",e[e.cTFBC5=5]="cTFBC5",e[e.cTFBC7=6]="cTFBC7",e[e.cTFPVRTC1_4_RGB=8]="cTFPVRTC1_4_RGB",e[e.cTFPVRTC1_4_RGBA=9]="cTFPVRTC1_4_RGBA",e[e.cTFASTC_4x4=10]="cTFASTC_4x4",e[e.cTFATC_RGB=11]="cTFATC_RGB",e[e.cTFATC_RGBA_INTERPOLATED_ALPHA=12]="cTFATC_RGBA_INTERPOLATED_ALPHA",e[e.cTFRGBA32=13]="cTFRGBA32",e[e.cTFRGB565=14]="cTFRGB565",e[e.cTFBGR565=15]="cTFBGR565",e[e.cTFRGBA4444=16]="cTFRGBA4444",e[e.cTFFXT1_RGB=17]="cTFFXT1_RGB",e[e.cTFPVRTC2_4_RGB=18]="cTFPVRTC2_4_RGB",e[e.cTFPVRTC2_4_RGBA=19]="cTFPVRTC2_4_RGBA",e[e.cTFETC2_EAC_R11=20]="cTFETC2_EAC_R11",e[e.cTFETC2_EAC_RG11=21]="cTFETC2_EAC_RG11"})(u||(u={}));const b={JSModuleURL:`${h._DefaultCdnUrl}/basisTranscoder/1/basis_transcoder.js`,WasmModuleURL:`${h._DefaultCdnUrl}/basisTranscoder/1/basis_transcoder.wasm`},V=(e,o)=>{let t;switch(e){case u.cTFETC1:t=36196;break;case u.cTFBC1:t=33776;break;case u.cTFBC4:t=33779;break;case u.cTFASTC_4x4:t=37808;break;case u.cTFETC2:t=37496;break;case u.cTFBC7:t=36492;break}if(t===void 0)throw"The chosen Basis transcoder format is not currently supported";return t};let L=null,_=null,k=0;const H=!1,x=()=>(L||(L=new Promise((e,o)=>{_?e(_):h.LoadFileAsync(h.GetBabylonScriptURL(b.WasmModuleURL)).then(t=>{if(typeof URL!="function")return o("Basis transcoder requires an environment with a URL constructor");const l=URL.createObjectURL(new Blob([`(${D})()`],{type:"application/javascript"}));_=new Worker(l),W(_,t,b.JSModuleURL).then(e,o)}).catch(o)})),L),X=e=>{_=e},R=(e,o)=>{const t=e instanceof ArrayBuffer?new Uint8Array(e):e;return new Promise((l,r)=>{x().then(()=>{const c=k++,s=a=>{a.data.action==="transcode"&&a.data.id===c&&(_.removeEventListener("message",s),a.data.success?l(a.data):r("Transcode is not supported on this device"))};_.addEventListener("message",s);const n=new Uint8Array(t.byteLength);n.set(new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),_.postMessage({action:"transcode",id:c,imageData:n,config:o,ignoreSupportedFormats:H},[n.buffer])},c=>{r(c)})})},E=(e,o)=>{var l,r;let t=(l=o._gl)==null?void 0:l.TEXTURE_2D;e.isCube&&(t=(r=o._gl)==null?void 0:r.TEXTURE_CUBE_MAP),o._bindTextureDirectly(t,e,!0)},y=(e,o)=>{const t=e.getEngine();for(let l=0;l<o.fileInfo.images.length;l++){const r=o.fileInfo.images[l].levels[0];if(e._invertVScale=e.invertY,o.format===-1||o.format===u.cTFRGB565)if(e.type=10,e.format=4,t._features.basisNeedsPOT&&(Math.log2(r.width)%1!==0||Math.log2(r.height)%1!==0)){const c=new v(t,2);e._invertVScale=e.invertY,c.type=10,c.format=4,c.width=r.width+3&-4,c.height=r.height+3&-4,E(c,t),t._uploadDataToTextureDirectly(c,new Uint16Array(r.transcodedPixels.buffer),l,0,4,!0),t._rescaleTexture(c,e,t.scenes[0],t._getInternalFormat(4),()=>{t._releaseTexture(c),E(e,t)})}else e._invertVScale=!e.invertY,e.width=r.width+3&-4,e.height=r.height+3&-4,e.samplingMode=2,E(e,t),t._uploadDataToTextureDirectly(e,new Uint16Array(r.transcodedPixels.buffer),l,0,4,!0);else{e.width=r.width,e.height=r.height,e.generateMipMaps=o.fileInfo.images[l].levels.length>1;const c=w.GetInternalFormatFromBasisFormat(o.format,t);e.format=c,E(e,t),o.fileInfo.images[l].levels.forEach((s,n)=>{t._uploadCompressedDataToTextureDirectly(e,c,s.width,s.height,s.transcodedPixels,l,n)}),t._features.basisNeedsPOT&&(Math.log2(e.width)%1!==0||Math.log2(e.height)%1!==0)&&(h.Warn("Loaded .basis texture width and height are not a power of two. Texture wrapping will be set to Texture.CLAMP_ADDRESSMODE as other modes are not supported with non power of two dimensions in webGL 1."),e._cachedWrapU=U.CLAMP_ADDRESSMODE,e._cachedWrapV=U.CLAMP_ADDRESSMODE)}}},w={JSModuleURL:b.JSModuleURL,WasmModuleURL:b.WasmModuleURL,GetInternalFormatFromBasisFormat:V,TranscodeAsync:R,LoadTextureFromTranscodeResult:y};Object.defineProperty(w,"JSModuleURL",{get:function(){return b.JSModuleURL},set:function(e){b.JSModuleURL=e}});Object.defineProperty(w,"WasmModuleURL",{get:function(){return b.WasmModuleURL},set:function(e){b.WasmModuleURL=e}});class J{constructor(){this.supportCascades=!1}loadCubeData(o,t,l,r,c){if(Array.isArray(o))return;const s=t.getEngine().getCaps(),n={supportedCompressionFormats:{etc1:!!s.etc1,s3tc:!!s.s3tc,pvrtc:!!s.pvrtc,etc2:!!s.etc2,astc:!!s.astc,bc7:!!s.bptc}};R(o,n).then(a=>{const f=a.fileInfo.images[0].levels.length>1&&t.generateMipMaps;y(t,a),t.getEngine()._setCubeMapTextureParams(t,f),t.isReady=!0,t.onLoadedObservable.notifyObservers(t),t.onLoadedObservable.clear(),r&&r()}).catch(a=>{h.Warn("Failed to transcode Basis file, transcoding may not be supported on this device"),t.isReady=!0,c&&c(a)})}loadData(o,t,l){const r=t.getEngine().getCaps(),c={supportedCompressionFormats:{etc1:!!r.etc1,s3tc:!!r.s3tc,pvrtc:!!r.pvrtc,etc2:!!r.etc2,astc:!!r.astc,bc7:!!r.bptc}};R(o,c).then(s=>{const n=s.fileInfo.images[0].levels[0],a=s.fileInfo.images[0].levels.length>1&&t.generateMipMaps;l(n.width,n.height,a,s.format!==-1,()=>{y(t,s)})}).catch(s=>{h.Warn("Failed to transcode Basis file, transcoding may not be supported on this device"),h.Warn(`Failed to transcode Basis file: ${s}`),l(0,0,!1,!1,()=>{},!0)})}}const j=Object.freeze(Object.defineProperty({__proto__:null,_BasisTextureLoader:J},Symbol.toStringTag,{value:"Module"}));export{N as B,V as G,y as L,X as S,R as T,J as _,w as a,b,z as c,j as d};