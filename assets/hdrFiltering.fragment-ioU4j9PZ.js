import{S as e}from"./Screen-ByIAW_fE.js";import"./helperFunctions-Dr7h6LWL.js";import"./hdrFilteringFunctions-k5iu7J3i.js";import"./index-CDvpiCTI.js";const r="hdrFilteringPixelShader",i=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform float alphaG;uniform samplerCube inputTexture;uniform vec2 vFilteringInfo;uniform float hdrScale;varying vec3 direction;void main() {vec3 color=radiance(alphaG,inputTexture,direction,vFilteringInfo);gl_FragColor=vec4(color*hdrScale,1.0);}`;e.ShadersStore[r]=i;const a={name:r,shader:i};export{a as hdrFilteringPixelShader};
