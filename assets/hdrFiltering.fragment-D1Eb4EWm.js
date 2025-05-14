import{S as e}from"./Screen-Dnizgy8K.js";import"./helperFunctions-10p-rNfO.js";import"./hdrFilteringFunctions-ucKxTByU.js";import"./index-gFWUETRy.js";const r="hdrFilteringPixelShader",i=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform float alphaG;uniform samplerCube inputTexture;uniform vec2 vFilteringInfo;uniform float hdrScale;varying vec3 direction;void main() {vec3 color=radiance(alphaG,inputTexture,direction,vFilteringInfo);gl_FragColor=vec4(color*hdrScale,1.0);}`;e.ShadersStore[r]=i;const a={name:r,shader:i};export{a as hdrFilteringPixelShader};
