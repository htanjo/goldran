import{D as n,j as t}from"./Screen-C3s8IBjy.js";import"./index-C_y_5XCx.js";class c{constructor(){this.supportCascades=!0}loadCubeData(p,i,m,o){const e=i.getEngine();let a,l=!1,d=1e3;if(Array.isArray(p))for(let s=0;s<p.length;s++){const h=p[s];a=n.GetDDSInfo(h),i.width=a.width,i.height=a.height,l=(a.isRGB||a.isLuminance||a.mipmapCount>1)&&i.generateMipMaps,e._unpackFlipY(a.isCompressed),n.UploadDDSLevels(e,i,h,a,l,6,-1,s),!a.isFourCC&&a.mipmapCount===1?e.generateMipMapsForCubemap(i):d=a.mipmapCount-1}else{const s=p;a=n.GetDDSInfo(s),i.width=a.width,i.height=a.height,m&&(a.sphericalPolynomial=new t),l=(a.isRGB||a.isLuminance||a.mipmapCount>1)&&i.generateMipMaps,e._unpackFlipY(a.isCompressed),n.UploadDDSLevels(e,i,s,a,l,6),!a.isFourCC&&a.mipmapCount===1?e.generateMipMapsForCubemap(i,!1):d=a.mipmapCount-1}e._setCubeMapTextureParams(i,l,d),i.isReady=!0,i.onLoadedObservable.notifyObservers(i),i.onLoadedObservable.clear(),o&&o({isDDS:!0,width:i.width,info:a,data:p,texture:i})}loadData(p,i,m){const o=n.GetDDSInfo(p),e=(o.isRGB||o.isLuminance||o.mipmapCount>1)&&i.generateMipMaps&&Math.max(o.width,o.height)>>o.mipmapCount-1===1;m(o.width,o.height,e,o.isFourCC,()=>{n.UploadDDSLevels(i.getEngine(),i,p,o,e,1)})}}export{c as _DDSTextureLoader};