import{S as e}from"./Screen-CLmgWIb6.js";import"./helperFunctions-D_8cF4BP.js";import"./hdrFilteringFunctions-CSnT8RiP.js";import"./index-C75Z-fU3.js";const r="hdrFilteringPixelShader",i=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform float alphaG;uniform samplerCube inputTexture;uniform vec2 vFilteringInfo;uniform float hdrScale;varying vec3 direction;void main() {vec3 color=radiance(alphaG,inputTexture,direction,vFilteringInfo);gl_FragColor=vec4(color*hdrScale,1.0);}`;e.ShadersStore[r]=i;const a={name:r,shader:i};export{a as hdrFilteringPixelShader};